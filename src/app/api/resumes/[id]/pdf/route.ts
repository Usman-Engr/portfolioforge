import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/db/supabase-admin";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch resume data
    const { data: resume, error } = await supabaseAdmin
      .from("app_resumes")
      .select("*")
      .eq("id", id)
      .eq("user_id", session.user.id)
      .single();

    if (error || !resume) {
      console.error("Resume fetch error:", error);
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // Call the improved PDF generation API
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host") || "localhost:3009";
    const apiUrl = `${protocol}://${host}/api/generate-pdf`;

    console.log("[Resume PDF] Calling PDF API:", apiUrl);

    const pdfResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward the original host/protocol if needed
        "x-forwarded-host": host,
        "x-forwarded-proto": protocol,
      },
      body: JSON.stringify({
        templateId: resume.template_id,
        data: resume.data,
      }),
    });

    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      console.error("[Resume PDF] PDF generation failed:", errorText);
      return NextResponse.json(
        { error: "Failed to generate PDF", detail: errorText },
        { status: pdfResponse.status }
      );
    }

    // Get PDF buffer
    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Create filename
    const filename = `${resume.title.replace(/\s+/g, "-")}-resume.pdf`;

    console.log(`[Resume PDF] Generated successfully (${pdfBuffer.byteLength} bytes)`);

    // Return PDF file
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdfBuffer.byteLength.toString(),
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
      },
    });

  } catch (error: any) {
    console.error("[Resume PDF] Error:", error);

    return NextResponse.json(
      {
        error: "Failed to download resume",
        detail: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

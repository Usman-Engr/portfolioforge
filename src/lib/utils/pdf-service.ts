import { ResumeData } from "@/lib/types/resume";
import { PortfolioData } from "@/lib/types/portfolio";
import { toast } from "sonner";

// ---------------------------------------------------------------------------
// Shared PDF download helper
// ---------------------------------------------------------------------------
async function fetchAndDownloadPDF(
  payload: { templateId: string; data: unknown },
  fileName: string,
  toastId: string | number
): Promise<void> {
  const response = await fetch("/api/generate-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMsg = "Failed to generate PDF";
    try {
      const errorData = await response.json();
      errorMsg = errorData.error || errorMsg;
    } catch {
      // use default message
    }
    throw new Error(errorMsg);
  }

  // Trigger browser download from the returned blob
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${fileName}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
  window.URL.revokeObjectURL(url);

  toast.success("PDF downloaded successfully!", { id: toastId });
}

// ---------------------------------------------------------------------------
// downloadResumePDF — for the Resume Builder
// ---------------------------------------------------------------------------
/**
 * Downloads a high-fidelity PDF using the Puppeteer-powered server engine.
 * Uses the dedicated /export/resume route which renders at native A4 dimensions.
 *
 * @param templateId One of the resume-* template IDs
 * @param data       The user's ResumeData object
 * @param fileName   Desired filename (without .pdf extension)
 */
export async function downloadResumePDF(
  templateId: string,
  data: ResumeData,
  fileName: string
): Promise<void> {
  const toastId = toast.loading("Generating PDF — this takes a few seconds...");
  try {
    await fetchAndDownloadPDF({ templateId, data }, fileName, toastId);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to generate PDF";
    console.error("[PDF] Resume download error:", error);
    toast.error(message, { id: toastId });
  }
}

// ---------------------------------------------------------------------------
// downloadProfessionalPDF — for the Portfolio Builder (unchanged)
// ---------------------------------------------------------------------------
/**
 * Downloads a high-fidelity PDF using the Puppeteer-powered server engine.
 * Used for portfolio templates (not resume templates).
 *
 * @param templateId The ID of the portfolio template to render
 * @param data       The user's portfolio data
 * @param fileName   Desired filename (without .pdf extension)
 */
export async function downloadProfessionalPDF(
  templateId: string,
  data: PortfolioData,
  fileName: string
): Promise<void> {
  const toastId = toast.loading("Generating professional PDF...");
  try {
    await fetchAndDownloadPDF({ templateId, data }, fileName, toastId);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to generate PDF";
    console.error("[PDF] Portfolio download error:", error);
    toast.error(message, { id: toastId });
  }
}

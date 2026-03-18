import { PortfolioData } from "@/lib/types/portfolio";
import { toast } from "sonner";

/**
 * Downloads a high-fidelity PDF using the Puppeteer-powered server engine.
 * 
 * @param templateId The ID of the template to render
 * @param data The user's portfolio data
 * @param fileName The desired filename for the PDF
 */
export async function downloadProfessionalPDF(
  templateId: string,
  data: PortfolioData,
  fileName: string
) {
  const toastId = toast.loading("Generating professional PDF...");

  try {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        templateId,
        data,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate PDF");
    }

    // Get the PDF blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.pdf`);
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("PDF Downloaded successfully!", { id: toastId });
  } catch (error: any) {
    console.error("Professional PDF Error:", error);
    toast.error(error.message || "Failed to generate PDF", { id: toastId });
  }
}

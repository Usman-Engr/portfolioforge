
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

export const downloadPortfolioAsPDF = async (elementId: string, fileName: string) => {
  const originalElement = document.getElementById(elementId);
  if (!originalElement) {
    console.error(`Element with id ${elementId} not found`);
    toast.error('Could not find content to generate PDF');
    return;
  }

  const toastId = toast.loading('Generating high-fidelity PDF...');

  try {
    // 1. Clone the element to isolate it
    const clone = originalElement.cloneNode(true) as HTMLElement;
    
    // 2. Setup hidden container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '-9999px';
    container.style.left = '0';
    container.style.width = '1400px'; 
    container.style.zIndex = '-1';
    container.style.background = '#050505'; // Default dark for app, but check below
    
    container.appendChild(clone);
    document.body.appendChild(container);

    // 3. Wait for layout
    await new Promise(resolve => setTimeout(resolve, 500)); 

    // --- ULTIMATE COLOR RESOLVER ---
    // Uses the browser's own rendering engine via Canvas to convert ANY modern CSS color (oklab, lch, p3)
    // into standard RGBA strings that html2canvas can understand.
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const resolveColorToRgba = (color: string) => {
        if (!ctx || !color) return color;
        // Reset to ensure we don't get stale values
        ctx.clearRect(0,0,1,1);
        ctx.fillStyle = '#000000'; // Default safety
        ctx.fillStyle = color;
        // Note: If the browser supports oklab, fillStyle accepts it. 
        // If it doesn't, it ignores it (but then html2canvas wouldn't have crashed on parsing it if the browser didn't supply it).
        
        ctx.fillRect(0,0,1,1);
        const [r, g, b, a] = ctx.getImageData(0,0,1,1).data;
        return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
    };
    
    const sanitizeColors = (root: HTMLElement) => {
      const allElements = root.querySelectorAll('*');
      
      // Regex to find CSS color functions like oklab(...), lab(...), color(...)
      // We purposefully match the whole function string to replace it.
      const colorFunctionRegex = /(?:oklab|lab|color)\([^)]+\)/g;

      allElements.forEach((node) => {
          const el = node as HTMLElement;
          const style = window.getComputedStyle(el);
          
          const props = [
              'color', 'backgroundColor', 'borderColor', 
              'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor',
              'backgroundImage', 'fill', 'stroke', 'boxShadow'
          ];

          props.forEach(prop => {
              // @ts-ignore
              let val = style[prop];
              
              if (val && colorFunctionRegex.test(val)) {
                  // If it's a gradient or complex string, replace each occurrence
                  const newVal = val.replace(colorFunctionRegex, (match) => {
                      return resolveColorToRgba(match);
                  });
                  
                  // Apply fixed value back to inline style
                  // @ts-ignore
                  el.style[prop] = newVal;
              }
          });
      });
    };
    
    sanitizeColors(clone);
    // -----------------------------

    // 4. Capture
    const captureCanvas = await html2canvas(clone, {
      scale: 2, 
      useCORS: true, 
      allowTaint: true,
      backgroundColor: null, // Transparent to respect cloned styles
      logging: false,
      width: 1400, 
      windowWidth: 1400
    });

    // 5. Cleanup
    document.body.removeChild(container);

    // 6. Generate PDF
    const imgData = captureCanvas.toDataURL('image/jpeg', 0.95);
    const imgWidth = 210; 
    const imgHeight = (captureCanvas.height * imgWidth) / captureCanvas.width;
    
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [imgWidth, imgHeight]
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${fileName}.pdf`);

    toast.dismiss(toastId);
    toast.success('PDF Downloaded successfully!');

  } catch (error) {
    console.error('PDF Generation Error:', error);
    toast.dismiss(toastId);
    toast.error('Failed to generate PDF. Check console.');
  }
};

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { PortfolioData } from '@/lib/types/portfolio';
import MinimalProTemplate from '@/components/templates/MinimalProTemplate';
import ModernTechTemplate from '@/components/templates/ModernTechTemplate';
import GradientProTemplate from '@/components/templates/GradientProTemplate';
import CreativeStudioTemplate from '@/components/templates/CreativeStudioTemplate';

// Map template IDs to components
const TEMPLATES: Record<string, React.ComponentType<{ data: PortfolioData }>> = {
    MinimalProTemplate,
    ModernTechTemplate,
    GradientProTemplate,
    CreativeStudioTemplate,
};

export async function generateStaticExport(portfolio: any) {
    const zip = new JSZip();
    const TemplateComponent = TEMPLATES[portfolio.template_id] || MinimalProTemplate;

    // Render the portfolio to HTML string
    const contentHtml = renderToStaticMarkup(<TemplateComponent data={portfolio.data} />);

    // Construct the full HTML document
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolio.data.personal.name} - Portfolio</title>
    <meta name="description" content="${portfolio.data.personal.title}">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Custom Styles -->
    <style>
        body { font-family: 'Inter', sans-serif; }
        /* Add any custom CSS from settings here */
    </style>
    
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#3b82f6',
                        secondary: '#1e40af',
                    }
                }
            }
        }
    </script>
</head>
<body class="${portfolio.settings?.theme?.darkMode ? 'dark bg-gray-900' : 'bg-white'}">
    ${contentHtml}
    
    <footer class="py-8 text-center text-gray-500 text-sm">
        <p>&copy; ${new Date().getFullYear()} ${portfolio.data.personal.name}. All rights reserved.</p>
    </footer>
</body>
</html>
  `;

    // Add index.html to zip
    zip.file('index.html', fullHtml);

    // Add a README
    zip.file('README.txt', `
Portfolio Export for ${portfolio.data.personal.name}
Generated on ${new Date().toLocaleDateString()}

Instructions:
1. Extract all files
2. Open index.html in your browser
3. To host online, upload these files to GitHub Pages, Netlify, or Vercel.
  `);

    // Generate and save zip
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${portfolio.slug}-portfolio-export.zip`);
}

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PortfolioData {
    personal: {
        name: string;
        title: string;
        email: string;
        phone: string;
        location: string;
        bio: string;
    };
    experience: Array<{
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        description: string;
        current: boolean;
    }>;
    education: Array<{
        institution: string;
        degree: string;
        field: string;
        startDate: string;
        endDate: string;
        current: boolean;
    }>;
    skills: Array<{
        category: string;
        items: string[];
    }>;
    projects: Array<{
        title: string;
        description: string;
        technologies: string[];
        link: string;
    }>;
}

export function generateResumePDF(data: PortfolioData) {
    const doc = new jsPDF();
    let yPosition = 20;

    // Header - Name and Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(data.personal.name, 105, yPosition, { align: 'center' });

    yPosition += 8;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(data.personal.title, 105, yPosition, { align: 'center' });

    // Contact Information
    yPosition += 10;
    doc.setFontSize(10);
    const contactInfo = [
        data.personal.email,
        data.personal.phone,
        data.personal.location
    ].filter(Boolean).join(' | ');
    doc.text(contactInfo, 105, yPosition, { align: 'center' });

    // Professional Summary
    if (data.personal.bio) {
        yPosition += 15;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('PROFESSIONAL SUMMARY', 20, yPosition);

        yPosition += 7;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const bioLines = doc.splitTextToSize(data.personal.bio, 170);
        doc.text(bioLines, 20, yPosition);
        yPosition += bioLines.length * 5 + 5;
    }

    // Skills
    if (data.skills && data.skills.length > 0) {
        yPosition = checkPageBreak(doc, yPosition, 30);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('SKILLS', 20, yPosition);
        yPosition += 7;

        data.skills.forEach((skillGroup) => {
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(skillGroup.category + ':', 20, yPosition);

            doc.setFont('helvetica', 'normal');
            const skillsText = skillGroup.items.join(', ');
            const skillLines = doc.splitTextToSize(skillsText, 150);
            doc.text(skillLines, 55, yPosition);
            yPosition += Math.max(5, skillLines.length * 5);
        });
        yPosition += 5;
    }

    // Experience
    if (data.experience && data.experience.length > 0) {
        yPosition = checkPageBreak(doc, yPosition, 30);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('WORK EXPERIENCE', 20, yPosition);
        yPosition += 7;

        data.experience.forEach((exp) => {
            yPosition = checkPageBreak(doc, yPosition, 25);

            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text(exp.position, 20, yPosition);

            doc.setFont('helvetica', 'normal');
            const dateRange = exp.current
                ? `${exp.startDate} - Present`
                : `${exp.startDate} - ${exp.endDate}`;
            doc.text(dateRange, 190, yPosition, { align: 'right' });

            yPosition += 5;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'italic');
            doc.text(exp.company, 20, yPosition);

            yPosition += 6;
            doc.setFont('helvetica', 'normal');
            const descLines = doc.splitTextToSize(exp.description, 170);
            doc.text(descLines, 20, yPosition);
            yPosition += descLines.length * 5 + 5;
        });
    }

    // Education
    if (data.education && data.education.length > 0) {
        yPosition = checkPageBreak(doc, yPosition, 30);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('EDUCATION', 20, yPosition);
        yPosition += 7;

        data.education.forEach((edu) => {
            yPosition = checkPageBreak(doc, yPosition, 20);

            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text(`${edu.degree} in ${edu.field}`, 20, yPosition);

            doc.setFont('helvetica', 'normal');
            const dateRange = edu.current
                ? `${edu.startDate} - Present`
                : `${edu.startDate} - ${edu.endDate}`;
            doc.text(dateRange, 190, yPosition, { align: 'right' });

            yPosition += 5;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'italic');
            doc.text(edu.institution, 20, yPosition);
            yPosition += 8;
        });
    }

    // Projects
    if (data.projects && data.projects.length > 0) {
        yPosition = checkPageBreak(doc, yPosition, 30);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('PROJECTS', 20, yPosition);
        yPosition += 7;

        data.projects.slice(0, 5).forEach((project) => {
            yPosition = checkPageBreak(doc, yPosition, 20);

            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text(project.title, 20, yPosition);

            yPosition += 5;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const projLines = doc.splitTextToSize(project.description, 170);
            doc.text(projLines, 20, yPosition);
            yPosition += projLines.length * 5;

            if (project.technologies && project.technologies.length > 0) {
                yPosition += 3;
                doc.setFont('helvetica', 'italic');
                doc.text('Technologies: ' + project.technologies.join(', '), 20, yPosition);
                yPosition += 5;
            }
            yPosition += 3;
        });
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(128, 128, 128);
        doc.text(
            `Page ${i} of ${pageCount}`,
            105,
            285,
            { align: 'center' }
        );
    }

    return doc;
}

function checkPageBreak(doc: jsPDF, yPosition: number, requiredSpace: number): number {
    if (yPosition + requiredSpace > 270) {
        doc.addPage();
        return 20;
    }
    return yPosition;
}

export function downloadResumePDF(data: PortfolioData, filename?: string) {
    const doc = generateResumePDF(data);
    const fileName = filename || `${data.personal.name.replace(/\s+/g, '_')}_Resume.pdf`;
    doc.save(fileName);
}

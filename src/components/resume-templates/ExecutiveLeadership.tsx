import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function fmt(d?: string) {
    if (!d) return "";
    const [y, m] = d.split("-");
    return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(m) - 1]} ${y}`;
}

const NAVY = "#000080";

const SecHead = ({ title }: { title: string }) => (
    <h2 style={{ fontSize: "13pt", fontWeight: 700, fontFamily: "Georgia, serif", color: NAVY, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "1.5px", borderBottom: `2px solid ${NAVY}`, paddingBottom: "4px" }}>{title}</h2>
);

export default function ExecutiveLeadership({ data }: Props) {
    const { personal, summary, workExperience, education, skills, certifications, languages } = data;
    return (
        <div id="resume-canvas" style={{ fontFamily: "Georgia, serif", width: "210mm", backgroundColor: "#fff", color: "#1a1a1a", margin: "0 auto", padding: "36px 44px", boxSizing: "border-box", wordBreak: "break-word", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>

            {/* Header */}
            <div style={{ borderBottom: `3px solid ${NAVY}`, paddingBottom: "16px", marginBottom: "22px" }}>
                <h1 style={{ fontSize: "22pt", fontWeight: 700, margin: "0 0 4px", color: NAVY, fontFamily: "Georgia, serif", letterSpacing: "0.5px" }}>{personal.fullName || "Your Name"}</h1>
                <p style={{ fontSize: "13pt", margin: "0 0 10px", color: "#374151", fontStyle: "italic" }}>{personal.jobTitle || "Executive Title"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", fontSize: "11pt", color: "#555", fontFamily: "Arial, sans-serif" }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                    {personal.linkedin && <span>{personal.linkedin}</span>}
                    {personal.website && <span>{personal.website}</span>}
                </div>
            </div>

            {/* Executive Summary — prominent highlighted block */}
            {summary && (
                <section style={{ marginBottom: "24px", backgroundColor: "#f0f4ff", padding: "16px 20px", borderLeft: `4px solid ${NAVY}` }}>
                    <SecHead title="Executive Summary" />
                    <p style={{ fontSize: "11pt", lineHeight: "1.8", color: "#1a1a1a", margin: 0, fontFamily: "Georgia, serif" }}>{summary}</p>
                </section>
            )}

            {/* Core Competencies */}
            {skills.some(g => g.skills.length > 0) && (
                <section style={{ marginBottom: "22px" }}>
                    <SecHead title="Core Competencies" />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                        {skills.flatMap(g => g.skills).map((skill, i) => (
                            <span key={i} style={{ fontSize: "11pt", padding: "3px 12px", border: `1px solid ${NAVY}`, color: NAVY, fontFamily: "Arial, sans-serif", fontWeight: 600 }}>{skill}</span>
                        ))}
                    </div>
                </section>
            )}

            {/* Professional Experience */}
            {workExperience.length > 0 && (
                <section style={{ marginBottom: "22px" }}>
                    <SecHead title="Professional Experience" />
                    {workExperience.map((job, i) => (
                        <div key={i} style={{ marginBottom: "18px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <span style={{ fontSize: "13pt", fontWeight: 700, color: NAVY, fontFamily: "Georgia, serif" }}>{job.position}</span>
                                <span style={{ fontSize: "11pt", color: "#555", whiteSpace: "nowrap", marginLeft: "12px", fontFamily: "Arial, sans-serif" }}>
                                    {fmt(job.startDate)} – {job.isCurrent ? "Present" : fmt(job.endDate)}
                                </span>
                            </div>
                            <p style={{ fontSize: "12pt", fontStyle: "italic", color: "#374151", margin: "3px 0 8px", fontFamily: "Georgia, serif" }}>{job.company}{job.location ? ` | ${job.location}` : ""}</p>
                            {job.description && job.description.split("\n").filter(Boolean).map((line, j) => (
                                <p key={j} style={{ fontSize: "11pt", lineHeight: "1.65", color: "#333", margin: "3px 0", paddingLeft: "16px", position: "relative", fontFamily: "Arial, sans-serif" }}>
                                    <span style={{ position: "absolute", left: 0, color: NAVY, fontWeight: 700 }}>•</span>
                                    {line.replace(/^[•\-]\s*/, "")}
                                </p>
                            ))}
                        </div>
                    ))}
                </section>
            )}

            {/* Education + Certs side by side */}
            <div style={{ display: "flex", gap: "32px" }}>
                {education.length > 0 && (
                    <div style={{ flex: 1 }}>
                        <SecHead title="Education" />
                        {education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: "12px" }}>
                                <p style={{ fontSize: "12pt", fontWeight: 700, margin: "0 0 2px", color: NAVY, fontFamily: "Georgia, serif" }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</p>
                                <p style={{ fontSize: "11pt", fontStyle: "italic", color: "#374151", margin: "0 0 2px", fontFamily: "Georgia, serif" }}>{edu.institution}{edu.location ? `, ${edu.location}` : ""}</p>
                                <p style={{ fontSize: "11pt", color: "#555", margin: 0, fontFamily: "Arial, sans-serif" }}>
                                    {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : edu.isCurrent ? " – Present" : ""}
                                    {edu.gpa ? ` · GPA ${edu.gpa}` : ""}{edu.honors ? ` · ${edu.honors}` : ""}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ flex: 1 }}>
                    {certifications.length > 0 && (
                        <div style={{ marginBottom: "18px" }}>
                            <SecHead title="Certifications" />
                            {certifications.map((cert, i) => (
                                <div key={i} style={{ marginBottom: "8px" }}>
                                    <p style={{ fontSize: "12pt", fontWeight: 700, margin: "0 0 2px", color: NAVY, fontFamily: "Georgia, serif" }}>{cert.name}</p>
                                    <p style={{ fontSize: "11pt", color: "#555", margin: 0, fontFamily: "Arial, sans-serif" }}>{cert.issuer}{cert.issueDate ? ` · ${fmt(cert.issueDate)}` : ""}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {languages.length > 0 && (
                        <div>
                            <SecHead title="Languages" />
                            {languages.map((lang, i) => (
                                <p key={i} style={{ fontSize: "11pt", color: "#333", margin: "0 0 4px", fontFamily: "Arial, sans-serif" }}>
                                    <strong style={{ color: NAVY }}>{lang.language}</strong> — {lang.proficiency}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

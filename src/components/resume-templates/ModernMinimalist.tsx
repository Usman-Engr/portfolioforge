import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function fmt(d?: string) {
    if (!d) return "";
    const [y, m] = d.split("-");
    return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(m) - 1]} ${y}`;
}

const SecHead = ({ title }: { title: string }) => (
    <h2 style={{ fontSize: "13pt", fontWeight: 700, fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: "2px", color: "#1f2937", margin: "0 0 10px", borderBottom: "2px solid #1f2937", paddingBottom: "4px" }}>{title}</h2>
);

export default function ModernMinimalist({ data }: Props) {
    const { personal, summary, workExperience, education, skills, certifications, languages } = data;
    return (
        <div id="resume-canvas" style={{ fontFamily: "Arial, sans-serif", width: "210mm", backgroundColor: "#fff", color: "#1f2937", margin: "0 auto", padding: "36px 48px", boxSizing: "border-box", wordBreak: "break-word", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>

            {/* Header */}
            <div style={{ marginBottom: "22px" }}>
                <h1 style={{ fontSize: "22pt", fontWeight: 700, margin: "0 0 3px", color: "#111827" }}>{personal.fullName || "Your Name"}</h1>
                <p style={{ fontSize: "13pt", margin: "0 0 10px", color: "#374151" }}>{personal.jobTitle || "Professional Title"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "11pt", color: "#6b7280" }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                    {personal.linkedin && <span>{personal.linkedin}</span>}
                    {personal.website && <span>{personal.website}</span>}
                    {personal.github && <span>{personal.github}</span>}
                </div>
            </div>

            {/* Summary */}
            {summary && (
                <section style={{ marginBottom: "20px" }}>
                    <SecHead title="Professional Summary" />
                    <p style={{ fontSize: "11pt", lineHeight: "1.7", color: "#374151", margin: 0 }}>{summary}</p>
                </section>
            )}

            {/* Core Competencies */}
            {skills.some(g => g.skills.length > 0) && (
                <section style={{ marginBottom: "20px" }}>
                    <SecHead title="Core Competencies" />
                    {skills.filter(g => g.skills.length > 0).map((group, i) => (
                        <div key={i} style={{ marginBottom: "6px" }}>
                            <span style={{ fontSize: "11pt", fontWeight: 700, color: "#1f2937" }}>{group.category}: </span>
                            <span style={{ fontSize: "11pt", color: "#374151" }}>{group.skills.join(" · ")}</span>
                        </div>
                    ))}
                </section>
            )}

            {/* Work Experience */}
            {workExperience.length > 0 && (
                <section style={{ marginBottom: "20px" }}>
                    <SecHead title="Work Experience" />
                    {workExperience.map((job, i) => (
                        <div key={i} style={{ marginBottom: "16px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <span style={{ fontSize: "12pt", fontWeight: 700, color: "#111827" }}>{job.position}</span>
                                <span style={{ fontSize: "11pt", color: "#6b7280", whiteSpace: "nowrap", marginLeft: "12px" }}>
                                    {fmt(job.startDate)} – {job.isCurrent ? "Present" : fmt(job.endDate)}
                                </span>
                            </div>
                            <p style={{ fontSize: "11pt", fontStyle: "italic", color: "#374151", margin: "2px 0 6px" }}>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                            {job.description && job.description.split("\n").filter(Boolean).map((line, j) => (
                                <p key={j} style={{ fontSize: "11pt", lineHeight: "1.6", color: "#4b5563", margin: "3px 0", paddingLeft: "14px", position: "relative" }}>
                                    <span style={{ position: "absolute", left: 0, color: "#1f2937" }}>•</span>
                                    {line.replace(/^[•\-]\s*/, "")}
                                </p>
                            ))}
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: "20px" }}>
                    <SecHead title="Education" />
                    {education.map((edu, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                            <div>
                                <p style={{ fontSize: "12pt", fontWeight: 700, margin: "0 0 2px", color: "#111827" }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</p>
                                <p style={{ fontSize: "11pt", fontStyle: "italic", color: "#374151", margin: 0 }}>{edu.institution}{edu.location ? `, ${edu.location}` : ""}{edu.gpa ? ` · GPA ${edu.gpa}` : ""}</p>
                                {edu.honors && <p style={{ fontSize: "11pt", color: "#6b7280", margin: "1px 0", fontStyle: "italic" }}>{edu.honors}</p>}
                            </div>
                            <span style={{ fontSize: "11pt", color: "#6b7280", whiteSpace: "nowrap", marginLeft: "12px" }}>
                                {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : edu.isCurrent ? " – Present" : ""}
                            </span>
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
                <section style={{ marginBottom: "20px" }}>
                    <SecHead title="Certifications" />
                    {certifications.map((cert, i) => (
                        <p key={i} style={{ fontSize: "11pt", color: "#374151", margin: "0 0 5px" }}>
                            <strong style={{ color: "#111827" }}>{cert.name}</strong> — {cert.issuer}{cert.issueDate ? ` · ${fmt(cert.issueDate)}` : ""}
                        </p>
                    ))}
                </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
                <section>
                    <SecHead title="Languages" />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
                        {languages.map((lang, i) => (
                            <span key={i} style={{ fontSize: "11pt", color: "#374151" }}><strong>{lang.language}</strong> ({lang.proficiency})</span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

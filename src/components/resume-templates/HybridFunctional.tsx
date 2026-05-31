import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function fmt(d?: string) {
    if (!d) return "";
    const [y, m] = d.split("-");
    return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(m) - 1]} ${y}`;
}

const GRAY = "#374151";

const SecHead = ({ title }: { title: string }) => (
    <h2 style={{ fontSize: "13pt", fontWeight: 700, fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: "2px", color: GRAY, margin: "0 0 12px", borderBottom: `1.5px solid ${GRAY}`, paddingBottom: "4px" }}>{title}</h2>
);

export default function HybridFunctional({ data }: Props) {
    const { personal, summary, workExperience, education, skills, certifications, languages } = data;

    const allSkills = skills.flatMap(g => g.skills);
    const col1 = allSkills.filter((_, i) => i % 3 === 0);
    const col2 = allSkills.filter((_, i) => i % 3 === 1);
    const col3 = allSkills.filter((_, i) => i % 3 === 2);

    return (
        <div id="resume-canvas" style={{ fontFamily: "Arial, sans-serif", width: "210mm", backgroundColor: "#fff", color: GRAY, margin: "0 auto", padding: "32px 44px", boxSizing: "border-box", wordBreak: "break-word", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>

            {/* Header */}
            <div style={{ marginBottom: "20px" }}>
                <h1 style={{ fontSize: "22pt", fontWeight: 700, margin: "0 0 3px", color: "#111827" }}>{personal.fullName || "Your Name"}</h1>
                <p style={{ fontSize: "13pt", margin: "0 0 10px", color: GRAY }}>{personal.jobTitle || "Professional Title"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "11pt", color: "#6b7280" }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                    {personal.linkedin && <span>{personal.linkedin}</span>}
                    {personal.website && <span>{personal.website}</span>}
                </div>
            </div>

            {/* Summary */}
            {summary && (
                <section style={{ marginBottom: "20px" }}>
                    <SecHead title="Professional Profile" />
                    <p style={{ fontSize: "11pt", lineHeight: "1.7", color: "#4b5563", margin: 0 }}>{summary}</p>
                </section>
            )}

            {/* Core Competencies — 3 columns (skills-first layout) */}
            {allSkills.length > 0 && (
                <section style={{ marginBottom: "20px" }}>
                    <SecHead title="Core Competencies" />
                    <div style={{ display: "flex", gap: "0" }}>
                        {[col1, col2, col3].map((col, ci) => (
                            <div key={ci} style={{ flex: 1 }}>
                                {col.map((skill, si) => (
                                    <p key={si} style={{ fontSize: "11pt", color: "#374151", margin: "0 0 5px", paddingLeft: "14px", position: "relative" }}>
                                        <span style={{ position: "absolute", left: 0, color: GRAY }}>•</span>
                                        {skill}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skill Groups */}
            {skills.some(g => g.skills.length > 0) && skills.length > 1 && (
                <section style={{ marginBottom: "20px" }}>
                    <SecHead title="Skills by Category" />
                    {skills.filter(g => g.skills.length > 0).map((group, i) => (
                        <div key={i} style={{ marginBottom: "6px", display: "flex", gap: "8px" }}>
                            <span style={{ fontSize: "11pt", fontWeight: 700, color: GRAY, minWidth: "120px" }}>{group.category}:</span>
                            <span style={{ fontSize: "11pt", color: "#4b5563" }}>{group.skills.join(", ")}</span>
                        </div>
                    ))}
                </section>
            )}

            {/* Work History — condensed */}
            {workExperience.length > 0 && (
                <section style={{ marginBottom: "20px" }}>
                    <SecHead title="Work History" />
                    {workExperience.map((job, i) => (
                        <div key={i} style={{ marginBottom: "14px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <span style={{ fontSize: "12pt", fontWeight: 700, color: "#111827" }}>{job.position}</span>
                                <span style={{ fontSize: "11pt", color: "#6b7280", whiteSpace: "nowrap", marginLeft: "12px" }}>
                                    {fmt(job.startDate)} – {job.isCurrent ? "Present" : fmt(job.endDate)}
                                </span>
                            </div>
                            <p style={{ fontSize: "11pt", color: GRAY, margin: "2px 0 5px", fontStyle: "italic" }}>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                            {job.description && job.description.split("\n").filter(Boolean).map((line, j) => (
                                <p key={j} style={{ fontSize: "11pt", lineHeight: "1.6", color: "#4b5563", margin: "3px 0", paddingLeft: "14px", position: "relative" }}>
                                    <span style={{ position: "absolute", left: 0, color: GRAY }}>•</span>
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
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                            <div>
                                <p style={{ fontSize: "12pt", fontWeight: 700, margin: "0 0 2px", color: "#111827" }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</p>
                                <p style={{ fontSize: "11pt", color: GRAY, margin: 0, fontStyle: "italic" }}>{edu.institution}{edu.location ? `, ${edu.location}` : ""}{edu.gpa ? ` · GPA ${edu.gpa}` : ""}</p>
                                {edu.honors && <p style={{ fontSize: "11pt", color: "#6b7280", margin: "1px 0", fontStyle: "italic" }}>{edu.honors}</p>}
                            </div>
                            <span style={{ fontSize: "11pt", color: "#6b7280", whiteSpace: "nowrap", marginLeft: "12px" }}>
                                {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : edu.isCurrent ? " – Present" : ""}
                            </span>
                        </div>
                    ))}
                </section>
            )}

            {/* Certs + Languages */}
            {(certifications.length > 0 || languages.length > 0) && (
                <div style={{ display: "flex", gap: "32px" }}>
                    {certifications.length > 0 && (
                        <div style={{ flex: 1 }}>
                            <SecHead title="Certifications" />
                            {certifications.map((cert, i) => (
                                <p key={i} style={{ fontSize: "11pt", color: "#4b5563", margin: "0 0 5px" }}>
                                    <strong style={{ color: "#111827" }}>{cert.name}</strong> — {cert.issuer}{cert.issueDate ? ` · ${fmt(cert.issueDate)}` : ""}
                                </p>
                            ))}
                        </div>
                    )}
                    {languages.length > 0 && (
                        <div style={{ flex: 1 }}>
                            <SecHead title="Languages" />
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                                {languages.map((lang, i) => (
                                    <span key={i} style={{ fontSize: "11pt", color: "#4b5563" }}><strong>{lang.language}</strong> ({lang.proficiency})</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

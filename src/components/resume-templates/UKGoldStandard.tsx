import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function fmt(d?: string) {
    if (!d) return "";
    const [y, m] = d.split("-");
    return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(m) - 1]} ${y}`;
}

const NAVY = "#1e3a5f";

const SecHead = ({ title }: { title: string }) => (
    <h2 style={{ fontSize: "13pt", fontWeight: 700, fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: "1.5px", color: NAVY, margin: "0 0 10px", borderBottom: `1.5px solid ${NAVY}`, paddingBottom: "3px" }}>{title}</h2>
);

export default function UKGoldStandard({ data }: Props) {
    const { personal, summary, workExperience, education, skills, certifications, languages } = data;
    return (
        <div id="resume-canvas" style={{ fontFamily: "Arial, sans-serif", width: "210mm", backgroundColor: "#fff", color: "#1a1a1a", margin: "0 auto", padding: "32px 44px", boxSizing: "border-box", wordBreak: "break-word", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>

            {/* Header — no photo, no DOB */}
            <div style={{ borderBottom: `2px solid ${NAVY}`, paddingBottom: "14px", marginBottom: "18px" }}>
                <h1 style={{ fontSize: "22pt", fontWeight: 700, margin: "0 0 3px", color: NAVY }}>{personal.fullName || "Your Name"}</h1>
                <p style={{ fontSize: "13pt", margin: "0 0 10px", color: "#374151" }}>{personal.jobTitle || "Professional Title"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "11pt", color: "#555" }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                    {personal.linkedin && <span>{personal.linkedin}</span>}
                    {personal.website && <span>{personal.website}</span>}
                </div>
            </div>

            {/* Profile */}
            {summary && (
                <section style={{ marginBottom: "18px" }}>
                    <SecHead title="Profile" />
                    <p style={{ fontSize: "11pt", lineHeight: "1.65", color: "#333", margin: 0 }}>{summary}</p>
                </section>
            )}

            {/* Key Skills */}
            {skills.some(g => g.skills.length > 0) && (
                <section style={{ marginBottom: "18px" }}>
                    <SecHead title="Key Skills" />
                    {skills.filter(g => g.skills.length > 0).map((group, i) => (
                        <div key={i} style={{ marginBottom: "5px", display: "flex", gap: "8px" }}>
                            <span style={{ fontSize: "11pt", fontWeight: 700, color: NAVY, minWidth: "110px" }}>{group.category}:</span>
                            <span style={{ fontSize: "11pt", color: "#333" }}>{group.skills.join(", ")}</span>
                        </div>
                    ))}
                </section>
            )}

            {/* Career History — with Key Achievements per role */}
            {workExperience.length > 0 && (
                <section style={{ marginBottom: "18px" }}>
                    <SecHead title="Career History" />
                    {workExperience.map((job, i) => (
                        <div key={i} style={{ marginBottom: "16px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <span style={{ fontSize: "12pt", fontWeight: 700, color: NAVY }}>{job.position}</span>
                                <span style={{ fontSize: "11pt", color: "#555", whiteSpace: "nowrap", marginLeft: "12px" }}>
                                    {fmt(job.startDate)} – {job.isCurrent ? "Present" : fmt(job.endDate)}
                                </span>
                            </div>
                            <p style={{ fontSize: "11pt", color: "#374151", margin: "2px 0 6px", fontStyle: "italic" }}>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                            {job.description && (
                                <>
                                    <p style={{ fontSize: "11pt", fontWeight: 700, color: NAVY, margin: "5px 0 4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Key Achievements:</p>
                                    {job.description.split("\n").filter(Boolean).map((line, j) => (
                                        <p key={j} style={{ fontSize: "11pt", lineHeight: "1.6", color: "#333", margin: "3px 0", paddingLeft: "14px", position: "relative" }}>
                                            <span style={{ position: "absolute", left: 0, color: NAVY }}>•</span>
                                            {line.replace(/^[•\-]\s*/, "")}
                                        </p>
                                    ))}
                                </>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: "18px" }}>
                    <SecHead title="Education & Qualifications" />
                    {education.map((edu, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                            <div>
                                <p style={{ fontSize: "12pt", fontWeight: 700, margin: "0 0 2px", color: NAVY }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</p>
                                <p style={{ fontSize: "11pt", color: "#374151", margin: 0, fontStyle: "italic" }}>{edu.institution}{edu.location ? `, ${edu.location}` : ""}{edu.gpa ? ` · Grade: ${edu.gpa}` : ""}{edu.honors ? ` · ${edu.honors}` : ""}</p>
                            </div>
                            <span style={{ fontSize: "11pt", color: "#555", whiteSpace: "nowrap", marginLeft: "12px" }}>
                                {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : edu.isCurrent ? " – Present" : ""}
                            </span>
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications + Languages */}
            {(certifications.length > 0 || languages.length > 0) && (
                <div style={{ display: "flex", gap: "32px" }}>
                    {certifications.length > 0 && (
                        <div style={{ flex: 1 }}>
                            <SecHead title="Professional Certifications" />
                            {certifications.map((cert, i) => (
                                <p key={i} style={{ fontSize: "11pt", color: "#333", margin: "0 0 5px" }}>
                                    <strong style={{ color: NAVY }}>{cert.name}</strong> — {cert.issuer}{cert.issueDate ? ` (${fmt(cert.issueDate)})` : ""}
                                </p>
                            ))}
                        </div>
                    )}
                    {languages.length > 0 && (
                        <div style={{ flex: 1 }}>
                            <SecHead title="Languages" />
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                                {languages.map((lang, i) => (
                                    <span key={i} style={{ fontSize: "11pt", color: "#333" }}><strong>{lang.language}</strong> — {lang.proficiency}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

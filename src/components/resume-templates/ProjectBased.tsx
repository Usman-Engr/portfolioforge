import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function fmt(d?: string) {
    if (!d) return "";
    const [y, m] = d.split("-");
    return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(m) - 1]} ${y}`;
}

const DARK = "#1e293b";
const ACCENT = "#f59e0b";

const SecHead = ({ title }: { title: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <div style={{ width: "28px", height: "3px", backgroundColor: ACCENT, borderRadius: "2px" }} />
        <h2 style={{ fontSize: "13pt", fontWeight: 700, fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: "2px", color: DARK, margin: 0 }}>{title}</h2>
    </div>
);

export default function ProjectBased({ data }: Props) {
    const { personal, summary, workExperience, education, skills, certifications, languages } = data;
    return (
        <div id="resume-canvas" style={{ fontFamily: "Arial, sans-serif", width: "210mm", backgroundColor: "#fff", color: DARK, margin: "0 auto", boxSizing: "border-box", wordBreak: "break-word", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>

            {/* Header */}
            <div style={{ backgroundColor: DARK, padding: "28px 36px 22px" }}>
                <h1 style={{ fontSize: "22pt", fontWeight: 700, margin: "0 0 4px", color: "#fff" }}>{personal.fullName || "Your Name"}</h1>
                <p style={{ fontSize: "13pt", margin: "0 0 10px", color: ACCENT, fontWeight: 600, letterSpacing: "0.5px" }}>{personal.jobTitle || "Freelancer / Engineer"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "11pt", color: "rgba(255,255,255,0.7)" }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                    {personal.linkedin && <span>{personal.linkedin}</span>}
                    {personal.website && <span>{personal.website}</span>}
                    {personal.github && <span>{personal.github}</span>}
                </div>
            </div>

            <div style={{ padding: "24px 36px" }}>

                {summary && (
                    <section style={{ marginBottom: "22px" }}>
                        <SecHead title="Profile" />
                        <p style={{ fontSize: "11pt", lineHeight: "1.75", color: "#475569", margin: 0 }}>{summary}</p>
                    </section>
                )}

                {/* Project-Based Experience */}
                {workExperience.length > 0 && (
                    <section style={{ marginBottom: "22px" }}>
                        <SecHead title="Projects & Experience" />
                        {workExperience.map((job, i) => (
                            <div key={i} style={{ marginBottom: "18px", paddingLeft: "14px", borderLeft: `3px solid ${ACCENT}` }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div>
                                        <p style={{ fontSize: "13pt", fontWeight: 700, margin: "0 0 2px", color: DARK }}>{job.position}</p>
                                        <p style={{ fontSize: "11pt", color: "#64748b", margin: "0 0 5px", fontStyle: "italic" }}>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                                    </div>
                                    <span style={{ fontSize: "11pt", color: "#94a3b8", whiteSpace: "nowrap", marginLeft: "8px", backgroundColor: "#f8fafc", padding: "2px 10px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                                        {fmt(job.startDate)} – {job.isCurrent ? "Present" : fmt(job.endDate)}
                                    </span>
                                </div>
                                {job.description && job.description.split("\n").filter(Boolean).map((line, j) => {
                                    const isImpact = /(%|increased|reduced|saved|impact|result|achiev)/i.test(line);
                                    return (
                                        <p key={j} style={{ fontSize: "11pt", lineHeight: "1.6", color: isImpact ? DARK : "#475569", margin: "3px 0", paddingLeft: "14px", position: "relative", fontWeight: isImpact ? 600 : 400 }}>
                                            <span style={{ position: "absolute", left: 0, color: ACCENT, fontWeight: 700 }}>{isImpact ? "★" : "•"}</span>
                                            {line.replace(/^[•\-★]\s*/, "")}
                                        </p>
                                    );
                                })}
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {skills.some(g => g.skills.length > 0) && (
                    <section style={{ marginBottom: "22px" }}>
                        <SecHead title="Skills & Tools" />
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                            {skills.flatMap(g => g.skills).map((skill, i) => (
                                <span key={i} style={{ fontSize: "11pt", padding: "3px 12px", backgroundColor: "#f8fafc", border: `1px solid ${ACCENT}60`, color: DARK, borderRadius: "4px", fontWeight: 600 }}>{skill}</span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education + Certs */}
                <div style={{ display: "flex", gap: "28px" }}>
                    {education.length > 0 && (
                        <div style={{ flex: 1 }}>
                            <SecHead title="Education" />
                            {education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: "10px" }}>
                                    <p style={{ fontSize: "12pt", fontWeight: 700, margin: "0 0 2px", color: DARK }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</p>
                                    <p style={{ fontSize: "11pt", color: "#64748b", margin: "0 0 1px" }}>{edu.institution}</p>
                                    <p style={{ fontSize: "11pt", color: "#94a3b8", margin: 0 }}>
                                        {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : edu.isCurrent ? " – Present" : ""}
                                        {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                    <div style={{ flex: 1 }}>
                        {certifications.length > 0 && (
                            <div style={{ marginBottom: "14px" }}>
                                <SecHead title="Certifications" />
                                {certifications.map((cert, i) => (
                                    <div key={i} style={{ marginBottom: "7px" }}>
                                        <p style={{ fontSize: "12pt", fontWeight: 700, margin: "0 0 1px", color: DARK }}>{cert.name}</p>
                                        <p style={{ fontSize: "11pt", color: "#64748b", margin: 0 }}>{cert.issuer}{cert.issueDate ? ` · ${fmt(cert.issueDate)}` : ""}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {languages.length > 0 && (
                            <div>
                                <SecHead title="Languages" />
                                {languages.map((lang, i) => (
                                    <p key={i} style={{ fontSize: "11pt", color: "#475569", margin: "0 0 4px" }}><strong>{lang.language}</strong> — {lang.proficiency}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

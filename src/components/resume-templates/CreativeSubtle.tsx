import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function fmt(d?: string) {
    if (!d) return "";
    const [y, m] = d.split("-");
    return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(m) - 1]} ${y}`;
}

const TEAL = "#0d9488";
const SLATE_BG = "#475569";

const SecHead = ({ title }: { title: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <div style={{ width: "4px", height: "18px", backgroundColor: TEAL, borderRadius: "2px" }} />
        <h2 style={{ fontSize: "13pt", fontWeight: 700, fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: "2px", color: "#1e293b", margin: 0 }}>{title}</h2>
    </div>
);

export default function CreativeSubtle({ data }: Props) {
    const { personal, summary, workExperience, education, skills, certifications, languages } = data;
    return (
        <div id="resume-canvas" style={{ fontFamily: "Arial, sans-serif", width: "210mm", backgroundColor: "#fff", color: "#1e293b", margin: "0 auto", boxSizing: "border-box", wordBreak: "break-word", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>

            {/* Slate Header */}
            <div style={{ backgroundColor: SLATE_BG, padding: "28px 36px 22px" }}>
                <h1 style={{ fontSize: "22pt", fontWeight: 700, margin: "0 0 3px", color: "#fff" }}>{personal.fullName || "Your Name"}</h1>
                <p style={{ fontSize: "13pt", margin: "0 0 10px", color: TEAL, fontWeight: 600 }}>{personal.jobTitle || "Creative Professional"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "11pt", color: "rgba(255,255,255,0.8)" }}>
                    {personal.email && <span>✉ {personal.email}</span>}
                    {personal.phone && <span>✆ {personal.phone}</span>}
                    {personal.location && <span>⊙ {personal.location}</span>}
                    {personal.linkedin && <span>in {personal.linkedin}</span>}
                    {personal.website && <span>⊕ {personal.website}</span>}
                </div>
            </div>

            {/* Social Proof strip */}
            {(personal.linkedin || personal.website || personal.github) && (
                <div style={{ backgroundColor: "#f1f5f9", padding: "7px 36px", display: "flex", gap: "22px", flexWrap: "wrap" }}>
                    {personal.linkedin && <span style={{ fontSize: "11pt", color: TEAL, fontWeight: 600 }}>LinkedIn: {personal.linkedin}</span>}
                    {personal.website && <span style={{ fontSize: "11pt", color: TEAL, fontWeight: 600 }}>Portfolio: {personal.website}</span>}
                    {personal.github && <span style={{ fontSize: "11pt", color: TEAL, fontWeight: 600 }}>GitHub: {personal.github}</span>}
                </div>
            )}

            <div style={{ padding: "22px 36px" }}>

                {summary && (
                    <section style={{ marginBottom: "20px" }}>
                        <SecHead title="About Me" />
                        <p style={{ fontSize: "11pt", lineHeight: "1.75", color: "#475569", margin: 0 }}>{summary}</p>
                    </section>
                )}

                {skills.some(g => g.skills.length > 0) && (
                    <section style={{ marginBottom: "20px" }}>
                        <SecHead title="Skills & Expertise" />
                        {skills.filter(g => g.skills.length > 0).map((group, i) => (
                            <div key={i} style={{ marginBottom: "10px" }}>
                                <p style={{ fontSize: "11pt", fontWeight: 700, color: "#64748b", margin: "0 0 5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{group.category}</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                    {group.skills.map((skill, j) => (
                                        <span key={j} style={{ fontSize: "11pt", padding: "3px 12px", backgroundColor: `${TEAL}15`, border: `1px solid ${TEAL}40`, color: TEAL, borderRadius: "100px", fontWeight: 600 }}>{skill}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {workExperience.length > 0 && (
                    <section style={{ marginBottom: "20px" }}>
                        <SecHead title="Work Experience" />
                        {workExperience.map((job, i) => (
                            <div key={i} style={{ marginBottom: "16px", paddingLeft: "14px", borderLeft: `2px solid ${TEAL}50` }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div>
                                        <p style={{ fontSize: "13pt", fontWeight: 700, margin: "0 0 2px", color: "#1e293b" }}>{job.position}</p>
                                        <p style={{ fontSize: "11pt", color: TEAL, margin: "0 0 5px", fontWeight: 600 }}>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                                    </div>
                                    <span style={{ fontSize: "11pt", color: "#94a3b8", whiteSpace: "nowrap", marginLeft: "8px", backgroundColor: "#f8fafc", padding: "2px 10px", borderRadius: "100px", border: "1px solid #e2e8f0" }}>
                                        {fmt(job.startDate)} – {job.isCurrent ? "Present" : fmt(job.endDate)}
                                    </span>
                                </div>
                                {job.description && job.description.split("\n").filter(Boolean).map((line, j) => (
                                    <p key={j} style={{ fontSize: "11pt", lineHeight: "1.6", color: "#475569", margin: "3px 0", paddingLeft: "12px", position: "relative" }}>
                                        <span style={{ position: "absolute", left: 0, color: TEAL, fontWeight: 700 }}>•</span>
                                        {line.replace(/^[•\-]\s*/, "")}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </section>
                )}

                {education.length > 0 && (
                    <section style={{ marginBottom: "20px" }}>
                        <SecHead title="Education" />
                        {education.map((edu, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                                <div>
                                    <p style={{ fontSize: "12pt", fontWeight: 700, margin: "0 0 2px", color: "#1e293b" }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</p>
                                    <p style={{ fontSize: "11pt", color: TEAL, margin: 0, fontWeight: 600 }}>{edu.institution}{edu.location ? `, ${edu.location}` : ""}{edu.gpa ? ` · GPA ${edu.gpa}` : ""}</p>
                                    {edu.honors && <p style={{ fontSize: "11pt", color: "#64748b", margin: "1px 0", fontStyle: "italic" }}>{edu.honors}</p>}
                                </div>
                                <span style={{ fontSize: "11pt", color: "#94a3b8", whiteSpace: "nowrap", marginLeft: "12px" }}>
                                    {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : edu.isCurrent ? " – Present" : ""}
                                </span>
                            </div>
                        ))}
                    </section>
                )}

                {(certifications.length > 0 || languages.length > 0) && (
                    <div style={{ display: "flex", gap: "28px" }}>
                        {certifications.length > 0 && (
                            <div style={{ flex: 1 }}>
                                <SecHead title="Certifications" />
                                {certifications.map((cert, i) => (
                                    <p key={i} style={{ fontSize: "11pt", color: "#475569", margin: "0 0 5px" }}>
                                        <strong style={{ color: "#1e293b" }}>{cert.name}</strong> — {cert.issuer}{cert.issueDate ? ` · ${fmt(cert.issueDate)}` : ""}
                                    </p>
                                ))}
                            </div>
                        )}
                        {languages.length > 0 && (
                            <div style={{ flex: 1 }}>
                                <SecHead title="Languages" />
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                                    {languages.map((lang, i) => (
                                        <span key={i} style={{ fontSize: "11pt", color: "#475569" }}><strong style={{ color: TEAL }}>{lang.language}</strong> ({lang.proficiency})</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

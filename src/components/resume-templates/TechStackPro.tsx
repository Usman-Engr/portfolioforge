import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function fmt(d?: string) {
    if (!d) return "";
    const [y, m] = d.split("-");
    return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(m) - 1]} ${y}`;
}

const DARK = "#0f172a";
const ACCENT = "#3b82f6";

const SideSecHead = ({ title }: { title: string }) => (
    <h2 style={{ fontSize: "11pt", fontWeight: 700, fontFamily: "'Courier New', monospace", textTransform: "uppercase", letterSpacing: "1.5px", color: ACCENT, margin: "0 0 8px", borderBottom: `1px solid ${ACCENT}50`, paddingBottom: "4px" }}>{title}</h2>
);

const MainSecHead = ({ title }: { title: string }) => (
    <h2 style={{ fontSize: "13pt", fontWeight: 700, fontFamily: "'Courier New', monospace", textTransform: "uppercase", letterSpacing: "1.5px", color: DARK, margin: "0 0 12px", borderBottom: `2px solid ${DARK}`, paddingBottom: "4px" }}>{title}</h2>
);

export default function TechStackPro({ data }: Props) {
    const { personal, summary, workExperience, education, skills, certifications, languages } = data;
    return (
        <div id="resume-canvas" style={{ fontFamily: "Arial, sans-serif", width: "210mm", backgroundColor: "#fff", color: DARK, margin: "0 auto", boxSizing: "border-box", wordBreak: "break-word", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact", display: "flex", flexDirection: "column" }}>

            {/* Header */}
            <div style={{ backgroundColor: DARK, padding: "24px 28px 20px", color: "#fff" }}>
                <h1 style={{ fontSize: "22pt", fontWeight: 700, margin: "0 0 3px" }}>{personal.fullName || "Your Name"}</h1>
                <p style={{ fontSize: "13pt", margin: "0 0 10px", color: ACCENT, fontWeight: 600 }}>{personal.jobTitle || "Software Engineer"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "11pt", color: "rgba(255,255,255,0.75)" }}>
                    {personal.email && <span>✉ {personal.email}</span>}
                    {personal.phone && <span>✆ {personal.phone}</span>}
                    {personal.location && <span>⊙ {personal.location}</span>}
                    {personal.github && <span>⌥ {personal.github}</span>}
                    {personal.linkedin && <span>in {personal.linkedin}</span>}
                    {personal.website && <span>⊕ {personal.website}</span>}
                </div>
            </div>

            {/* Body: 25% sidebar + 75% main */}
            <div style={{ display: "flex", flex: 1 }}>

                {/* Left Sidebar — 25% */}
                <div style={{ width: "25%", backgroundColor: "#f8fafc", padding: "20px 16px", borderRight: "1px solid #e2e8f0" }}>

                    {skills.some(g => g.skills.length > 0) && (
                        <div style={{ marginBottom: "22px" }}>
                            <SideSecHead title="Skills" />
                            {skills.filter(g => g.skills.length > 0).map((group, i) => (
                                <div key={i} style={{ marginBottom: "12px" }}>
                                    <p style={{ fontSize: "11pt", fontWeight: 700, color: "#64748b", margin: "0 0 5px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{group.category}</p>
                                    {group.skills.map((skill, j) => (
                                        <div key={j} style={{ fontSize: "11pt", color: DARK, padding: "3px 0", borderBottom: "1px solid #f1f5f9" }}>{skill}</div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}

                    {languages.length > 0 && (
                        <div style={{ marginBottom: "22px" }}>
                            <SideSecHead title="Languages" />
                            {languages.map((lang, i) => (
                                <div key={i} style={{ marginBottom: "7px" }}>
                                    <p style={{ fontSize: "11pt", fontWeight: 700, margin: "0 0 1px", color: DARK }}>{lang.language}</p>
                                    <p style={{ fontSize: "11pt", color: "#64748b", margin: 0 }}>{lang.proficiency}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {certifications.length > 0 && (
                        <div>
                            <SideSecHead title="Certifications" />
                            {certifications.map((cert, i) => (
                                <div key={i} style={{ marginBottom: "10px" }}>
                                    <p style={{ fontSize: "11pt", fontWeight: 700, margin: "0 0 2px", color: DARK, lineHeight: "1.3" }}>{cert.name}</p>
                                    <p style={{ fontSize: "11pt", color: "#64748b", margin: 0 }}>{cert.issuer}{cert.issueDate ? ` · ${fmt(cert.issueDate)}` : ""}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main Content — 75% */}
                <div style={{ flex: 1, padding: "20px 24px" }}>

                    {summary && (
                        <section style={{ marginBottom: "20px" }}>
                            <MainSecHead title="About" />
                            <p style={{ fontSize: "11pt", lineHeight: "1.7", color: "#334155", margin: 0 }}>{summary}</p>
                        </section>
                    )}

                    {workExperience.length > 0 && (
                        <section style={{ marginBottom: "20px" }}>
                            <MainSecHead title="Experience" />
                            {workExperience.map((job, i) => (
                                <div key={i} style={{ marginBottom: "16px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                        <span style={{ fontSize: "12pt", fontWeight: 700, color: DARK }}>{job.position}</span>
                                        <span style={{ fontSize: "11pt", color: ACCENT, whiteSpace: "nowrap", marginLeft: "8px", backgroundColor: `${ACCENT}15`, padding: "2px 8px", borderRadius: "100px", fontWeight: 600 }}>
                                            {fmt(job.startDate)} – {job.isCurrent ? "Present" : fmt(job.endDate)}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: "11pt", color: ACCENT, margin: "2px 0 6px", fontWeight: 600 }}>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                                    {job.description && job.description.split("\n").filter(Boolean).map((line, j) => (
                                        <p key={j} style={{ fontSize: "11pt", lineHeight: "1.6", color: "#475569", margin: "3px 0", paddingLeft: "14px", position: "relative" }}>
                                            <span style={{ position: "absolute", left: 0, color: ACCENT, fontWeight: 700 }}>›</span>
                                            {line.replace(/^[•\-›]\s*/, "")}
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </section>
                    )}

                    {education.length > 0 && (
                        <section>
                            <MainSecHead title="Education" />
                            {education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: "12px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                        <span style={{ fontSize: "12pt", fontWeight: 700, color: DARK }}>{edu.degree}{edu.fieldOfStudy ? ` · ${edu.fieldOfStudy}` : ""}</span>
                                        <span style={{ fontSize: "11pt", color: "#64748b", whiteSpace: "nowrap", marginLeft: "8px" }}>
                                            {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : edu.isCurrent ? " – Present" : ""}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: "11pt", color: ACCENT, margin: "2px 0", fontWeight: 600 }}>{edu.institution}{edu.location ? `, ${edu.location}` : ""}</p>
                                    {edu.gpa && <p style={{ fontSize: "11pt", color: "#64748b", margin: 0 }}>GPA: {edu.gpa}{edu.honors ? ` · ${edu.honors}` : ""}</p>}
                                    {edu.description && <p style={{ fontSize: "11pt", color: "#64748b", margin: "3px 0 0" }}>{edu.description}</p>}
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

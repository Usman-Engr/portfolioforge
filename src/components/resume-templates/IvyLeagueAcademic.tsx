import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function fmt(d?: string) {
    if (!d) return "";
    const [y, m] = d.split("-");
    return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(m) - 1]} ${y}`;
}

const HR = () => <div style={{ borderBottom: "1px solid #1a1a2e", margin: "10px 0" }} />;

const SecHead = ({ title }: { title: string }) => (
    <div style={{ marginBottom: "8px" }}>
        <h2 style={{ fontSize: "10pt", fontWeight: 700, fontFamily: "'Times New Roman', Times, serif", textTransform: "uppercase", letterSpacing: "1.5px", color: "#1a1a2e", margin: 0 }}>{title}</h2>
        <div style={{ borderBottom: "1.5px solid #1a1a2e", marginTop: "3px" }} />
    </div>
);

export default function IvyLeagueAcademic({ data }: Props) {
    const { personal, summary, workExperience, education, skills, certifications, languages } = data;
    return (
        <div id="resume-canvas" style={{ fontFamily: "'Times New Roman', Times, serif", width: "210mm", backgroundColor: "#fff", color: "#1a1a2e", margin: "0 auto", padding: "36px 44px", boxSizing: "border-box", wordBreak: "break-word", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>

            {/* Centered Header */}
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <h1 style={{ fontSize: "18pt", fontWeight: 700, margin: "0 0 4px", letterSpacing: "0.5px", fontFamily: "'Times New Roman', Times, serif" }}>{personal.fullName || "Your Name"}</h1>
                <p style={{ fontSize: "11pt", margin: "0 0 6px", color: "#444", fontStyle: "italic" }}>{personal.jobTitle || "Professional Title"}</p>
                <div style={{ fontSize: "11pt", color: "#333", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "14px" }}>
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>{personal.phone}</span>}
                    {personal.location && <span>{personal.location}</span>}
                    {personal.linkedin && <span>{personal.linkedin}</span>}
                    {personal.website && <span>{personal.website}</span>}
                </div>
            </div>

            <HR />

            {/* Summary */}
            {summary && (
                <section style={{ marginBottom: "16px" }}>
                    <SecHead title="Professional Summary" />
                    <p style={{ fontSize: "11pt", lineHeight: "1.6", color: "#222", margin: 0, textAlign: "justify" }}>{summary}</p>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section style={{ marginBottom: "16px" }}>
                    <SecHead title="Education" />
                    {education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: "12px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <span style={{ fontSize: "11pt", fontWeight: 700 }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}</span>
                                <span style={{ fontSize: "11pt", color: "#444", whiteSpace: "nowrap", marginLeft: "12px" }}>
                                    {fmt(edu.startDate)}{edu.endDate ? ` – ${fmt(edu.endDate)}` : edu.isCurrent ? " – Present" : ""}
                                </span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontSize: "11pt", fontStyle: "italic", color: "#333" }}>{edu.institution}{edu.location ? `, ${edu.location}` : ""}</span>
                                {edu.gpa && <span style={{ fontSize: "11pt", color: "#444" }}>GPA: {edu.gpa}</span>}
                            </div>
                            {edu.honors && <p style={{ fontSize: "11pt", color: "#555", margin: "2px 0 0", fontStyle: "italic" }}>{edu.honors}</p>}
                            {edu.description && <p style={{ fontSize: "11pt", color: "#555", margin: "2px 0 0" }}>{edu.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* Work Experience */}
            {workExperience.length > 0 && (
                <section style={{ marginBottom: "16px" }}>
                    <SecHead title="Work Experience" />
                    {workExperience.map((job, i) => (
                        <div key={i} style={{ marginBottom: "14px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <span style={{ fontSize: "11pt", fontWeight: 700 }}>{job.position}</span>
                                <span style={{ fontSize: "11pt", color: "#444", whiteSpace: "nowrap", marginLeft: "12px" }}>
                                    {fmt(job.startDate)} – {job.isCurrent ? "Present" : fmt(job.endDate)}
                                </span>
                            </div>
                            <p style={{ fontSize: "11pt", fontStyle: "italic", color: "#333", margin: "1px 0 5px" }}>{job.company}{job.location ? `, ${job.location}` : ""}</p>
                            {job.description && job.description.split("\n").filter(Boolean).map((line, j) => (
                                <p key={j} style={{ fontSize: "11pt", lineHeight: "1.55", color: "#333", margin: "3px 0", paddingLeft: "16px", position: "relative" }}>
                                    <span style={{ position: "absolute", left: 0 }}>•</span>
                                    {line.replace(/^[•\-]\s*/, "")}
                                </p>
                            ))}
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {skills.some(g => g.skills.length > 0) && (
                <section style={{ marginBottom: "16px" }}>
                    <SecHead title="Skills & Competencies" />
                    {skills.filter(g => g.skills.length > 0).map((group, i) => (
                        <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "5px" }}>
                            <span style={{ fontSize: "11pt", fontWeight: 700, minWidth: "110px", color: "#1a1a2e" }}>{group.category}:</span>
                            <span style={{ fontSize: "11pt", color: "#333" }}>{group.skills.join(", ")}</span>
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
                <section style={{ marginBottom: "16px" }}>
                    <SecHead title="Certifications & Awards" />
                    {certifications.map((cert, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                            <span style={{ fontSize: "11pt", fontWeight: 700 }}>{cert.name}</span>
                            <span style={{ fontSize: "11pt", color: "#444", fontStyle: "italic" }}>{cert.issuer}{cert.issueDate ? ` · ${fmt(cert.issueDate)}` : ""}</span>
                        </div>
                    ))}
                </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
                <section>
                    <SecHead title="Languages" />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
                        {languages.map((lang, i) => (
                            <span key={i} style={{ fontSize: "11pt", color: "#333" }}><strong>{lang.language}</strong> — {lang.proficiency}</span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function fmt(d?: string) {
    if (!d) return "";
    const [y, m] = d.split("-");
    return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(m) - 1]} ${y}`;
}

// Swiss Design: Helvetica, strict grid, font-weight hierarchy only, no icons, no colors
const SecHead = ({ title }: { title: string }) => (
    <h2 style={{ fontSize: "11pt", fontWeight: 700, fontFamily: "Helvetica, Arial, sans-serif", textTransform: "uppercase", letterSpacing: "3px", color: "#000", margin: "0 0 12px", borderTop: "2px solid #000", paddingTop: "7px" }}>{title}</h2>
);

export default function SwissDesign({ data }: Props) {
    const { personal, summary, workExperience, education, skills, certifications, languages } = data;
    return (
        <div id="resume-canvas" style={{ fontFamily: "Helvetica, Arial, sans-serif", width: "210mm", backgroundColor: "#fff", color: "#000", margin: "0 auto", padding: "40px 48px", boxSizing: "border-box", wordBreak: "break-word", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>

            {/* Header — strict grid */}
            <div style={{ marginBottom: "28px", borderBottom: "1px solid #000", paddingBottom: "18px" }}>
                <h1 style={{ fontSize: "22pt", fontWeight: 700, margin: "0 0 3px", letterSpacing: "-0.5px" }}>{personal.fullName || "Your Name"}</h1>
                <p style={{ fontSize: "13pt", fontWeight: 400, margin: "0 0 12px", color: "#333", letterSpacing: "0.5px" }}>{personal.jobTitle || "Professional Title"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0" }}>
                    {[personal.email, personal.phone, personal.location, personal.linkedin, personal.website].filter(Boolean).map((item, i, arr) => (
                        <span key={i} style={{ fontSize: "11pt", color: "#333", paddingRight: i < arr.length - 1 ? "18px" : 0, borderRight: i < arr.length - 1 ? "1px solid #ccc" : "none", marginRight: i < arr.length - 1 ? "18px" : 0 }}>{item}</span>
                    ))}
                </div>
            </div>

            {/* Summary */}
            {summary && (
                <section style={{ marginBottom: "24px" }}>
                    <SecHead title="Summary" />
                    <p style={{ fontSize: "11pt", lineHeight: "1.7", color: "#111", margin: 0, fontWeight: 400 }}>{summary}</p>
                </section>
            )}

            {/* Experience — strict date column + content column grid */}
            {workExperience.length > 0 && (
                <section style={{ marginBottom: "24px" }}>
                    <SecHead title="Experience" />
                    {workExperience.map((job, i) => (
                        <div key={i} style={{ display: "flex", gap: "0", marginBottom: "16px" }}>
                            {/* Date column — fixed 100px */}
                            <div style={{ minWidth: "100px", fontSize: "11pt", color: "#555", paddingTop: "2px", lineHeight: "1.6" }}>
                                {fmt(job.startDate)}<br />
                                {job.isCurrent ? "Present" : fmt(job.endDate)}
                            </div>
                            {/* Content column */}
                            <div style={{ flex: 1, borderLeft: "1px solid #ddd", paddingLeft: "18px" }}>
                                <p style={{ fontSize: "13pt", fontWeight: 700, margin: "0 0 2px" }}>{job.position}</p>
                                <p style={{ fontSize: "11pt", fontWeight: 400, color: "#333", margin: "0 0 6px" }}>{job.company}{job.location ? ` — ${job.location}` : ""}</p>
                                {job.description && job.description.split("\n").filter(Boolean).map((line, j) => (
                                    <p key={j} style={{ fontSize: "11pt", lineHeight: "1.6", color: "#444", margin: "3px 0", paddingLeft: "12px", position: "relative" }}>
                                        <span style={{ position: "absolute", left: 0 }}>–</span>
                                        {line.replace(/^[•\-–]\s*/, "")}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Education — same strict grid */}
            {education.length > 0 && (
                <section style={{ marginBottom: "24px" }}>
                    <SecHead title="Education" />
                    {education.map((edu, i) => (
                        <div key={i} style={{ display: "flex", gap: "0", marginBottom: "12px" }}>
                            <div style={{ minWidth: "100px", fontSize: "11pt", color: "#555", paddingTop: "2px", lineHeight: "1.6" }}>
                                {fmt(edu.startDate)}<br />
                                {edu.isCurrent ? "Present" : fmt(edu.endDate)}
                            </div>
                            <div style={{ flex: 1, borderLeft: "1px solid #ddd", paddingLeft: "18px" }}>
                                <p style={{ fontSize: "13pt", fontWeight: 700, margin: "0 0 2px" }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}</p>
                                <p style={{ fontSize: "11pt", fontWeight: 400, color: "#333", margin: 0 }}>{edu.institution}{edu.location ? `, ${edu.location}` : ""}{edu.gpa ? ` — GPA ${edu.gpa}` : ""}</p>
                                {edu.honors && <p style={{ fontSize: "11pt", color: "#555", margin: "2px 0", fontStyle: "italic" }}>{edu.honors}</p>}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills — grid layout */}
            {skills.some(g => g.skills.length > 0) && (
                <section style={{ marginBottom: "24px" }}>
                    <SecHead title="Skills" />
                    {skills.filter(g => g.skills.length > 0).map((group, i) => (
                        <div key={i} style={{ display: "flex", gap: "0", marginBottom: "6px" }}>
                            <span style={{ minWidth: "100px", fontSize: "11pt", fontWeight: 700, color: "#000", textTransform: "uppercase", letterSpacing: "0.5px", paddingTop: "1px" }}>{group.category}</span>
                            <span style={{ flex: 1, fontSize: "11pt", color: "#333", borderLeft: "1px solid #ddd", paddingLeft: "18px" }}>{group.skills.join("  ·  ")}</span>
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications + Languages */}
            {(certifications.length > 0 || languages.length > 0) && (
                <div style={{ display: "flex", gap: "0" }}>
                    {certifications.length > 0 && (
                        <div style={{ flex: 1, marginRight: "32px" }}>
                            <SecHead title="Certifications" />
                            {certifications.map((cert, i) => (
                                <div key={i} style={{ display: "flex", gap: "0", marginBottom: "5px" }}>
                                    <span style={{ minWidth: "100px", fontSize: "11pt", color: "#555" }}>{cert.issueDate ? fmt(cert.issueDate) : "—"}</span>
                                    <span style={{ flex: 1, fontSize: "11pt", color: "#333", borderLeft: "1px solid #ddd", paddingLeft: "18px" }}><strong>{cert.name}</strong> — {cert.issuer}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {languages.length > 0 && (
                        <div style={{ flex: 1 }}>
                            <SecHead title="Languages" />
                            {languages.map((lang, i) => (
                                <div key={i} style={{ display: "flex", gap: "0", marginBottom: "5px" }}>
                                    <span style={{ minWidth: "100px", fontSize: "12pt", fontWeight: 700 }}>{lang.language}</span>
                                    <span style={{ flex: 1, fontSize: "11pt", color: "#555", borderLeft: "1px solid #ddd", paddingLeft: "18px" }}>{lang.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

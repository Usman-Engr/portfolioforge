import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function fmt(d?: string) {
    if (!d) return "";
    const [y, m] = d.split("-");
    return `${["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"][parseInt(m) - 1]}/${y}`;
}

const EU_BLUE = "#003399";
const EU_LIGHT = "#e8edf8";

const SecHead = ({ title }: { title: string }) => (
    <div style={{ backgroundColor: EU_BLUE, padding: "5px 12px", marginBottom: "12px" }}>
        <h2 style={{ fontSize: "13pt", fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: "1px" }}>{title}</h2>
    </div>
);

const Row = ({ label, value }: { label: string; value?: string }) =>
    value ? (
        <div style={{ display: "flex", gap: "0", marginBottom: "5px" }}>
            <span style={{ fontSize: "11pt", fontWeight: 700, color: EU_BLUE, minWidth: "150px", fontFamily: "Arial, sans-serif" }}>{label}</span>
            <span style={{ fontSize: "11pt", color: "#222", fontFamily: "Arial, sans-serif" }}>{value}</span>
        </div>
    ) : null;

export default function EuropassStandard({ data }: Props) {
    const { personal, summary, workExperience, education, skills, certifications, languages } = data;

    const toCEFR = (p: string) => {
        const map: Record<string, string> = { Native: "C2 (Native)", Fluent: "C1", Advanced: "B2", Intermediate: "B1", Basic: "A2" };
        return map[p] || p;
    };

    return (
        <div id="resume-canvas" style={{ fontFamily: "Arial, sans-serif", width: "210mm", backgroundColor: "#fff", color: "#222", margin: "0 auto", boxSizing: "border-box", wordBreak: "break-word", WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>

            {/* EU Header Bar */}
            <div style={{ backgroundColor: EU_BLUE, padding: "18px 24px 14px", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: "22pt", fontWeight: 700, color: "#fff", margin: "0 0 3px" }}>{personal.fullName || "Your Name"}</h1>
                    <p style={{ fontSize: "13pt", color: "rgba(255,255,255,0.85)", margin: 0 }}>{personal.jobTitle || "Professional Title"}</p>
                </div>
                <div style={{ fontSize: "11pt", color: "rgba(255,255,255,0.7)", textAlign: "right", lineHeight: "1.8" }}>
                    <div>Curriculum Vitae</div>
                    <div style={{ fontSize: "10pt", opacity: 0.6 }}>Europass Format</div>
                </div>
            </div>

            <div style={{ padding: "18px 24px" }}>

                {/* Personal Information */}
                <section style={{ marginBottom: "16px" }}>
                    <SecHead title="Personal Information" />
                    <div style={{ paddingLeft: "12px" }}>
                        <Row label="Address" value={personal.location} />
                        <Row label="Telephone" value={personal.phone} />
                        <Row label="Email" value={personal.email} />
                        <Row label="LinkedIn" value={personal.linkedin} />
                        <Row label="Website / Portfolio" value={personal.website} />
                    </div>
                </section>

                {/* Summary */}
                {summary && (
                    <section style={{ marginBottom: "16px" }}>
                        <SecHead title="Personal Statement" />
                        <p style={{ fontSize: "11pt", lineHeight: "1.7", color: "#333", margin: "0 0 0 12px" }}>{summary}</p>
                    </section>
                )}

                {/* Work Experience */}
                {workExperience.length > 0 && (
                    <section style={{ marginBottom: "16px" }}>
                        <SecHead title="Work Experience" />
                        {workExperience.map((job, i) => (
                            <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "14px", paddingLeft: "12px" }}>
                                <div style={{ minWidth: "110px", fontSize: "11pt", color: EU_BLUE, fontWeight: 700, paddingTop: "1px", lineHeight: "1.6" }}>
                                    {fmt(job.startDate)} –<br />{job.isCurrent ? "Present" : fmt(job.endDate)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: "12pt", fontWeight: 700, margin: "0 0 2px", color: "#111" }}>{job.position}</p>
                                    <p style={{ fontSize: "11pt", color: EU_BLUE, margin: "0 0 5px", fontStyle: "italic" }}>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                                    {job.description && job.description.split("\n").filter(Boolean).map((line, j) => (
                                        <p key={j} style={{ fontSize: "11pt", lineHeight: "1.6", color: "#444", margin: "2px 0", paddingLeft: "12px", position: "relative" }}>
                                            <span style={{ position: "absolute", left: 0 }}>•</span>
                                            {line.replace(/^[•\-]\s*/, "")}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section style={{ marginBottom: "16px" }}>
                        <SecHead title="Education and Training" />
                        {education.map((edu, i) => (
                            <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "12px", paddingLeft: "12px" }}>
                                <div style={{ minWidth: "110px", fontSize: "11pt", color: EU_BLUE, fontWeight: 700, paddingTop: "1px", lineHeight: "1.6" }}>
                                    {fmt(edu.startDate)} –<br />{edu.isCurrent ? "Present" : fmt(edu.endDate)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: "12pt", fontWeight: 700, margin: "0 0 2px", color: "#111" }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</p>
                                    <p style={{ fontSize: "11pt", color: EU_BLUE, margin: "0 0 3px", fontStyle: "italic" }}>{edu.institution}{edu.location ? `, ${edu.location}` : ""}</p>
                                    {edu.gpa && <p style={{ fontSize: "11pt", color: "#555", margin: 0 }}>Grade: {edu.gpa}{edu.honors ? ` · ${edu.honors}` : ""}</p>}
                                    {edu.description && <p style={{ fontSize: "11pt", color: "#555", margin: "3px 0 0" }}>{edu.description}</p>}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Language Skills — CEFR Grid */}
                {languages.length > 0 && (
                    <section style={{ marginBottom: "16px" }}>
                        <SecHead title="Language Skills" />
                        <div style={{ paddingLeft: "12px" }}>
                            <div style={{ display: "flex", gap: "0", marginBottom: "4px" }}>
                                {["Language", "Understanding", "Speaking", "Writing"].map((h, i) => (
                                    <div key={i} style={{ flex: i === 0 ? "0 0 120px" : 1, fontSize: "11pt", fontWeight: 700, color: EU_BLUE, backgroundColor: EU_LIGHT, padding: "4px 8px", border: "1px solid #c8d4f0", borderRight: i < 3 ? "none" : "1px solid #c8d4f0" }}>{h}</div>
                                ))}
                            </div>
                            {languages.map((lang, i) => (
                                <div key={i} style={{ display: "flex", gap: "0" }}>
                                    <div style={{ flex: "0 0 120px", fontSize: "11pt", fontWeight: 700, padding: "4px 8px", border: "1px solid #c8d4f0", borderTop: "none", borderRight: "none" }}>{lang.language}</div>
                                    {[toCEFR(lang.proficiency), toCEFR(lang.proficiency), toCEFR(lang.proficiency)].map((v, j) => (
                                        <div key={j} style={{ flex: 1, fontSize: "11pt", color: "#444", padding: "4px 8px", border: "1px solid #c8d4f0", borderTop: "none", borderRight: j < 2 ? "none" : "1px solid #c8d4f0" }}>{v}</div>
                                    ))}
                                </div>
                            ))}
                            <p style={{ fontSize: "11pt", color: "#888", margin: "5px 0 0" }}>Levels: A1/A2: Basic · B1/B2: Independent · C1/C2: Proficient</p>
                        </div>
                    </section>
                )}

                {/* Digital Skills Grid */}
                {skills.some(g => g.skills.length > 0) && (
                    <section style={{ marginBottom: "16px" }}>
                        <SecHead title="Digital Skills" />
                        <div style={{ paddingLeft: "12px" }}>
                            {skills.filter(g => g.skills.length > 0).map((group, i) => (
                                <div key={i} style={{ marginBottom: "8px" }}>
                                    <p style={{ fontSize: "11pt", fontWeight: 700, color: EU_BLUE, margin: "0 0 4px" }}>{group.category}</p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                        {group.skills.map((skill, j) => (
                                            <span key={j} style={{ fontSize: "11pt", padding: "3px 10px", backgroundColor: EU_LIGHT, border: "1px solid #c8d4f0", color: "#333" }}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                    <section>
                        <SecHead title="Certificates and Licences" />
                        <div style={{ paddingLeft: "12px" }}>
                            {certifications.map((cert, i) => (
                                <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "5px" }}>
                                    <span style={{ fontSize: "11pt", color: EU_BLUE, fontWeight: 700, minWidth: "110px" }}>{cert.issueDate ? fmt(cert.issueDate) : "—"}</span>
                                    <span style={{ fontSize: "11pt", color: "#333" }}><strong>{cert.name}</strong> — {cert.issuer}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

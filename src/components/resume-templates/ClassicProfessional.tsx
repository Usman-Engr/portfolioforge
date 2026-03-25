import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props {
  data: ResumeData;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export default function ClassicProfessional({ data }: Props) {
  const { personal, summary, workExperience, education, skills, certifications, languages } = data;
  const accentColor = "#1e3a5f";

  return (
    <div
      className="resume-section"
      style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        width: "210mm",
        // NO minHeight - let content determine height to avoid extra pages
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
        wordBreak: "break-word",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
        display: "block", // Block instead of flex to prevent stretching
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* 100% Height Absolute Background Pillars to solve PDF engine flex bugs */}
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "62%", backgroundColor: "#ffffff", zIndex: -1 }} />
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "38%", backgroundColor: "#f7f9fc", zIndex: -1 }} />
      
      {/* Header */}
      <div style={{ backgroundColor: accentColor, padding: "32px 40px 28px", color: "#ffffff", position: "relative", zIndex: 1 }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "1px", margin: 0, fontFamily: "'Georgia', serif" }}>
          {personal.fullName || "Your Name"}
        </h1>
        <p style={{ fontSize: "14px", margin: "6px 0 0", color: "#a8c4e0", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "Arial, sans-serif", fontWeight: 400 }}>
          {personal.jobTitle || "Professional Title"}
        </p>
        <div style={{ display: "block", flexWrap: "wrap", gap: "16px", marginTop: "16px", fontFamily: "Arial, sans-serif", fontSize: "11px", color: "#c8dcea" }}>
          {personal.email && <span>✉ {personal.email}</span>}
          {personal.phone && <span>✆ {personal.phone}</span>}
          {personal.location && <span>⊙ {personal.location}</span>}
          {personal.linkedin && <span>in {personal.linkedin}</span>}
          {personal.website && <span>⊕ {personal.website}</span>}
        </div>
      </div>

      {/* Body: Two-column */}
      <div style={{ display: "block", flexDirection: "row" }}>
        {/* Left Column */}
        <div style={{ width: "62%", padding: "28px 24px 28px 40px", borderRight: "1px solid #e8eef4" }}>
          {/* Summary */}
          {summary && (
            <section style={{ marginBottom: "24px" }}>
              <div style={{ borderBottom: `2px solid ${accentColor}`, paddingBottom: "4px", marginBottom: "10px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: accentColor, margin: 0, fontFamily: "Arial, sans-serif" }}>Professional Summary</h2>
              </div>
              <p style={{ fontSize: "11.5px", lineHeight: "1.7", color: "#333", margin: 0, textAlign: "justify" }}>{summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <section style={{ marginBottom: "24px" }}>
              <div style={{ borderBottom: `2px solid ${accentColor}`, paddingBottom: "4px", marginBottom: "10px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: accentColor, margin: 0, fontFamily: "Arial, sans-serif" }}>Experience</h2>
              </div>
              {workExperience.map((job, i) => (
                <div key={i} style={{ marginBottom: "18px" }}>
                  <div style={{ display: "block", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 style={{ fontSize: "13px", fontWeight: 700, margin: 0, color: "#111", fontFamily: "Arial, sans-serif" }}>{job.position}</h3>
                      <p style={{ fontSize: "12px", color: accentColor, margin: "2px 0", fontFamily: "Arial, sans-serif", fontStyle: "italic" }}>
                        {job.company}{job.location ? ` · ${job.location}` : ""}
                      </p>
                    </div>
                    <span style={{ fontSize: "10.5px", color: "#666", whiteSpace: "nowrap", marginLeft: "8px", fontFamily: "Arial, sans-serif", marginTop: "2px" }}>
                      {formatDate(job.startDate)} – {job.isCurrent ? "Present" : formatDate(job.endDate)}
                    </span>
                  </div>
                  {job.description && (
                    <div style={{ marginTop: "6px" }}>
                      {job.description.split("\n").filter(Boolean).map((line, j) => (
                        <p key={j} style={{ fontSize: "11px", lineHeight: "1.6", color: "#444", margin: "2px 0", paddingLeft: "10px", position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, top: "1px", color: accentColor }}>•</span>
                          {line.replace(/^[•\-]\s*/, "")}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <div style={{ borderBottom: `2px solid ${accentColor}`, paddingBottom: "4px", marginBottom: "10px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: accentColor, margin: 0, fontFamily: "Arial, sans-serif" }}>Education</h2>
              </div>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <div style={{ display: "block", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ fontSize: "12.5px", fontWeight: 700, margin: 0, fontFamily: "Arial, sans-serif" }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}</h3>
                      <p style={{ fontSize: "11.5px", color: accentColor, margin: "2px 0", fontFamily: "Arial, sans-serif", fontStyle: "italic" }}>{edu.institution}</p>
                      {edu.gpa && <p style={{ fontSize: "10.5px", color: "#666", margin: "1px 0", fontFamily: "Arial, sans-serif" }}>GPA: {edu.gpa}</p>}
                    </div>
                    <span style={{ fontSize: "10.5px", color: "#666", whiteSpace: "nowrap", marginLeft: "8px", fontFamily: "Arial, sans-serif" }}>
                      {formatDate(edu.startDate)}{edu.endDate ? ` – ${formatDate(edu.endDate)}` : ""}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div style={{ width: "38%", padding: "28px 32px 28px 24px", backgroundColor: "#f7f9fc" }}>
          {/* Skills */}
          {skills.some((g) => g.skills.length > 0) && (
            <section style={{ marginBottom: "24px" }}>
              <div style={{ borderBottom: `2px solid ${accentColor}`, paddingBottom: "4px", marginBottom: "10px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: accentColor, margin: 0, fontFamily: "Arial, sans-serif" }}>Skills</h2>
              </div>
              {skills.filter((g) => g.skills.length > 0).map((group, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#333", margin: "0 0 4px", fontFamily: "Arial, sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>{group.category}</p>
                  <p style={{ fontSize: "11px", color: "#555", margin: 0, lineHeight: 1.7, fontFamily: "Arial, sans-serif" }}>{group.skills.join(" · ")}</p>
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section style={{ marginBottom: "24px" }}>
              <div style={{ borderBottom: `2px solid ${accentColor}`, paddingBottom: "4px", marginBottom: "10px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: accentColor, margin: 0, fontFamily: "Arial, sans-serif" }}>Certifications</h2>
              </div>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <p style={{ fontSize: "11.5px", fontWeight: 700, color: "#333", margin: 0, fontFamily: "Arial, sans-serif" }}>{cert.name}</p>
                  <p style={{ fontSize: "10.5px", color: "#666", margin: "1px 0", fontFamily: "Arial, sans-serif", fontStyle: "italic" }}>{cert.issuer}</p>
                  {cert.issueDate && <p style={{ fontSize: "10px", color: "#888", fontFamily: "Arial, sans-serif" }}>{formatDate(cert.issueDate)}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <div style={{ borderBottom: `2px solid ${accentColor}`, paddingBottom: "4px", marginBottom: "10px" }}>
                <h2 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: accentColor, margin: 0, fontFamily: "Arial, sans-serif" }}>Languages</h2>
              </div>
              {languages.map((lang, i) => (
                <div key={i} style={{ display: "block", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "11px", fontFamily: "Arial, sans-serif", color: "#333" }}>{lang.language}</span>
                  <span style={{ fontSize: "10px", fontFamily: "Arial, sans-serif", color: "#666", fontStyle: "italic" }}>{lang.proficiency}</span>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

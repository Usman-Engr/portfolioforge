import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export default function ExecutiveBold({ data }: Props) {
  const { personal, summary, workExperience, education, skills, certifications, languages } = data;

  return (
    <div
      id="resume-canvas"
      style={{
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        width: "210mm",
        minHeight: "auto",
        backgroundColor: "#ffffff",
        color: "#111827",
        margin: "0 auto",
        boxSizing: "border-box",
        wordBreak: "break-word",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* Bold Top Header */}
      <div style={{ padding: "40px 44px 28px", borderBottom: "4px solid #111827" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 900, margin: "0 0 6px", letterSpacing: "-1px", color: "#111827", textTransform: "uppercase" }}>
          {personal.fullName || "Your Name"}
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <p style={{ fontSize: "15px", margin: 0, color: "#374151", fontWeight: 600, letterSpacing: "1px" }}>
            {personal.jobTitle || "Professional Title"}
          </p>
          <div style={{ height: "14px", width: "1px", backgroundColor: "#d1d5db" }} />
          <div style={{ display: "flex", gap: "16px", fontSize: "11px", color: "#6b7280", flexWrap: "wrap" }}>
            {personal.email && <span>✉ {personal.email}</span>}
            {personal.phone && <span>✆ {personal.phone}</span>}
            {personal.location && <span>⊙ {personal.location}</span>}
            {personal.linkedin && <span>in {personal.linkedin}</span>}
            {personal.website && <span>⊕ {personal.website}</span>}
          </div>
        </div>
      </div>

      <div style={{ padding: "28px 44px 40px" }}>
        {/* Summary */}
        {summary && (
          <section style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 8px", borderBottom: "1px solid #e5e7eb", paddingBottom: "6px" }}>
              Executive Summary
            </h2>
            <p style={{ fontSize: "12px", lineHeight: "1.8", color: "#374151", margin: 0 }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <section style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 14px", borderBottom: "1px solid #e5e7eb", paddingBottom: "6px" }}>
              Professional Experience
            </h2>
            {workExperience.map((job, i) => (
              <div key={i} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 800, margin: 0, color: "#111827", textTransform: "uppercase", letterSpacing: "0.3px" }}>{job.position}</h3>
                  <span style={{ fontSize: "10.5px", color: "#6b7280", fontWeight: 600, whiteSpace: "nowrap", marginLeft: "12px" }}>
                    {formatDate(job.startDate)} — {job.isCurrent ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                <p style={{ fontSize: "12.5px", color: "#374151", margin: "0 0 8px", fontWeight: 600 }}>
                  {job.company}{job.location ? ` | ${job.location}` : ""}
                </p>
                {job.description && (
                  <div>
                    {job.description.split("\n").filter(Boolean).map((line, j) => (
                      <div key={j} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ color: "#111827", fontWeight: 800, marginTop: "1px", flexShrink: 0, fontSize: "11px" }}>▸</span>
                        <p style={{ fontSize: "11.5px", lineHeight: "1.6", color: "#4b5563", margin: 0 }}>
                          {line.replace(/^[•\-▸]\s*/, "")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Bottom Grid */}
        <div style={{ display: "flex", gap: "40px" }}>
          {/* Education */}
          {education.length > 0 && (
            <div style={{ flex: "1 1 45%" }}>
              <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 12px", borderBottom: "1px solid #e5e7eb", paddingBottom: "6px" }}>
                Education
              </h2>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "12.5px", fontWeight: 800, margin: "0 0 2px", color: "#111827" }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</h3>
                  <p style={{ fontSize: "12px", color: "#374151", margin: "0 0 1px", fontWeight: 600 }}>{edu.institution}</p>
                  <p style={{ fontSize: "10.5px", color: "#6b7280", margin: 0 }}>
                    {formatDate(edu.startDate)}{edu.endDate ? ` – ${formatDate(edu.endDate)}` : edu.startDate ? " – Present" : ""}
                    {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                  </p>
                  {edu.honors && <p style={{ fontSize: "10px", color: "#9ca3af", margin: "1px 0", fontStyle: "italic" }}>{edu.honors}</p>}
                  {edu.description && <p style={{ fontSize: "10px", color: "#6b7280", margin: "2px 0", lineHeight: "1.5" }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills & More */}
          <div style={{ flex: "1 1 55%" }}>
            {skills.some((g) => g.skills.length > 0) && (
              <div style={{ marginBottom: "16px" }}>
                <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 12px", borderBottom: "1px solid #e5e7eb", paddingBottom: "6px" }}>
                  Core Competencies
                </h2>
                {skills.filter((g) => g.skills.length > 0).map((group, i) => (
                  <div key={i} style={{ marginBottom: "8px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap", marginTop: "1px", minWidth: "70px" }}>{group.category}:</span>
                    <span style={{ fontSize: "11px", color: "#4b5563" }}>{group.skills.join(", ")}</span>
                  </div>
                ))}
              </div>
            )}

            {(certifications.length > 0 || languages.length > 0) && (
              <div style={{ display: "flex", gap: "24px" }}>
                {certifications.length > 0 && (
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 10px", borderBottom: "1px solid #e5e7eb", paddingBottom: "6px" }}>Certifications</h2>
                    {certifications.map((cert, i) => (
                      <div key={i} style={{ marginBottom: "8px" }}>
                        <p style={{ fontSize: "11px", fontWeight: 700, margin: 0, color: "#111827" }}>{cert.name}</p>
                        <p style={{ fontSize: "10px", color: "#6b7280", margin: 0 }}>{cert.issuer}</p>
                      </div>
                    ))}
                  </div>
                )}
                {languages.length > 0 && (
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 10px", borderBottom: "1px solid #e5e7eb", paddingBottom: "6px" }}>Languages</h2>
                    {languages.map((lang, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <span style={{ fontSize: "11px", color: "#374151" }}>{lang.language}</span>
                        <span style={{ fontSize: "10px", color: "#6b7280" }}>{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

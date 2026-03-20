import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export default function CreativeAccent({ data }: Props) {
  const { personal, summary, workExperience, education, skills, certifications, languages } = data;
  const accent = "#7c3aed";
  const accentLight = "#ede9fe";

  const SideSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: "24px" }}>
      <h2 style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", margin: "0 0 10px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "6px" }}>{title}</h2>
      {children}
    </div>
  );

  const MainSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: "22px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <div style={{ width: "18px", height: "2px", backgroundColor: accent, borderRadius: "1px", flexShrink: 0 }} />
        <h2 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: accent, margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div
      id="resume-canvas"
      style={{
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        wordBreak: "break-word",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* 100% Height Absolute Background Pillars for print bugs */}
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "36%", backgroundColor: "#2d1b69", zIndex: -1 }} />
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "64%", backgroundColor: "#ffffff", zIndex: -1 }} />

      {/* Top Name Bar */}
      <div style={{ backgroundColor: accent, padding: "28px 0 22px", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 900, margin: "0 0 4px", color: "#fff", letterSpacing: "2px", textTransform: "uppercase" }}>
          {personal.fullName || "Your Name"}
        </h1>
        <p style={{ fontSize: "13px", margin: 0, color: "rgba(255,255,255,0.8)", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 400 }}>
          {personal.jobTitle || "Professional Title"}
        </p>
      </div>

      {/* Contact Strip */}
      <div style={{ backgroundColor: "#1f1334", padding: "8px 32px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
        {personal.email && <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.75)" }}>✉ {personal.email}</span>}
        {personal.phone && <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.75)" }}>✆ {personal.phone}</span>}
        {personal.location && <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.75)" }}>⊙ {personal.location}</span>}
        {personal.linkedin && <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.75)" }}>in {personal.linkedin}</span>}
      </div>

      {/* Body: Sidebar + Main */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div style={{ width: "36%", backgroundColor: "#2d1b69", padding: "28px 22px", color: "#fff" }}>
          {/* Skills */}
          {skills.some((g) => g.skills.length > 0) && (
            <SideSection title="Skills">
              {skills.filter((g) => g.skills.length > 0).map((group, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.5)", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>{group.category}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {group.skills.map((skill, j) => (
                      <span key={j} style={{ fontSize: "10px", padding: "3px 9px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "100px", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </SideSection>
          )}

          {/* Education (in sidebar) */}
          {education.length > 0 && (
            <SideSection title="Education">
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "12px" }}>
                  <p style={{ fontSize: "11.5px", fontWeight: 700, margin: "0 0 1px", color: "#fff" }}>{edu.degree}</p>
                  {edu.fieldOfStudy && <p style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.6)", margin: "0 0 1px" }}>{edu.fieldOfStudy}</p>}
                  <p style={{ fontSize: "11px", color: `${accentLight}cc`, margin: "0 0 1px" }}>{edu.institution}</p>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", margin: 0 }}>{formatDate(edu.startDate)}{edu.endDate ? ` – ${formatDate(edu.endDate)}` : ""}{edu.gpa ? ` · ${edu.gpa} GPA` : ""}</p>
                </div>
              ))}
            </SideSection>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <SideSection title="Languages">
              {languages.map((lang, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "11px", color: "#fff" }}>{lang.language}</span>
                  <span style={{ fontSize: "9.5px", color: "rgba(255,255,255,0.45)" }}>{lang.proficiency}</span>
                </div>
              ))}
            </SideSection>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <SideSection title="Certifications">
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, margin: "0 0 1px", color: "#fff" }}>{cert.name}</p>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", margin: 0 }}>{cert.issuer}{cert.issueDate ? ` · ${formatDate(cert.issueDate)}` : ""}</p>
                </div>
              ))}
            </SideSection>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "28px 32px 28px 28px" }}>
          {/* Summary */}
          {summary && (
            <MainSection title="Profile">
              <p style={{ fontSize: "11.5px", lineHeight: "1.8", color: "#374151", margin: 0 }}>{summary}</p>
            </MainSection>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <MainSection title="Experience">
              {workExperience.map((job, i) => (
                <div key={i} style={{ marginBottom: "16px", paddingLeft: "12px", borderLeft: `2px solid ${accentLight}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 1px", color: "#111827" }}>{job.position}</h3>
                      <p style={{ fontSize: "12px", color: accent, margin: "0 0 5px", fontWeight: 600 }}>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                    </div>
                    <span style={{ fontSize: "10px", whiteSpace: "nowrap", marginLeft: "8px", backgroundColor: accentLight, padding: "2px 8px", borderRadius: "100px", color: accent, fontWeight: 600 }}>
                      {formatDate(job.startDate)} – {job.isCurrent ? "Present" : formatDate(job.endDate)}
                    </span>
                  </div>
                  {job.description && (
                    <div>
                      {job.description.split("\n").filter(Boolean).map((line, j) => (
                        <p key={j} style={{ fontSize: "11px", lineHeight: "1.6", color: "#4b5563", margin: "2px 0", paddingLeft: "10px", position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, color: accent, fontWeight: 800 }}>·</span>
                          {line.replace(/^[•\-]\s*/, "")}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </MainSection>
          )}
        </div>
      </div>
    </div>
  );
}

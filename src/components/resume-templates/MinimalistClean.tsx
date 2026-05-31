import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export default function MinimalistClean({ data }: Props) {
  const { personal, summary, workExperience, education, skills, certifications, languages } = data;

  const Divider = () => <div style={{ height: "1px", backgroundColor: "#e5e7eb", margin: "18px 0" }} />;

  const SectionHeader = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#6b7280", margin: "0 0 12px", fontFamily: "Arial, sans-serif" }}>{children}</h2>
  );

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
        padding: "48px 52px",
        boxSizing: "border-box",
        wordBreak: "break-word",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* Minimal Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 4px", color: "#111827", letterSpacing: "-0.3px" }}>
          {personal.fullName || "Your Name"}
        </h1>
        <p style={{ fontSize: "13px", margin: "0 0 12px", color: "#374151" }}>{personal.jobTitle || "Professional Title"}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "11px", color: "#6b7280" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      <Divider />

      {/* Summary */}
      {summary && (
        <>
          <section>
            <SectionHeader>Summary</SectionHeader>
            <p style={{ fontSize: "11.5px", lineHeight: "1.8", color: "#4b5563", margin: 0 }}>{summary}</p>
          </section>
          <Divider />
        </>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <>
          <section>
            <SectionHeader>Experience</SectionHeader>
            {workExperience.map((job, i) => (
              <div key={i} style={{ marginBottom: i < workExperience.length - 1 ? "16px" : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>{job.position}</span>
                    <span style={{ fontSize: "12px", color: "#374151" }}> · {job.company}{job.location ? `, ${job.location}` : ""}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap", marginLeft: "12px" }}>
                    {formatDate(job.startDate)} – {job.isCurrent ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                {job.description && (
                  <div style={{ marginTop: "5px" }}>
                    {job.description.split("\n").filter(Boolean).map((line, j) => (
                      <p key={j} style={{ fontSize: "11.5px", lineHeight: "1.65", color: "#4b5563", margin: "2px 0" }}>
                        — {line.replace(/^[•\-]\s*/, "")}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
          <Divider />
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <section>
            <SectionHeader>Education</SectionHeader>
            {education.map((edu, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <div>
                  <p style={{ fontSize: "12.5px", fontWeight: 700, margin: "0 0 1px", color: "#111827" }}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</p>
                  <p style={{ fontSize: "11.5px", color: "#4b5563", margin: 0 }}>{edu.institution}{edu.location ? ` · ${edu.location}` : ""}{edu.gpa ? ` · GPA ${edu.gpa}` : ""}</p>
                  {edu.honors && <p style={{ fontSize: "10.5px", color: "#6b7280", margin: "1px 0", fontStyle: "italic" }}>{edu.honors}</p>}
                  {edu.description && <p style={{ fontSize: "10.5px", color: "#6b7280", margin: "1px 0" }}>{edu.description}</p>}
                </div>
                <span style={{ fontSize: "11px", color: "#9ca3af", whiteSpace: "nowrap", marginLeft: "12px" }}>
                  {formatDate(edu.startDate)}{edu.endDate ? ` – ${formatDate(edu.endDate)}` : edu.startDate ? " – Present" : ""}
                </span>
              </div>
            ))}
          </section>
          <Divider />
        </>
      )}

      {/* Skills */}
      {skills.some((g) => g.skills.length > 0) && (
        <>
          <section>
            <SectionHeader>Skills</SectionHeader>
            {skills.filter((g) => g.skills.length > 0).map((group, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "5px", alignItems: "baseline" }}>
                <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#374151", minWidth: "80px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{group.category}</span>
                <span style={{ fontSize: "11.5px", color: "#4b5563" }}>{group.skills.join(", ")}</span>
              </div>
            ))}
          </section>
        </>
      )}

      {/* Certs + Languages in a line */}
      {(certifications.length > 0 || languages.length > 0) && (
        <>
          <Divider />
          <div style={{ display: "flex", gap: "40px" }}>
            {certifications.length > 0 && (
              <div style={{ flex: 1 }}>
                <SectionHeader>Certifications</SectionHeader>
                {certifications.map((cert, i) => (
                  <p key={i} style={{ fontSize: "11.5px", color: "#4b5563", margin: "0 0 4px" }}>
                    <strong style={{ color: "#111827" }}>{cert.name}</strong> · {cert.issuer}
                    {cert.issueDate ? ` · ${formatDate(cert.issueDate)}` : ""}
                  </p>
                ))}
              </div>
            )}
            {languages.length > 0 && (
              <div style={{ flex: 1 }}>
                <SectionHeader>Languages</SectionHeader>
                <p style={{ fontSize: "11.5px", color: "#4b5563", margin: 0 }}>
                  {languages.map((l) => `${l.language} (${l.proficiency})`).join(" · ")}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

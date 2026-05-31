import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props { data: ResumeData; }

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export default function ModernTimeline({ data }: Props) {
  const { personal, summary, workExperience, education, skills, certifications, languages } = data;
  const accent = "#2563eb";

  const SectionTitle = ({ title }: { title: string }) => (
    <div style={{ display: "block", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
      <div style={{ width: "3px", height: "20px", backgroundColor: accent, borderRadius: "2px", flexShrink: 0 }} />
      <h2 style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "#111", margin: 0, fontFamily: "Arial, sans-serif" }}>{title}</h2>
    </div>
  );

  return (
    <div
      id="resume-canvas"
      style={{
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        width: "210mm",
        minHeight: "auto",
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
        margin: "0 auto",
        boxSizing: "border-box",
        wordBreak: "break-word",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
        display: "block",

      }}
    >
      {/* Top Header Bar */}
      <div style={{ padding: "36px 44px 30px", borderBottom: "2px solid #f3f4f6" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: "30px", fontWeight: 800, margin: 0, color: "#111", letterSpacing: "-0.5px" }}>
              {personal.fullName || "Your Name"}
            </h1>
            <p style={{ fontSize: "14px", margin: "6px 0 0", color: accent, fontWeight: 600, letterSpacing: "0.5px" }}>
              {personal.jobTitle || "Professional Title"}
            </p>
          </div>
          <div style={{ textAlign: "right", fontSize: "11px", color: "#555", lineHeight: "1.8" }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.linkedin && <div style={{ color: accent }}>{personal.linkedin}</div>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 44px 36px", flex: 1 }}>
        {/* Summary */}
        {summary && (
          <section style={{ marginBottom: "26px" }}>
            <SectionTitle title="About Me" />
            <p style={{ fontSize: "12px", lineHeight: "1.8", color: "#444", margin: 0, textAlign: "justify" }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <section style={{ marginBottom: "26px" }}>
            <SectionTitle title="Work Experience" />
            <div style={{ position: "relative" }}>
              {/* Timeline line */}
              <div style={{ position: "absolute", left: "5px", top: "8px", bottom: "0", width: "1px", backgroundColor: "#e5e7eb" }} />
              {workExperience.map((job, i) => (
                <div key={i} style={{ position: "relative", paddingLeft: "26px", marginBottom: "20px" }}>
                  {/* Timeline dot */}
                  <div style={{ position: "absolute", left: 0, top: "5px", width: "11px", height: "11px", borderRadius: "50%", backgroundColor: accent, border: "2px solid #fff", boxShadow: `0 0 0 2px ${accent}` }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 style={{ fontSize: "13px", fontWeight: 700, margin: 0, color: "#111" }}>{job.position}</h3>
                      <p style={{ fontSize: "12px", color: accent, margin: "2px 0", fontWeight: 600 }}>{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                    </div>
                    <span style={{ fontSize: "10.5px", color: "#777", whiteSpace: "nowrap", marginLeft: "8px", backgroundColor: "#f3f4f6", padding: "2px 8px", borderRadius: "100px" }}>
                      {formatDate(job.startDate)} – {job.isCurrent ? "Present" : formatDate(job.endDate)}
                    </span>
                  </div>
                  {job.description && (
                    <div style={{ marginTop: "6px" }}>
                      {job.description.split("\n").filter(Boolean).map((line, j) => (
                        <p key={j} style={{ fontSize: "11px", lineHeight: "1.65", color: "#555", margin: "2px 0", paddingLeft: "10px", position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, color: accent }}>›</span>
                          {line.replace(/^[•\-›]\s*/, "")}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two-column lower section */}
        <div style={{ display: "flex", gap: "32px" }}>
          {/* Left: Education */}
          <div style={{ flex: "1 1 50%" }}>
            {education.length > 0 && (
              <section style={{ marginBottom: "24px" }}>
                <SectionTitle title="Education" />
                {education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: "12px" }}>
                    <h3 style={{ fontSize: "12.5px", fontWeight: 700, margin: 0, color: "#111" }}>{edu.degree}</h3>
                    {edu.fieldOfStudy && <p style={{ fontSize: "11px", color: "#555", margin: "1px 0" }}>{edu.fieldOfStudy}</p>}
                    <p style={{ fontSize: "11.5px", color: accent, margin: "2px 0", fontWeight: 600 }}>{edu.institution}</p>
                    <p style={{ fontSize: "10.5px", color: "#777", margin: "1px 0" }}>{formatDate(edu.startDate)}{edu.endDate ? ` – ${formatDate(edu.endDate)}` : edu.isCurrent ? " – Present" : edu.startDate ? " – Present" : ""}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}</p>
                    {edu.honors && <p style={{ fontSize: "10px", color: "#888", margin: "1px 0", fontStyle: "italic" }}>{edu.honors}</p>}
                    {edu.description && <p style={{ fontSize: "10px", color: "#666", margin: "2px 0", lineHeight: "1.5" }}>{edu.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <SectionTitle title="Certifications" />
                {certifications.map((cert, i) => (
                  <div key={i} style={{ marginBottom: "10px" }}>
                    <p style={{ fontSize: "11.5px", fontWeight: 700, margin: 0, color: "#111" }}>{cert.name}</p>
                    <p style={{ fontSize: "10.5px", color: "#666", margin: "1px 0" }}>{cert.issuer}{cert.issueDate ? ` · ${formatDate(cert.issueDate)}` : ""}</p>
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Right: Skills + Languages */}
          <div style={{ flex: "1 1 50%" }}>
            {skills.some((g) => g.skills.length > 0) && (
              <section style={{ marginBottom: "24px" }}>
                <SectionTitle title="Skills" />
                {skills.filter((g) => g.skills.length > 0).map((group, i) => (
                  <div key={i} style={{ marginBottom: "10px" }}>
                    <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#888", margin: "0 0 5px", textTransform: "uppercase", letterSpacing: "0.8px" }}>{group.category}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                      {group.skills.map((skill, j) => (
                        <span key={j} style={{ fontSize: "10.5px", padding: "3px 10px", borderRadius: "100px", backgroundColor: `${accent}15`, color: accent, fontWeight: 600, border: `1px solid ${accent}25` }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <SectionTitle title="Languages" />
                {languages.map((lang, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11.5px", color: "#333", fontWeight: 600 }}>{lang.language}</span>
                    <span style={{ fontSize: "10px", color: "#777", backgroundColor: "#f3f4f6", padding: "2px 8px", borderRadius: "100px" }}>{lang.proficiency}</span>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { ResumeData } from "@/lib/types/resume";

interface Props {
  data: ResumeData;
}

function fmt(d?: string) {
  if (!d) return "";
  const [y, m] = d.split("-");
  if (!y || !m) return d;
  return `${m.padStart(2, "0")}/${y}`;
}

/* ── Helpers ── */
function lightenColor(hex: string, amount: number): string {
  hex = hex.replace("#", "");
  const r = Math.min(255, parseInt(hex.substring(0, 2), 16) + amount);
  const g = Math.min(255, parseInt(hex.substring(2, 4), 16) + amount);
  const b = Math.min(255, parseInt(hex.substring(4, 6), 16) + amount);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function EuropassStandard({ data }: Props) {
  const personal = data?.personal || {};
  const summary = data?.summary || "";
  const workExperience = data?.workExperience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const certifications = data?.certifications || [];
  const languages = data?.languages || [];

  const ACCENT = data?.accentColor || "#0e4e96";
  const SIDEBAR_BG = lightenColor(ACCENT, 200);

  const motherTongues = languages.filter((l) => l.isMotherTongue);
  const otherLanguages = languages.filter((l) => !l.isMotherTongue);

  const toCEFR = (p: string) => {
    const map: Record<string, string> = {
      Native: "C2",
      Fluent: "C1",
      Advanced: "B2",
      Intermediate: "B1",
      Basic: "A2",
    };
    return map[p] || p;
  };

  /* Styles */
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "14pt",
    fontWeight: 700,
    color: ACCENT,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "12px",
    marginTop: "8px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const sidebarLabelStyle: React.CSSProperties = {
    fontSize: "10pt",
    fontWeight: 700,
    color: "#555",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    marginBottom: "2px",
    fontFamily: "Arial, Helvetica, sans-serif",
  };

  const sidebarValueStyle: React.CSSProperties = {
    fontSize: "11pt",
    color: "#333",
    marginBottom: "10px",
    lineHeight: "1.4",
    fontFamily: "Arial, Helvetica, sans-serif",
    wordBreak: "break-word" as const,
  };

  return (
    <div
      id="resume-canvas"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#fff",
        color: "#222",
        margin: "0 auto",
        boxSizing: "border-box",
        display: "flex",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* ═══════ LEFT SIDEBAR ═══════ */}
      <div
        style={{
          width: "200px",
          flexShrink: 0,
          backgroundColor: SIDEBAR_BG,
          padding: "30px 18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            overflow: "hidden",
            border: `3px solid ${ACCENT}`,
            marginBottom: "14px",
            backgroundColor: "#ddd",
            flexShrink: 0,
          }}
        >
          {personal.avatarUrl ? (
            <img
              src={personal.avatarUrl}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                fontSize: "36pt",
                fontWeight: 300,
              }}
            >
              {personal.fullName
                ? personal.fullName.charAt(0).toUpperCase()
                : "?"}
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "20pt",
              fontWeight: 700,
              color: "#111",
              lineHeight: "1.2",
              marginBottom: "6px",
            }}
          >
            {personal.fullName || "Your Name"}
          </div>
          <div style={{ fontSize: "12pt", color: ACCENT, fontStyle: "italic" }}>
            {personal.jobTitle || "Job Title"}
          </div>
        </div>

        {/* ── DETAILS ── */}
        <div style={{ width: "100%", marginBottom: "14px" }}>
          <div
            style={{
              ...sectionTitleStyle,
              fontSize: "12pt",
              textAlign: "left",
              borderBottom: `2px solid ${ACCENT}`,
              paddingBottom: "4px",
            }}
          >
            DETAILS
          </div>
          <div style={{ paddingTop: "10px" }}>
            {personal.dateOfBirth && (
              <>
                <div style={sidebarLabelStyle}>Date of birth:</div>
                <div style={sidebarValueStyle}>{personal.dateOfBirth}</div>
              </>
            )}
            {personal.nationality && (
              <>
                <div style={sidebarLabelStyle}>Nationality:</div>
                <div style={sidebarValueStyle}>{personal.nationality}</div>
              </>
            )}
            {personal.gender && (
              <>
                <div style={sidebarLabelStyle}>Gender:</div>
                <div style={sidebarValueStyle}>{personal.gender}</div>
              </>
            )}
            {personal.phone && (
              <>
                <div style={sidebarLabelStyle}>Phone number:</div>
                <div style={sidebarValueStyle}>{personal.phone}</div>
              </>
            )}
            {personal.email && (
              <>
                <div style={sidebarLabelStyle}>Email address:</div>
                <div style={sidebarValueStyle}>{personal.email}</div>
              </>
            )}
            {personal.linkedin && (
              <>
                <div style={sidebarLabelStyle}>LinkedIn:</div>
                <div style={sidebarValueStyle}>{personal.linkedin}</div>
              </>
            )}
            {personal.website && (
              <>
                <div style={sidebarLabelStyle}>Website:</div>
                <div style={sidebarValueStyle}>{personal.website}</div>
              </>
            )}
            {personal.github && (
              <>
                <div style={sidebarLabelStyle}>GitHub:</div>
                <div style={sidebarValueStyle}>{personal.github}</div>
              </>
            )}
            {personal.location && (
              <>
                <div style={sidebarLabelStyle}>Address:</div>
                <div style={sidebarValueStyle}>{personal.location}</div>
              </>
            )}
            {personal.drivingLicence && (
              <>
                <div style={sidebarLabelStyle}>Driving licence:</div>
                <div style={sidebarValueStyle}>{personal.drivingLicence}</div>
              </>
            )}
          </div>
        </div>

        {/* ── SKILLS ── */}
        {skills?.some((g) => g?.skills?.length > 0) && (
          <div style={{ width: "100%" }}>
            <div
              style={{
                ...sectionTitleStyle,
                fontSize: "10pt",
                textAlign: "left",
                borderBottom: `2px solid ${ACCENT}`,
                paddingBottom: "4px",
              }}
            >
              SKILLS
            </div>
            <div style={{ paddingTop: "10px" }}>
              {skills
                .filter((g) => g?.skills?.length > 0)
                .map((group, i) => (
                  <div key={i} style={{ marginBottom: "8px" }}>
                    {skills.filter((g) => g?.skills?.length > 0).length > 1 && (
                      <div
                        style={{
                          fontSize: "8pt",
                          fontWeight: 700,
                          color: ACCENT,
                          marginBottom: "4px",
                          textTransform: "uppercase",
                        }}
                      >
                        {group.category}
                      </div>
                    )}
                    {group.skills?.map((skill, j) => (
                      <div
                        key={j}
                        style={{
                          fontSize: "9pt",
                          color: "#333",
                          lineHeight: "1.6",
                          paddingLeft: "10px",
                          position: "relative",
                        }}
                      >
                        <span style={{ position: "absolute", left: 0 }}>•</span>{" "}
                        {skill}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* ═══════ RIGHT MAIN CONTENT ═══════ */}
      <div
        style={{
          flex: 1,
          padding: "20px 28px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Europass logo top-right */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "4px",
            marginBottom: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: ACCENT,
                borderRadius: "50%",
              }}
            ></div>
            <div style={{ display: "flex", gap: "1px" }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "2px",
                    height: "8px",
                    backgroundColor: ACCENT,
                    opacity: 0.5 + i * 0.04,
                  }}
                ></div>
              ))}
            </div>
          </div>
          <span
            style={{
              fontSize: "14pt",
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: "0.5px",
            }}
          >
            europass
          </span>
        </div>

        {/* ── SUMMARY ── */}
        {summary && (
          <div style={{ marginBottom: "10px" }}>
            <div style={sectionTitleStyle}>SUMMARY</div>
            <p
              style={{
                fontSize: "11pt",
                lineHeight: "1.6",
                color: "#444",
                margin: 0,
              }}
            >
              {summary}
            </p>
          </div>
        )}

        {/* ── EXPERIENCE ── */}
        {workExperience.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <div style={sectionTitleStyle}>EXPERIENCE</div>
            {workExperience.map((job, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "10pt",
                    color: "#888",
                    marginBottom: "2px",
                  }}
                >
                  {fmt(job.startDate)} –{" "}
                  {job.isCurrent ? "Current" : fmt(job.endDate)}
                  {job.location ? `  ${job.location}` : ""}
                </div>
                <div style={{ fontSize: "12pt", marginBottom: "2px" }}>
                  <strong>{job.position}</strong>
                  {job.company ? (
                    <span style={{ fontWeight: 400 }}> | {job.company}</span>
                  ) : (
                    ""
                  )}
                </div>
                {job.description &&
                  job.description
                    .split("\n")
                    .filter(Boolean)
                    .map((line, j) => (
                      <div
                        key={j}
                        style={{
                          fontSize: "11pt",
                          lineHeight: "1.5",
                          color: "#444",
                          paddingLeft: "14px",
                          position: "relative",
                          marginTop: "2px",
                        }}
                      >
                        <span style={{ position: "absolute", left: "2px" }}>
                          •
                        </span>
                        {line.replace(/^[•\-]\s*/, "")}
                      </div>
                    ))}
              </div>
            ))}
          </div>
        )}

        {/* ── EDUCATION ── */}
        {education.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <div style={sectionTitleStyle}>EDUCATION</div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "10pt",
                    color: "#888",
                    marginBottom: "2px",
                  }}
                >
                  {fmt(edu.startDate)} –{" "}
                  {edu.isCurrent ? "Current" : fmt(edu.endDate)}
                  {edu.location ? `  ${edu.location}` : ""}
                </div>
                <div
                  style={{
                    fontSize: "12pt",
                    fontWeight: 700,
                    fontStyle: "italic",
                    marginBottom: "2px",
                  }}
                >
                  {edu.degree}
                  {edu.fieldOfStudy ? `: ${edu.fieldOfStudy}` : ""}
                </div>
                <div style={{ fontSize: "11pt", color: "#555" }}>
                  {edu.institution}
                  {edu.location ? ` (${edu.location})` : ""}
                </div>
                {edu.description && (
                  <div
                    style={{
                      fontSize: "11pt",
                      color: "#666",
                      marginTop: "3px",
                    }}
                  >
                    {edu.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── CERTIFICATIONS ── */}
        {certifications.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <div style={sectionTitleStyle}>CERTIFICATIONS</div>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: "6px", fontSize: "11pt" }}>
                <strong>{cert.name}</strong> — {cert.issuer}
                {cert.issueDate ? ` (${fmt(cert.issueDate)})` : ""}
              </div>
            ))}
          </div>
        )}

        {/* ── LANGUAGES ── */}
        {languages.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <div style={sectionTitleStyle}>LANGUAGES</div>
            {motherTongues.length > 0 && (
              <div style={{ fontSize: "11pt", marginBottom: "6px" }}>
                Mother language(s):{" "}
                <strong>
                  {motherTongues.map((l) => l.language).join(", ")}
                </strong>
              </div>
            )}
            {otherLanguages.length > 0 && (
              <div style={{ fontSize: "11pt" }}>
                Other language(s):{" "}
                {otherLanguages.map((l, i) => (
                  <span key={i}>
                    <strong>{l?.language?.toUpperCase()}</strong>{" "}
                    {toCEFR(l.proficiency)}
                    {i < otherLanguages.length - 1 ? " / " : ""}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

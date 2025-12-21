"use client";

import React, { useState } from "react";
import { Input, TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { PortfolioData, Project, Education } from "@/types";
import { AIImportModal } from "./AIImportModal";

interface PortfolioFormProps {
  initialData?: PortfolioData;
  onSave: (data: PortfolioData) => void;
  onPreview?: (data: PortfolioData) => void;
}

export const PortfolioForm: React.FC<PortfolioFormProps> = ({
  initialData,
  onSave,
  onPreview,
}) => {
  const [formData, setFormData] = useState<PortfolioData>(
    initialData || {
      slug: "",
      templateId: "minimal-pro",
      isPublished: false,
      data: {
        personal: {
          name: "",
          title: "",
          bio: "",
          avatarUrl: "",
          location: "",
        },
        projects: [],
        skills: [],
        education: [],
        contact: {
          email: "",
          phone: "",
          linkedin: "",
          github: "",
          twitter: "",
          website: "",
        },
      },
    }
  );

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAIImport = (importedData: Partial<PortfolioData>) => {
    setFormData((prev) => ({
      ...prev,
      ...importedData,
      data: {
        ...prev.data,
        ...(importedData.data || {}),
        personal: {
          ...prev.data.personal,
          ...(importedData.data?.personal || {}),
        },
        contact: {
          ...prev.data.contact,
          ...(importedData.data?.contact || {}),
        },
        // Replace arrays if they exist in imported data, otherwise keep existing?
        // For a "fresh import" replacing is probably better.
        projects: importedData.data?.projects || prev.data.projects,
        skills: importedData.data?.skills || prev.data.skills,
        education: importedData.data?.education || prev.data.education,
      },
    }));
  };

  const handlePersonalChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        personal: {
          ...formData.data.personal,
          [field]: value,
        },
      },
    });
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        contact: {
          ...formData.data.contact,
          [field]: value,
        },
      },
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      techStack: [],
      liveUrl: "",
      githubUrl: "",
      images: [],
    };
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        projects: [...formData.data.projects, newProject],
      },
    });
  };

  const updateProject = (
    id: string | undefined,
    field: string,
    value: string | string[]
  ) => {
    if (!id) return;
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        projects: formData.data.projects.map((p) =>
          p.id === id ? { ...p, [field]: value } : p
        ),
      },
    });
  };

  const removeProject = (id: string | undefined) => {
    if (!id) return;
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        projects: formData.data.projects.filter((p) => p.id !== id),
      },
    });
  };

  const addSkill = () => {
    if (currentSkill.trim()) {
      setFormData({
        ...formData,
        data: {
          ...formData.data,
          skills: [...formData.data.skills, currentSkill.trim()],
        },
      });
      setCurrentSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        skills: formData.data.skills.filter((_, i) => i !== index),
      },
    });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      year: "",
      description: "",
    };
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        education: [...formData.data.education, newEducation],
      },
    });
  };

  const updateEducation = (
    id: string | undefined,
    field: string,
    value: string
  ) => {
    if (!id) return;
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        education: formData.data.education.map((e) =>
          e.id === id ? { ...e, [field]: value } : e
        ),
      },
    });
  };

  const removeEducation = (id: string | undefined) => {
    if (!id) return;
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        education: formData.data.education.filter((e) => e.id !== id),
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <AIImportModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onImport={handleAIImport}
      />

      {/* AI Banner */}
      <div className="bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                New
              </span>
              <h3 className="text-xl font-bold">Auto-Build with AI</h3>
            </div>
            <p className="text-indigo-100 max-w-lg">
              Upload your existing resume (PDF) and let our AI instantly extract
              your skills, projects, and bio to build your site in seconds.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setIsAIModalOpen(true)}
            className="bg-white text-indigo-600 hover:bg-indigo-50 border-none shadow-md shrink-0 whitespace-nowrap"
            size="lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Import Resume
          </Button>
        </div>
      </div>
      {/* Personal Information */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={formData.data.personal.name}
            onChange={(e) => handlePersonalChange("name", e.target.value)}
            placeholder="John Doe"
            required
          />
          <Input
            label="Title/Role"
            value={formData.data.personal.title}
            onChange={(e) => handlePersonalChange("title", e.target.value)}
            placeholder="Full Stack Developer"
            required
          />
          <Input
            label="Location"
            value={formData.data.personal.location || ""}
            onChange={(e) => handlePersonalChange("location", e.target.value)}
            placeholder="San Francisco, CA"
          />
          <Input
            label="Avatar URL"
            value={formData.data.personal.avatarUrl || ""}
            onChange={(e) => handlePersonalChange("avatarUrl", e.target.value)}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
        <div className="mt-4">
          <TextArea
            label="Bio"
            value={formData.data.personal.bio}
            onChange={(e) => handlePersonalChange("bio", e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
            required
          />
        </div>
      </section>

      {/* Projects */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Projects
          </h3>
          <Button type="button" onClick={addProject} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
        <div className="space-y-6">
          {formData.data.projects.map((project, index) => (
            <div
              key={project.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Project {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeProject(project.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Project Name"
                  value={project.name}
                  onChange={(e) =>
                    updateProject(project.id, "name", e.target.value)
                  }
                  placeholder="My Awesome Project"
                />
                <Input
                  label="Image URL"
                  value={project.imageUrl || ""}
                  onChange={(e) =>
                    updateProject(project.id, "imageUrl", e.target.value)
                  }
                  placeholder="https://example.com/project.jpg"
                />
                <Input
                  label="Live URL"
                  value={project.liveUrl || ""}
                  onChange={(e) =>
                    updateProject(project.id, "liveUrl", e.target.value)
                  }
                  placeholder="https://myproject.com"
                />
                <Input
                  label="GitHub URL"
                  value={project.githubUrl || ""}
                  onChange={(e) =>
                    updateProject(project.id, "githubUrl", e.target.value)
                  }
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div className="mt-4">
                <TextArea
                  label="Description"
                  value={project.description}
                  onChange={(e) =>
                    updateProject(project.id, "description", e.target.value)
                  }
                  placeholder="Describe your project..."
                  rows={3}
                />
              </div>
              <div className="mt-4">
                <Input
                  label="Tech Stack (comma-separated)"
                  value={project.techStack.join(", ")}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "techStack",
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Skills
        </h3>
        <div className="flex gap-2 mb-4">
          <Input
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            placeholder="Add a skill..."
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addSkill())
            }
          />
          <Button type="button" onClick={addSkill}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.data.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Education
          </h3>
          <Button type="button" onClick={addEducation} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>
        <div className="space-y-6">
          {formData.data.education.map((edu, index) => (
            <div
              key={edu.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Education {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, "degree", e.target.value)
                  }
                  placeholder="Bachelor of Science"
                />
                <Input
                  label="Institution"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(edu.id, "institution", e.target.value)
                  }
                  placeholder="University Name"
                />
                <Input
                  label="Year"
                  value={edu.year}
                  onChange={(e) =>
                    updateEducation(edu.id, "year", e.target.value)
                  }
                  placeholder="2020"
                />
              </div>
              <div className="mt-4">
                <TextArea
                  label="Description (Optional)"
                  value={edu.description || ""}
                  onChange={(e) =>
                    updateEducation(edu.id, "description", e.target.value)
                  }
                  placeholder="Additional details..."
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={formData.data.contact.email}
            onChange={(e) => handleContactChange("email", e.target.value)}
            placeholder="john@example.com"
            required
          />
          <Input
            label="Phone"
            value={formData.data.contact.phone || ""}
            onChange={(e) => handleContactChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
          <Input
            label="LinkedIn"
            value={formData.data.contact.linkedin || ""}
            onChange={(e) => handleContactChange("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/username"
          />
          <Input
            label="GitHub"
            value={formData.data.contact.github || ""}
            onChange={(e) => handleContactChange("github", e.target.value)}
            placeholder="https://github.com/username"
          />
          <Input
            label="Twitter"
            value={formData.data.contact.twitter || ""}
            onChange={(e) => handleContactChange("twitter", e.target.value)}
            placeholder="https://twitter.com/username"
          />
          <Input
            label="Website"
            value={formData.data.contact.website || ""}
            onChange={(e) => handleContactChange("website", e.target.value)}
            placeholder="https://mywebsite.com"
          />
        </div>
      </section>

      {/* Submit Buttons */}
      <div className="flex gap-4">
        <Button type="submit" size="lg">
          Save & Publish Portfolio
        </Button>
        {onPreview && (
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={handlePreview}
          >
            Preview
          </Button>
        )}
      </div>
    </form>
  );
};

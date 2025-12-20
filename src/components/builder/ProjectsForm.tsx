"use client";

import { Project } from "@/lib/types/portfolio";
import {
  Plus,
  X,
  FolderGit2,
  ExternalLink,
  Github,
  GripVertical,
  Image as ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const addProject = () => {
    onChange([
      ...data,
      {
        name: "",
        description: "",
        techStack: [],
        liveUrl: "",
        githubUrl: "",
        images: [],
        imageUrl: "", // Supporting single image as well
      },
    ]);
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const newProjects = [...data];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onChange(newProjects);
  };

  const removeProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleTechStackChange = (index: number, value: string) => {
    const techStack = value
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);
    updateProject(index, "techStack", techStack);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence initial={false}>
        {data.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="pt-2 text-slate-300 group-hover:text-slate-400 cursor-grab active:cursor-grabbing">
                <GripVertical className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Project Workspace #{index + 1}
                  </h4>
                  <button
                    onClick={() => removeProject(index)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) =>
                        updateProject(index, "name", e.target.value)
                      }
                      placeholder="e.g. Crypto Dashboard"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                      Cover Image URL
                    </label>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={project.imageUrl || ""}
                          onChange={(e) =>
                            updateProject(index, "imageUrl", e.target.value)
                          }
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      {project.imageUrl && (
                        <div className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0">
                          <img
                            src={project.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                      Project Story
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) =>
                        updateProject(index, "description", e.target.value)
                      }
                      placeholder="What problem did you solve?"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                      Tech Stack (Commas)
                    </label>
                    <input
                      type="text"
                      value={project.techStack.join(", ")}
                      onChange={(e) =>
                        handleTechStackChange(index, e.target.value)
                      }
                      placeholder="React, Framer Motion, Tailwind"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                        <ExternalLink className="w-3 h-3" /> Live Demo
                      </label>
                      <input
                        type="url"
                        value={project.liveUrl || ""}
                        onChange={(e) =>
                          updateProject(index, "liveUrl", e.target.value)
                        }
                        placeholder="https://..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="group">
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
                        <Github className="w-3 h-3" /> GitHub
                      </label>
                      <input
                        type="url"
                        value={project.githubUrl || ""}
                        onChange={(e) =>
                          updateProject(index, "githubUrl", e.target.value)
                        }
                        placeholder="https://github.com/..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={addProject}
        className="w-full p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all flex items-center justify-center gap-3 font-bold"
      >
        <Plus className="w-6 h-6" />
        <span>Launch New Project</span>
      </button>
    </div>
  );
}

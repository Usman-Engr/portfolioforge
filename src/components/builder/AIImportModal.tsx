"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Check,
  Loader2,
  X,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PortfolioData } from "@/types";

interface AIImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: Partial<PortfolioData>) => void;
}

type ImportStep = "upload" | "analyzing" | "confirm";

export const AIImportModal: React.FC<AIImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [step, setStep] = useState<ImportStep>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError("");
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    }
  };

  const simulateAnalysis = async () => {
    setStep("analyzing");
    const steps = [
      { pct: 10, text: "Scanning PDF structure..." },
      { pct: 30, text: "Extracting contact information..." },
      { pct: 50, text: "Identifying technical skills..." },
      { pct: 70, text: "Parsing project history..." },
      { pct: 90, text: "Generating portfolio content..." },
      { pct: 100, text: "Finalizing layout..." },
    ];

    for (const s of steps) {
      setProgress(s.pct);
      setStatusText(s.text);
      await new Promise((r) => setTimeout(r, 800));
    }

    // Mock Result
    const mockedData: Partial<PortfolioData> = {
      data: {
        personal: {
          name: "Alex Developer",
          title: "Senior Full Stack Engineer",
          bio: "Passionate developer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and Cloud Architecture.",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
          location: "San Francisco, CA",
        },
        contact: {
          email: "alex@example.com",
          linkedin: "linkedin.com/in/alexdev",
          github: "github.com/alexdev",
          website: "alex-dev.io",
          phone: "+1 (555) 012-3456",
          twitter: "",
        },
        education: [
          {
            id: "edu-1",
            institution: "Tech University",
            degree: "B.S. Computer Science",
            year: "2018-2022",
            description:
              "Graduated with Honors. specialized in Artificial Intelligence.",
          },
        ],
        skills: [
          "React",
          "TypeScript",
          "Node.js",
          "AWS",
          "Docker",
          "GraphQL",
          "Tailwind CSS",
        ],
        projects: [
          {
            id: "proj-1",
            name: "E-Commerce Platform",
            description:
              "A full-featured e-commerce solution built with Next.js and Stripe. Handles 10k+ monthly users.",
            techStack: ["Next.js", "Stripe", "PostgreSQL"],
            liveUrl: "https://shop-demo.com",
            githubUrl: "https://github.com/alex/shop",
          },
          {
            id: "proj-2",
            name: "Task Management App",
            description:
              "Real-time task collaboration tool using WebSockets. Features drag-and-drop kanban boards.",
            techStack: ["React", "Socket.io", "Redis"],
            liveUrl: "https://task-app.io",
            githubUrl: "https://github.com/alex/tasks",
          },
        ],
      },
    };

    onImport(mockedData);
    setStep("confirm"); // Or just close, but let's show success briefly?
    // For now, let's just close after a brief delay or let the parent handle it.
    // But the prompt implies "continue the modal", so maybe show a success state.

    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 dark:border-gray-700">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                AI Portfolio Builder
              </h2>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                Powered by Gemini 3 Flash
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === "upload" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Upload your Resume
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We'll parse your PDF to automatically build your portfolio
                  sites, projects, and skills.
                </p>
              </div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                                    relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer text-center group
                                    ${
                                      isDragging
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                        : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                    }
                                    ${
                                      file
                                        ? "bg-green-50 dark:bg-green-900/10 border-green-500"
                                        : ""
                                    }
                                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                {file ? (
                  <div className="flex flex-col items-center animate-in fade-in zoom-in duration-200">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mb-3">
                      <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Ready to analyze
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      Click or drag PDF here
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Up to 10MB
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Button
                onClick={simulateAnalysis}
                disabled={!file}
                className="w-full h-12 text-lg shadow-lg shadow-blue-500/20"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Portfolio
              </Button>
            </div>
          )}

          {step === "analyzing" && (
            <div className="text-center py-8 space-y-6">
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 dark:text-gray-700 stroke-current"
                    strokeWidth="8"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-blue-600 dark:text-blue-500 progress-ring__circle stroke-current transition-all duration-300 ease-out"
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * progress) / 100}
                    transform="rotate(-90 50 50)"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {progress}%
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Analyzing Resume
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                  {statusText}
                </p>
              </div>

              <div className="max-w-xs mx-auto text-xs text-gray-400">
                This might take a few seconds...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

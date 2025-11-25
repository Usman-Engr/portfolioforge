'use client';

import { Project } from '@/lib/types/portfolio';
import { Plus, X, FolderGit2, ExternalLink, Github } from 'lucide-react';

interface ProjectsFormProps {
    data: Project[];
    onChange: (data: Project[]) => void;
}

export default function ProjectsForm({ data, onChange }: ProjectsFormProps) {
    const addProject = () => {
        onChange([...data, {
            name: '',
            description: '',
            techStack: [],
            liveUrl: '',
            githubUrl: '',
            images: []
        }]);
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
        const techStack = value.split(',').map(tech => tech.trim()).filter(Boolean);
        updateProject(index, 'techStack', techStack);
    };

    return (
        <div className="space-y-4">
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <FolderGit2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="mb-4">No projects added yet</p>
                    <button
                        onClick={addProject}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Your First Project
                    </button>
                </div>
            ) : (
                <>
                    {data.map((project, index) => (
                        <div
                            key={index}
                            className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Project #{index + 1}
                                </h4>
                                <button
                                    onClick={() => removeProject(index)}
                                    className="px-3 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                                    title="Remove project"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Project Name *
                                </label>
                                <input
                                    type="text"
                                    value={project.name}
                                    onChange={(e) => updateProject(index, 'name', e.target.value)}
                                    placeholder="My Awesome Project"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    value={project.description}
                                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                                    placeholder="Describe your project, its features, and your role..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tech Stack *
                                </label>
                                <input
                                    type="text"
                                    value={project.techStack.join(', ')}
                                    onChange={(e) => handleTechStackChange(index, e.target.value)}
                                    placeholder="React, Next.js, TypeScript, Tailwind CSS"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Separate technologies with commas
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <ExternalLink className="inline w-4 h-4 mr-1" />
                                        Live URL
                                    </label>
                                    <input
                                        type="url"
                                        value={project.liveUrl || ''}
                                        onChange={(e) => updateProject(index, 'liveUrl', e.target.value)}
                                        placeholder="https://myproject.com"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <Github className="inline w-4 h-4 mr-1" />
                                        GitHub URL
                                    </label>
                                    <input
                                        type="url"
                                        value={project.githubUrl || ''}
                                        onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                                        placeholder="https://github.com/username/repo"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {project.techStack.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {project.techStack.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={addProject}
                        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Another Project
                    </button>
                </>
            )}
        </div>
    );
}

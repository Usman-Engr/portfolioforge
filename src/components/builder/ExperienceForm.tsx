'use client';

import { Experience } from '@/lib/types/portfolio';
import { Plus, X, Briefcase } from 'lucide-react';

interface ExperienceFormProps {
    data: Experience[];
    onChange: (data: Experience[]) => void;
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
    const addExperience = () => {
        onChange([...data, { company: '', role: '', duration: '', description: '' }]);
    };

    const updateExperience = (index: number, field: keyof Experience, value: string) => {
        const newExperience = [...data];
        newExperience[index] = { ...newExperience[index], [field]: value };
        onChange(newExperience);
    };

    const removeExperience = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="mb-4">No work experience added yet</p>
                    <button
                        onClick={addExperience}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Your First Experience
                    </button>
                </div>
            ) : (
                <>
                    {data.map((exp, index) => (
                        <div
                            key={index}
                            className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Experience #{index + 1}
                                </h4>
                                <button
                                    onClick={() => removeExperience(index)}
                                    className="px-3 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                                    title="Remove experience"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Company *
                                    </label>
                                    <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                        placeholder="Company name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Role *
                                    </label>
                                    <input
                                        type="text"
                                        value={exp.role}
                                        onChange={(e) => updateExperience(index, 'role', e.target.value)}
                                        placeholder="Your role/position"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Duration *
                                </label>
                                <input
                                    type="text"
                                    value={exp.duration}
                                    onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                                    placeholder="e.g., Jan 2020 - Present"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    value={exp.description}
                                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                    placeholder="Describe your responsibilities and achievements..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addExperience}
                        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Another Experience
                    </button>
                </>
            )}
        </div>
    );
}

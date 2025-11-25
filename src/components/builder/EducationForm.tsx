'use client';

import { Education } from '@/lib/types/portfolio';
import { Plus, X, GraduationCap } from 'lucide-react';

interface EducationFormProps {
    data: Education[];
    onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
    const addEducation = () => {
        onChange([...data, { institution: '', degree: '', year: '', description: '' }]);
    };

    const updateEducation = (index: number, field: keyof Education, value: string) => {
        const newEducation = [...data];
        newEducation[index] = { ...newEducation[index], [field]: value };
        onChange(newEducation);
    };

    const removeEducation = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="mb-4">No education added yet</p>
                    <button
                        onClick={addEducation}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Your First Education
                    </button>
                </div>
            ) : (
                <>
                    {data.map((edu, index) => (
                        <div
                            key={index}
                            className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Education #{index + 1}
                                </h4>
                                <button
                                    onClick={() => removeEducation(index)}
                                    className="px-3 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                                    title="Remove education"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Institution *
                                    </label>
                                    <input
                                        type="text"
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                        placeholder="University or school name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Year *
                                    </label>
                                    <input
                                        type="text"
                                        value={edu.year}
                                        onChange={(e) => updateEducation(index, 'year', e.target.value)}
                                        placeholder="e.g., 2020 or 2018-2022"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Degree *
                                </label>
                                <input
                                    type="text"
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                    placeholder="e.g., BS in Computer Science"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Description (Optional)
                                </label>
                                <textarea
                                    value={edu.description || ''}
                                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                                    placeholder="Additional details, GPA, honors, etc."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addEducation}
                        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Another Education
                    </button>
                </>
            )}
        </div>
    );
}

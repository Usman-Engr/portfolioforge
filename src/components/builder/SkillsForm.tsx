'use client';

import { Skill } from '@/lib/types/portfolio';
import { Plus, X, Star } from 'lucide-react';

interface SkillsFormProps {
    data: Skill[];
    onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
    const addSkill = () => {
        onChange([...data, { name: '', level: 3 }]);
    };

    const updateSkill = (index: number, field: keyof Skill, value: string | number) => {
        const newSkills = [...data];
        newSkills[index] = { ...newSkills[index], [field]: value };
        onChange(newSkills);
    };

    const removeSkill = (index: number) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const renderStars = (level: number, index: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => updateSkill(index, 'level', star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                    >
                        <Star
                            className={`w-5 h-5 ${star <= level
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p className="mb-4">No skills added yet</p>
                    <button
                        onClick={addSkill}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Your First Skill
                    </button>
                </div>
            ) : (
                <>
                    {data.map((skill, index) => (
                        <div
                            key={index}
                            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3"
                        >
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={skill.name}
                                    onChange={(e) => updateSkill(index, 'name', e.target.value)}
                                    placeholder="Skill name (e.g., React, Python)"
                                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                                <button
                                    onClick={() => removeSkill(index)}
                                    className="px-3 py-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                                    title="Remove skill"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Proficiency Level
                                </label>
                                {renderStars(skill.level, index)}
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {skill.level === 1 && 'Beginner'}
                                    {skill.level === 2 && 'Elementary'}
                                    {skill.level === 3 && 'Intermediate'}
                                    {skill.level === 4 && 'Advanced'}
                                    {skill.level === 5 && 'Expert'}
                                </p>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addSkill}
                        className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Another Skill
                    </button>
                </>
            )}
        </div>
    );
}

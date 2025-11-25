'use client';

import { PortfolioData } from '@/lib/types/portfolio';

import Image from 'next/image';

interface MinimalProTemplateProps {
    data: PortfolioData;
}

export default function MinimalProTemplate({ data }: MinimalProTemplateProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Header */}
                <header className="text-center mb-16">
                    {data.personal.avatar && (
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <Image
                                src={data.personal.avatar}
                                alt={data.personal.name}
                                fill
                                className="rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-xl"
                            />
                        </div>
                    )}
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
                        {data.personal.name}
                    </h1>
                    <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4">
                        {data.personal.title}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        📍 {data.personal.location}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {data.personal.bio}
                    </p>
                </header>

                {/* Contact & Social */}
                <section className="mb-16 text-center">
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {data.contact.email && (
                            <a
                                href={`mailto:${data.contact.email}`}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                📧 Email Me
                            </a>
                        )}
                        {data.contact.website && (
                            <a
                                href={data.contact.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                            >
                                🌐 Website
                            </a>
                        )}
                    </div>
                    <div className="flex justify-center gap-4">
                        {data.social.linkedin && (
                            <a href={`https://linkedin.com/in/${data.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                                LinkedIn
                            </a>
                        )}
                        {data.social.github && (
                            <a href={`https://github.com/${data.social.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900">
                                GitHub
                            </a>
                        )}
                        {data.social.twitter && (
                            <a href={`https://twitter.com/${data.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                                Twitter
                            </a>
                        )}
                    </div>
                </section>

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {data.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 shadow-md"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Projects</h2>
                        <div className="space-y-6">
                            {data.projects.map((project, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.techStack.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                Live Demo →
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:underline">
                                                GitHub →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Experience</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="border-l-4 border-blue-600 pl-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">{exp.company} • {exp.duration}</p>
                                    <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Education</h2>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{edu.institution} • {edu.year}</p>
                                    {edu.description && <p className="text-gray-700 dark:text-gray-300 mt-2">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

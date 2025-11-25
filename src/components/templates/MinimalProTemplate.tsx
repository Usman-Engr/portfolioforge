'use client';

import React from 'react';
import { PortfolioData } from '@/types';
import { Mail, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

interface MinimalProTemplateProps {
    data: PortfolioData;
}

export const MinimalProTemplate: React.FC<MinimalProTemplateProps> = ({ data }) => {
    const { personal, projects, skills, education, contact } = data.data;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
                <nav className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">{personal.name}</h1>
                        <div className="flex gap-6">
                            <a href="#about" className="text-sm hover:text-blue-600 transition-colors">About</a>
                            <a href="#projects" className="text-sm hover:text-blue-600 transition-colors">Projects</a>
                            <a href="#skills" className="text-sm hover:text-blue-600 transition-colors">Skills</a>
                            <a href="#contact" className="text-sm hover:text-blue-600 transition-colors">Contact</a>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-6 py-20">
                <div className="flex flex-col items-center text-center">
                    {personal.avatarUrl && (
                        <img
                            src={personal.avatarUrl}
                            alt={personal.name}
                            className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-gray-100"
                        />
                    )}
                    <h2 className="text-5xl font-bold mb-4">{personal.name}</h2>
                    <p className="text-2xl text-gray-600 mb-6">{personal.title}</p>
                    {personal.location && (
                        <p className="text-gray-500 mb-8">{personal.location}</p>
                    )}
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="max-w-4xl mx-auto px-6 py-16">
                <h3 className="text-3xl font-bold mb-6">About Me</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{personal.bio}</p>
            </section>

            {/* Projects Section */}
            <section id="projects" className="max-w-4xl mx-auto px-6 py-16">
                <h3 className="text-3xl font-bold mb-8">Projects</h3>
                <div className="space-y-8">
                    {projects.map((project) => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                            {project.imageUrl && (
                                <img
                                    src={project.imageUrl}
                                    alt={project.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            )}
                            <h4 className="text-2xl font-semibold mb-3">{project.name}</h4>
                            <p className="text-gray-700 mb-4">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Live Demo
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                                    >
                                        <Github className="w-4 h-4" />
                                        Source Code
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="max-w-4xl mx-auto px-6 py-16">
                <h3 className="text-3xl font-bold mb-8">Skills</h3>
                <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </section>

            {/* Education Section */}
            {education.length > 0 && (
                <section className="max-w-4xl mx-auto px-6 py-16">
                    <h3 className="text-3xl font-bold mb-8">Education</h3>
                    <div className="space-y-6">
                        {education.map((edu) => (
                            <div key={edu.id} className="border-l-4 border-blue-600 pl-6">
                                <h4 className="text-xl font-semibold">{edu.degree}</h4>
                                <p className="text-gray-600">{edu.institution}</p>
                                <p className="text-gray-500 text-sm">{edu.year}</p>
                                {edu.description && (
                                    <p className="text-gray-700 mt-2">{edu.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section id="contact" className="max-w-4xl mx-auto px-6 py-16">
                <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
                <div className="flex flex-wrap gap-6">
                    {contact.email && (
                        <a
                            href={`mailto:${contact.email}`}
                            className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            {contact.email}
                        </a>
                    )}
                    {contact.github && (
                        <a
                            href={contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                            GitHub
                        </a>
                    )}
                    {contact.linkedin && (
                        <a
                            href={contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                            LinkedIn
                        </a>
                    )}
                    {contact.twitter && (
                        <a
                            href={contact.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <Twitter className="w-5 h-5" />
                            Twitter
                        </a>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 mt-20">
                <div className="max-w-4xl mx-auto px-6 py-8 text-center text-gray-600 text-sm">
                    <p>© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
                    <p className="mt-2">Built with PortfolioForge</p>
                </div>
            </footer>
        </div>
    );
};

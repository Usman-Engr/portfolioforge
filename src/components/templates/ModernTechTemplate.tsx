'use client';

import { PortfolioData } from '@/lib/types/portfolio';
import { Mail, Phone, Globe, MapPin, Github, Linkedin, Twitter, ExternalLink, Briefcase, GraduationCap, Star } from 'lucide-react';

interface ModernTechTemplateProps {
    data: PortfolioData;
}

export default function ModernTechTemplate({ data }: ModernTechTemplateProps) {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section with Glassmorphism */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]"></div>

                {/* Gradient Orbs */}
                <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-12 border border-white/10 shadow-2xl">
                        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                            {data.personal.name || 'Your Name'}
                        </h1>
                        <p className="text-3xl font-semibold text-cyan-300 mb-6">
                            {data.personal.title || 'Your Title'}
                        </p>
                        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed mb-8">
                            {data.personal.bio || 'Your bio goes here...'}
                        </p>

                        {/* Social Links */}
                        {data.social && Object.keys(data.social).length > 0 && (
                            <div className="flex gap-4 flex-wrap">
                                {data.social.linkedin && (
                                    <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
                                        className="p-3 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                        <Linkedin className="w-6 h-6" />
                                    </a>
                                )}
                                {data.social.github && (
                                    <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                                        className="p-3 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                        <Github className="w-6 h-6" />
                                    </a>
                                )}
                                {data.social.twitter && (
                                    <a href={data.social.twitter} target="_blank" rel="noopener noreferrer"
                                        className="p-3 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                        <Twitter className="w-6 h-6" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            {data.projects && data.projects.length > 0 && (
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                            Featured Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.projects.map((project, index) => (
                                <div key={index} className="group backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all">
                                    <h3 className="text-2xl font-bold mb-3 text-cyan-300">{project.name}</h3>
                                    <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                                    {project.techStack && project.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.techStack.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs font-semibold border border-cyan-500/30">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                                                <ExternalLink className="w-4 h-4" />
                                                View
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-white/10 rounded-lg text-sm font-semibold hover:bg-white/20 transition-all">
                                                <Github className="w-4 h-4" />
                                                Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Skills with Proficiency */}
            {data.skills && data.skills.length > 0 && (
                <section className="py-20 px-6 bg-black/20">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                            Skills & Technologies
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.skills.map((skill, index) => {
                                const skillName = typeof skill === 'string' ? skill : skill.name;
                                const skillLevel = typeof skill === 'string' ? 3 : skill.level || 3;

                                return (
                                    <div key={index} className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-lg font-semibold text-cyan-300">{skillName}</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-4 h-4 ${star <= skillLevel ? 'fill-cyan-400 text-cyan-400' : 'text-gray-600'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all"
                                                style={{ width: `${(skillLevel / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience Timeline */}
            {data.experience && data.experience.length > 0 && (
                <section className="py-20 px-6">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                            Work Experience
                        </h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative pl-8 border-l-2 border-cyan-500/30">
                                    <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full border-4 border-gray-900"></div>
                                    <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10">
                                        <h3 className="text-2xl font-bold text-cyan-300 mb-2">{exp.role}</h3>
                                        <p className="text-xl text-purple-300 mb-2">{exp.company}</p>
                                        <p className="text-sm text-gray-400 mb-4">{exp.duration}</p>
                                        <p className="text-gray-300">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="py-20 px-6 bg-black/20">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                            Education
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.education.map((edu, index) => (
                                <div key={index} className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
                                            <GraduationCap className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-cyan-300 mb-2">{edu.degree}</h3>
                                            <p className="text-purple-300 mb-1">{edu.institution}</p>
                                            <p className="text-sm text-gray-400">{edu.year}</p>
                                            {edu.description && <p className="text-gray-300 mt-3">{edu.description}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact */}
            {data.contact && (
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-12 border border-white/10 text-center">
                            <h2 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                                Get In Touch
                            </h2>
                            <div className="flex flex-wrap justify-center gap-6">
                                {data.contact.email && (
                                    <a href={`mailto:${data.contact.email}`}
                                        className="flex items-center gap-3 px-6 py-3 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                        <Mail className="w-5 h-5" />
                                        <span>{data.contact.email}</span>
                                    </a>
                                )}
                                {data.contact.phone && (
                                    <a href={`tel:${data.contact.phone}`}
                                        className="flex items-center gap-3 px-6 py-3 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                        <Phone className="w-5 h-5" />
                                        <span>{data.contact.phone}</span>
                                    </a>
                                )}
                                {data.contact.website && (
                                    <a href={data.contact.website} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-6 py-3 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                        <Globe className="w-5 h-5" />
                                        <span>Website</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

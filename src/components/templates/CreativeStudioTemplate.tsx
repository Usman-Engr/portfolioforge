'use client';

import { PortfolioData } from '@/lib/types/portfolio';
import { Mail, Phone, Globe, MapPin, Github, Linkedin, Twitter, Instagram, ExternalLink, Briefcase, GraduationCap } from 'lucide-react';

interface CreativeStudioTemplateProps {
    data: PortfolioData;
}

export default function CreativeStudioTemplate({ data }: CreativeStudioTemplateProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 text-white">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <h1 className="text-7xl md:text-9xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-orange-200 animate-fade-in">
                        {data.personal.name || 'Your Name'}
                    </h1>
                    <p className="text-3xl md:text-4xl font-bold text-pink-200 mb-8">
                        {data.personal.title || 'Your Title'}
                    </p>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
                        {data.personal.bio || 'Your bio goes here...'}
                    </p>
                    {data.personal.location && (
                        <div className="flex items-center justify-center gap-2 text-pink-200 mb-8">
                            <MapPin className="w-5 h-5" />
                            <span>{data.personal.location}</span>
                        </div>
                    )}

                    {/* Social Links */}
                    {data.social && Object.keys(data.social).length > 0 && (
                        <div className="flex justify-center gap-4 flex-wrap">
                            {data.social.linkedin && (
                                <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer"
                                    className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all transform hover:scale-110">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            )}
                            {data.social.github && (
                                <a href={data.social.github} target="_blank" rel="noopener noreferrer"
                                    className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all transform hover:scale-110">
                                    <Github className="w-6 h-6" />
                                </a>
                            )}
                            {data.social.twitter && (
                                <a href={data.social.twitter} target="_blank" rel="noopener noreferrer"
                                    className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all transform hover:scale-110">
                                    <Twitter className="w-6 h-6" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Projects Section */}
            {data.projects && data.projects.length > 0 && (
                <section className="py-20 px-6 bg-black/20 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-5xl font-black mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-orange-300">
                            Featured Work
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {data.projects.map((project, index) => (
                                <div key={index} className="group relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-pink-400/50 transition-all transform hover:scale-105">
                                    <h3 className="text-3xl font-bold mb-4 text-pink-200">{project.name}</h3>
                                    <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                                    {project.techStack && project.techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full text-sm font-semibold border border-pink-400/30">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex gap-4">
                                        {project.liveUrl && (
                                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all">
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full font-semibold hover:bg-white/20 transition-all">
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

            {/* Skills Section */}
            {data.skills && data.skills.length > 0 && (
                <section className="py-20 px-6">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-5xl font-black mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-orange-300">
                            Skills & Expertise
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {data.skills.map((skill, index) => (
                                <div key={index} className="px-8 py-4 bg-gradient-to-r from-pink-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl border border-pink-400/30 text-xl font-bold transform hover:scale-110 transition-all">
                                    {typeof skill === 'string' ? skill : skill.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience Section */}
            {data.experience && data.experience.length > 0 && (
                <section className="py-20 px-6 bg-black/20 backdrop-blur-sm">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-5xl font-black mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-orange-300">
                            Experience
                        </h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl">
                                            <Briefcase className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-pink-200 mb-2">{exp.role}</h3>
                                            <p className="text-xl text-gray-300 mb-2">{exp.company}</p>
                                            <p className="text-sm text-gray-400 mb-4">{exp.duration}</p>
                                            <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            {data.contact && (
                <section className="py-20 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-5xl font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-orange-300">
                            Let's Connect
                        </h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            {data.contact.email && (
                                <a href={`mailto:${data.contact.email}`}
                                    className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all transform hover:scale-105">
                                    <Mail className="w-6 h-6" />
                                    <span className="font-semibold">{data.contact.email}</span>
                                </a>
                            )}
                            {data.contact.phone && (
                                <a href={`tel:${data.contact.phone}`}
                                    className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all transform hover:scale-105">
                                    <Phone className="w-6 h-6" />
                                    <span className="font-semibold">{data.contact.phone}</span>
                                </a>
                            )}
                            {data.contact.website && (
                                <a href={data.contact.website} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all transform hover:scale-105">
                                    <Globe className="w-6 h-6" />
                                    <span className="font-semibold">Website</span>
                                </a>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
}

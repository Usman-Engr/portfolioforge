'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '@/types';
import { Mail, Phone, Linkedin, Github, Twitter, Globe, ExternalLink } from 'lucide-react';

interface GradientProTemplateProps {
    data: PortfolioData;
}

export const GradientProTemplate: React.FC<GradientProTemplateProps> = ({ data }) => {
    const { personal, projects, skills, education, contact } = data.data;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#667eea] bg-[length:400%_400%] animate-gradient">
            {/* Floating Background Shapes */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -20, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {personal.avatarUrl && (
                            <motion.img
                                src={personal.avatarUrl}
                                alt={personal.name}
                                className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white/30 shadow-2xl"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                        )}

                        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
                            {personal.name}
                        </h1>

                        <motion.p
                            className="text-2xl md:text-3xl text-white/90 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {personal.title}
                        </motion.p>

                        {personal.location && (
                            <p className="text-lg text-white/70 mb-8">📍 {personal.location}</p>
                        )}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-4 justify-center flex-wrap"
                        >
                            {contact.email && (
                                <a href={`mailto:${contact.email}`} className="glass-button">
                                    <Mail className="w-5 h-5" />
                                </a>
                            )}
                            {contact.linkedin && (
                                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="glass-button">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {contact.github && (
                                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="glass-button">
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 md:p-12"
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
                        <p className="text-lg text-white/90 leading-relaxed">{personal.bio}</p>
                    </motion.div>
                </div>
            </section>

            {/* Projects Section - Bento Grid */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl font-bold text-white text-center mb-16"
                    >
                        Featured Projects
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                                className="glass-card p-6 group cursor-pointer"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {project.imageUrl && (
                                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                                        <img
                                            src={project.imageUrl}
                                            alt={project.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    </div>
                                )}

                                <h3 className="text-2xl font-bold text-white mb-3">{project.name}</h3>
                                <p className="text-white/80 mb-4">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-white/20 text-white text-sm rounded-full backdrop-blur-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span className="text-sm">Live Demo</span>
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span className="text-sm">Code</span>
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl font-bold text-white text-center mb-16"
                    >
                        Skills & Expertise
                    </motion.h2>

                    <div className="glass-card p-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.1 }}
                                    className="px-4 py-3 bg-white/10 text-white text-center rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            {education && education.length > 0 && (
                <section className="relative py-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-5xl font-bold text-white text-center mb-16"
                        >
                            Education
                        </motion.h2>

                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={edu.id}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="glass-card p-6"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                                    <p className="text-xl text-white/80 mb-2">{edu.institution}</p>
                                    <p className="text-white/60 mb-3">{edu.year}</p>
                                    {edu.description && (
                                        <p className="text-white/80">{edu.description}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-12"
                    >
                        <h2 className="text-5xl font-bold text-white mb-6">Get In Touch</h2>
                        <p className="text-xl text-white/80 mb-8">
                            Let's work together on your next project
                        </p>

                        <div className="flex flex-col gap-4 max-w-md mx-auto">
                            {contact.email && (
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="glass-button-large group"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>{contact.email}</span>
                                </a>
                            )}
                            {contact.phone && (
                                <a
                                    href={`tel:${contact.phone}`}
                                    className="glass-button-large group"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>{contact.phone}</span>
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-8 px-4 text-center text-white/60">
                <p>© {new Date().getFullYear()} {personal.name}. Built with PortfolioForge.</p>
            </footer>

            {/* Custom Styles */}
            <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 15s ease infinite;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        
        .glass-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          transition: all 0.3s ease;
        }
        
        .glass-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
        
        .glass-button-large {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .glass-button-large:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
      `}</style>
        </div>
    );
};

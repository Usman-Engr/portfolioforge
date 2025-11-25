'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '@/types';
import { Mail, Phone, Linkedin, Github, ExternalLink, ArrowRight } from 'lucide-react';

interface CreativeStudioTemplateProps {
    data: PortfolioData;
}

export const CreativeStudioTemplate: React.FC<CreativeStudioTemplateProps> = ({ data }) => {
    const { personal, projects, skills, education, contact } = data.data;

    return (
        <div className="min-h-screen bg-[#1a1a2e] text-white">
            {/* Custom Scrollbar */}
            <style jsx global>{`
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a2e;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00ff88, #00d4ff);
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #00d4ff, #00ff88);
        }
        
        .neon-text {
          text-shadow: 0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88;
        }
        
        .neon-border {
          border: 2px solid #00ff88;
          box-shadow: 0 0 10px #00ff88, inset 0 0 10px #00ff88;
        }
        
        .neon-glow {
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
        }
      `}</style>

            {/* Hero Section - Split Screen */}
            <section className="min-h-screen flex items-center relative overflow-hidden">
                {/* Animated Background Grid */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
                    {/* Left Side - Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-block px-4 py-2 border border-[#00ff88] rounded-full mb-6"
                            animate={{
                                boxShadow: ['0 0 10px #00ff88', '0 0 20px #00ff88', '0 0 10px #00ff88'],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-[#00ff88] text-sm font-mono">{personal.location || 'Available for Work'}</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-bold mb-6">
                            <span className="block">{personal.name.split(' ')[0]}</span>
                            <span className="block neon-text">{personal.name.split(' ').slice(1).join(' ')}</span>
                        </h1>

                        <p className="text-2xl md:text-3xl text-[#00d4ff] mb-6 font-semibold">
                            {personal.title}
                        </p>

                        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                            {personal.bio}
                        </p>

                        <div className="flex gap-4">
                            <motion.a
                                href={`#contact`}
                                className="px-8 py-4 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#1a1a2e] font-bold rounded-lg flex items-center gap-2 group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get In Touch
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.a>

                            <motion.a
                                href="#projects"
                                className="px-8 py-4 border-2 border-[#00ff88] text-[#00ff88] font-bold rounded-lg hover:bg-[#00ff88]/10 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Work
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right Side - Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {personal.avatarUrl && (
                            <div className="relative">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] rounded-full blur-3xl opacity-50"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 180, 360],
                                    }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />
                                <img
                                    src={personal.avatarUrl}
                                    alt={personal.name}
                                    className="relative w-full max-w-md mx-auto rounded-2xl border-4 border-[#00ff88] neon-glow"
                                />
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Projects Section - Masonry Grid */}
            <section id="projects" className="py-20 px-4 bg-[#16213e]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-4">
                            Featured <span className="neon-text">Projects</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] mx-auto" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-[#1a1a2e] rounded-xl overflow-hidden border border-gray-800 hover:border-[#00ff88] transition-all duration-300"
                            >
                                {project.imageUrl && (
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={project.imageUrl}
                                            alt={project.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent" />
                                    </div>
                                )}

                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00ff88] transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.techStack.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-[#00ff88]/10 text-[#00ff88] text-sm rounded-full border border-[#00ff88]/30"
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
                                                className="flex items-center gap-2 text-[#00d4ff] hover:text-[#00ff88] transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                <span className="text-sm">Live</span>
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-[#00d4ff] hover:text-[#00ff88] transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                <span className="text-sm">Code</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section - Tag Cloud */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-4">
                            Skills & <span className="neon-text">Technologies</span>
                        </h2>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                className="px-6 py-3 bg-[#16213e] border-2 border-[#00ff88]/30 rounded-lg hover:border-[#00ff88] hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-all cursor-pointer"
                            >
                                <span className="text-lg font-semibold">{skill}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education Timeline */}
            {education && education.length > 0 && (
                <section className="py-20 px-4 bg-[#16213e]">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-6xl font-bold mb-4">
                                Education & <span className="neon-text">Experience</span>
                            </h2>
                        </motion.div>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00ff88] to-[#00d4ff]" />

                            <div className="space-y-12">
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={edu.id}
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2 }}
                                        className="relative pl-20"
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-6 top-0 w-5 h-5 bg-[#00ff88] rounded-full border-4 border-[#1a1a2e] neon-glow" />

                                        <div className="bg-[#1a1a2e] p-6 rounded-xl border border-gray-800 hover:border-[#00ff88] transition-colors">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-3 py-1 bg-[#00ff88]/10 text-[#00ff88] text-sm rounded-full border border-[#00ff88]/30">
                                                    {edu.year}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2">{edu.degree}</h3>
                                            <p className="text-xl text-[#00d4ff] mb-2">{edu.institution}</p>
                                            {edu.description && (
                                                <p className="text-gray-400">{edu.description}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section id="contact" className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            Let's <span className="neon-text">Connect</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-12">
                            Have a project in mind? Let's make it happen.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
                            {contact.email && (
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="p-6 bg-[#16213e] rounded-xl border-2 border-[#00ff88]/30 hover:border-[#00ff88] hover:neon-glow transition-all group"
                                >
                                    <Mail className="w-8 h-8 text-[#00ff88] mx-auto mb-3" />
                                    <p className="text-gray-400 text-sm mb-1">Email</p>
                                    <p className="text-white group-hover:text-[#00ff88] transition-colors">{contact.email}</p>
                                </a>
                            )}
                            {contact.phone && (
                                <a
                                    href={`tel:${contact.phone}`}
                                    className="p-6 bg-[#16213e] rounded-xl border-2 border-[#00d4ff]/30 hover:border-[#00d4ff] hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all group"
                                >
                                    <Phone className="w-8 h-8 text-[#00d4ff] mx-auto mb-3" />
                                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                                    <p className="text-white group-hover:text-[#00d4ff] transition-colors">{contact.phone}</p>
                                </a>
                            )}
                        </div>

                        <div className="flex justify-center gap-6">
                            {contact.linkedin && (
                                <motion.a
                                    href={contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 flex items-center justify-center bg-[#16213e] rounded-full border-2 border-[#00ff88]/30 hover:border-[#00ff88] hover:neon-glow transition-all"
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Linkedin className="w-6 h-6 text-[#00ff88]" />
                                </motion.a>
                            )}
                            {contact.github && (
                                <motion.a
                                    href={contact.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 flex items-center justify-center bg-[#16213e] rounded-full border-2 border-[#00d4ff]/30 hover:border-[#00d4ff] hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all"
                                    whileHover={{ scale: 1.2, rotate: -360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Github className="w-6 h-6 text-[#00d4ff]" />
                                </motion.a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 text-center border-t border-gray-800">
                <p className="text-gray-500">
                    © {new Date().getFullYear()} {personal.name}. Crafted with <span className="text-[#00ff88]">PortfolioForge</span>
                </p>
            </footer>
        </div>
    );
};

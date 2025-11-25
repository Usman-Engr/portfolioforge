'use client';

import { useState } from 'react';
import { Github, Download, Loader2, CheckCircle, AlertCircle, FileCode } from 'lucide-react';
import { generateStaticExport } from '@/lib/export/static-generator';

interface IntegrationSettingsProps {
    portfolioId: string;
    onImportProjects?: (projects: any[]) => void;
}

export default function IntegrationSettings({ portfolioId, onImportProjects }: IntegrationSettingsProps) {
    const [githubUsername, setGithubUsername] = useState('');
    const [isImporting, setIsImporting] = useState(false);
    const [isExportingHtml, setIsExportingHtml] = useState(false);
    const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [importedCount, setImportedCount] = useState(0);

    const handleGitHubImport = async () => {
        if (!githubUsername.trim()) {
            alert('Please enter a GitHub username');
            return;
        }

        setIsImporting(true);
        setImportStatus('idle');

        try {
            const response = await fetch('/api/integrations/github', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: githubUsername }),
            });

            if (!response.ok) {
                throw new Error('Failed to import projects');
            }

            const { projects } = await response.json();
            setImportedCount(projects.length);
            setImportStatus('success');

            if (onImportProjects) {
                onImportProjects(projects);
            }
        } catch (error) {
            console.error('Import error:', error);
            setImportStatus('error');
        } finally {
            setIsImporting(false);
        }
    };

    const handleStaticExport = async () => {
        setIsExportingHtml(true);
        try {
            // Fetch full portfolio data
            const response = await fetch(`/api/portfolios/${portfolioId}`);
            if (!response.ok) throw new Error('Failed to fetch portfolio data');
            const portfolio = await response.json();

            await generateStaticExport(portfolio);
        } catch (error) {
            console.error('Export error:', error);
            alert('Failed to generate static export');
        } finally {
            setIsExportingHtml(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* GitHub Integration */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                        <Github className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">GitHub Projects Import</h3>
                        <p className="text-sm text-gray-500">Automatically import your GitHub repositories as projects</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            GitHub Username
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={githubUsername}
                                onChange={(e) => setGithubUsername(e.target.value)}
                                placeholder="your-github-username"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={isImporting}
                            />
                            <button
                                onClick={handleGitHubImport}
                                disabled={isImporting || !githubUsername.trim()}
                                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isImporting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Importing...
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4" />
                                        Import
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {importStatus === 'success' && (
                        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <p className="text-sm text-green-800">
                                Successfully imported {importedCount} projects from GitHub!
                            </p>
                        </div>
                    )}

                    {importStatus === 'error' && (
                        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <p className="text-sm text-red-800">
                                Failed to import projects. Please check the username and try again.
                            </p>
                        </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">How it works:</h4>
                        <ul className="space-y-1 text-sm text-blue-800">
                            <li>• We'll fetch your public repositories from GitHub</li>
                            <li>• Repositories are sorted by stars and recent activity</li>
                            <li>• Up to 10 top projects will be imported</li>
                            <li>• You can edit or remove imported projects later</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Export Options */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>

                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                <Download className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Resume/CV (PDF)</p>
                                <p className="text-sm text-gray-500">Download your portfolio as a professional resume</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                            Download PDF
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                <FileCode className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Static HTML</p>
                                <p className="text-sm text-gray-500">Export as standalone HTML files</p>
                            </div>
                        </div>
                        <button
                            onClick={handleStaticExport}
                            disabled={isExportingHtml}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
                        >
                            {isExportingHtml ? (
                                <>
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    Exporting...
                                </>
                            ) : (
                                'Download ZIP'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h4 className="text-sm font-semibold text-purple-900 mb-2">💡 Integration Tips</h4>
                <ul className="space-y-2 text-sm text-purple-800">
                    <li>• Make sure your GitHub repositories have good descriptions</li>
                    <li>• Add topics/tags to your repos for better categorization</li>
                    <li>• Star your best projects to prioritize them in import</li>
                    <li>• The PDF export uses your current portfolio data</li>
                </ul>
            </div>
        </div>
    );
}

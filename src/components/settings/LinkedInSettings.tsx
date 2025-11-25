import { useState } from 'react';
import { Linkedin, Loader2, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { generateStaticExport } from '@/lib/export/static-generator'; // reuse for static export if needed

interface LinkedInSettingsProps {
    portfolioId: string;
    onImportProfile?: (profile: any) => void;
}

export default function LinkedInSettings({ portfolioId, onImportProfile }: LinkedInSettingsProps) {
    const [accessToken, setAccessToken] = useState('');
    const [isImporting, setIsImporting] = useState(false);
    const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [profileData, setProfileData] = useState<any>(null);

    const handleLinkedInImport = async () => {
        if (!accessToken.trim()) {
            alert('Please enter a LinkedIn access token');
            return;
        }
        setIsImporting(true);
        setImportStatus('idle');
        try {
            const response = await fetch('/api/integrations/linkedin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken: accessToken.trim() }),
            });
            if (!response.ok) throw new Error('Import failed');
            const profile = await response.json();
            setProfileData(profile);
            setImportStatus('success');
            if (onImportProfile) onImportProfile(profile);
        } catch (e) {
            console.error(e);
            setImportStatus('error');
        } finally {
            setIsImporting(false);
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">LinkedIn Profile Import</h3>
                    <p className="text-sm text-gray-500">Paste a LinkedIn access token to import your profile data.</p>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="LinkedIn access token"
                        value={accessToken}
                        onChange={e => setAccessToken(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isImporting}
                    />
                    <button
                        onClick={handleLinkedInImport}
                        disabled={isImporting || !accessToken.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
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
                {importStatus === 'success' && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-sm text-green-800">Successfully imported LinkedIn profile.</p>
                    </div>
                )}
                {importStatus === 'error' && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-sm text-red-800">Failed to import. Verify token.</p>
                    </div>
                )}
                {profileData && (
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto max-h-48">
                        {JSON.stringify(profileData, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    );
}

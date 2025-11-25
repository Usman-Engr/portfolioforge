'use client';

import { useState } from 'react';
import { Code, Eye, EyeOff, RotateCcw } from 'lucide-react';

interface CustomCSSSettingsProps {
    settings: {
        customCSS: string;
    };
    onChange: (settings: { customCSS: string }) => void;
}

export default function CustomCSSSettings({ settings, onChange }: CustomCSSSettingsProps) {
    const [showPreview, setShowPreview] = useState(false);

    const handleReset = () => {
        if (confirm('Are you sure you want to reset custom CSS?')) {
            onChange({ customCSS: '' });
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Custom CSS</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Add custom styles to personalize your portfolio
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            {showPreview ? (
                                <>
                                    <EyeOff className="w-4 h-4" />
                                    Hide Preview
                                </>
                            ) : (
                                <>
                                    <Eye className="w-4 h-4" />
                                    Show Preview
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleReset}
                            disabled={!settings.customCSS}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            CSS Code
                        </label>
                        <textarea
                            value={settings.customCSS}
                            onChange={(e) => onChange({ customCSS: e.target.value })}
                            placeholder="/* Enter your custom CSS here */&#10;.portfolio-header {&#10;  background: linear-gradient(to right, #667eea, #764ba2);&#10;}"
                            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                            spellCheck={false}
                        />
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips</h4>
                        <ul className="space-y-1 text-sm text-blue-800">
                            <li>• Your CSS will be scoped to your portfolio only</li>
                            <li>• Use browser DevTools to inspect element class names</li>
                            <li>• Changes apply immediately after saving</li>
                            <li>• Avoid using !important unless necessary</li>
                        </ul>
                    </div>

                    {/* Warning Box */}
                    {settings.customCSS && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-yellow-900 mb-2">⚠️ Warning</h4>
                            <p className="text-sm text-yellow-800">
                                Custom CSS can override default styles. Test thoroughly before publishing.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Live Preview */}
            {showPreview && settings.customCSS && (
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <style dangerouslySetInnerHTML={{ __html: settings.customCSS }} />
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold">Sample Heading</h1>
                            <p className="text-gray-600">
                                This is a sample paragraph to preview your custom styles.
                            </p>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                Sample Button
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

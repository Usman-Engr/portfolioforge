'use client';

import { MessageSquare, Award, Video } from 'lucide-react';

interface ContentSettingsProps {
    settings: {
        showTestimonials: boolean;
        showCertifications: boolean;
        videoIntro: string;
    };
    onChange: (settings: any) => void;
}

export default function ContentSettings({ settings, onChange }: ContentSettingsProps) {
    return (
        <div className="space-y-6">
            {/* Testimonials */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-gray-700" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Testimonials Section</p>
                            <p className="text-xs text-gray-500">Display client testimonials on your portfolio</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onChange({ ...settings, showTestimonials: !settings.showTestimonials })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.showTestimonials ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.showTestimonials ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
                {settings.showTestimonials && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-900">
                            ✓ Testimonials section will be displayed on your portfolio. You can add testimonials in the builder.
                        </p>
                    </div>
                )}
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-gray-700" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Certifications & Awards</p>
                            <p className="text-xs text-gray-500">Showcase your achievements and certifications</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onChange({ ...settings, showCertifications: !settings.showCertifications })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.showCertifications ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.showCertifications ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
                {settings.showCertifications && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-900">
                            ✓ Certifications section will be displayed. Add your certifications in the builder.
                        </p>
                    </div>
                )}
            </div>

            {/* Video Introduction */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Video className="w-4 h-4" />
                    Video Introduction
                </label>
                <input
                    type="url"
                    value={settings.videoIntro}
                    onChange={(e) => onChange({ ...settings, videoIntro: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-2">
                    Add a YouTube or Vimeo video URL to introduce yourself
                </p>
                {settings.videoIntro && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                            <Video className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Video will be embedded on your portfolio homepage
                        </p>
                    </div>
                )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Pro Tips</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Testimonials add credibility and social proof to your portfolio</li>
                    <li>• Certifications demonstrate your expertise and commitment to learning</li>
                    <li>• A video introduction helps visitors connect with you personally</li>
                    <li>• Keep your video under 2 minutes for best engagement</li>
                </ul>
            </div>
        </div>
    );
}

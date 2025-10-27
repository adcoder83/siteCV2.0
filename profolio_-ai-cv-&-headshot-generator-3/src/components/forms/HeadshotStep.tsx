

import React, { useState, useRef } from 'react';
import type { CVData } from '../../types';
import { SparklesIcon, UserCircleIcon } from '../ui/Icons';
import { generateHeadshot } from '../../services/geminiService';

interface Props {
    cvData: CVData;
    setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const HEADSHOT_STYLES = ['Corporate Executive', 'Startup Casual', 'Creative Professional', 'Friendly & Approachable'];

const HeadshotStep: React.FC<Props> = ({ cvData, setCvData }) => {
    const [inspirationPhoto, setInspirationPhoto] = useState<File | null>(null);
    const [inspirationPhotoPreview, setInspirationPhotoPreview] = useState<string | null>(null);
    const [generatedHeadshot, setGeneratedHeadshot] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState(HEADSHOT_STYLES[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setInspirationPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setInspirationPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setGeneratedHeadshot(null); // Clear previous generation
        }
    };

    const handleGenerate = async () => {
        if (!inspirationPhoto) return;
        setIsLoading(true);
        setError(null);
        setGeneratedHeadshot(null);
        try {
            const base64Image = await generateHeadshot(inspirationPhoto, selectedStyle);
            setGeneratedHeadshot(`data:image/png;base64,${base64Image}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUseHeadshot = () => {
        if (generatedHeadshot) {
            setCvData(prev => ({ ...prev, headshot: generatedHeadshot }));
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">AI Headshot Generator</h2>
            <p className="text-sm text-gray-600">Upload a clear photo of yourself, and our AI will generate a professional headshot. For best results, use a well-lit, forward-facing photo.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">1. Upload Inspiration Photo</label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-500 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                        >
                            {inspirationPhotoPreview ? (
                                <img src={inspirationPhotoPreview} alt="Inspiration" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <span>Click to upload a photo</span>
                            )}
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg" className="hidden" />
                    </div>
                    <div>
                        <label htmlFor="style-select" className="block text-sm font-medium text-gray-700 mb-1">2. Choose a Style</label>
                        <select
                            id="style-select"
                            value={selectedStyle}
                            onChange={(e) => setSelectedStyle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            {HEADSHOT_STYLES.map(style => <option key={style} value={style}>{style}</option>)}
                        </select>
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={!inspirationPhoto || isLoading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                        <SparklesIcon />
                        {isLoading ? 'Generating...' : '3. Generate Headshot'}
                    </button>
                </div>
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Generated Headshot</label>
                    <div className="w-full aspect-square bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                        {isLoading && <div className="animate-pulse text-gray-500">Generating your headshot...</div>}
                        {error && <div className="text-red-500 text-sm p-4 text-center">{error}</div>}
                        {generatedHeadshot && (
                            <img src={generatedHeadshot} alt="Generated Headshot" className="w-full h-full object-cover rounded-lg" />
                        )}
                        {!isLoading && !error && !generatedHeadshot && (
                            <div className="text-gray-400 text-center p-4">Your result will appear here.</div>
                        )}
                    </div>
                    <button
                        onClick={handleUseHeadshot}
                        disabled={!generatedHeadshot}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                        Use This Headshot
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeadshotStep;
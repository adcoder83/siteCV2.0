

import React, { useState } from 'react';
import type { CVData } from '../../types';
import { Textarea } from '../ui/FormControls';
import { SparklesIcon } from '../ui/Icons';
import { generateSummaryAndScore } from '../../services/geminiService';

interface Props {
    cvData: CVData;
    setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const AnalysisStep: React.FC<Props> = ({ cvData, setCvData }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<{ score: number; keywords: string[] } | null>(null);

    const handleAnalyze = async () => {
        if (!jobDescription) return;
        setIsLoading(true);
        setAnalysisResult(null);
        try {
            const result = await generateSummaryAndScore(cvData, jobDescription);
            setAnalysisResult({ score: result.score, keywords: result.keywords });
            setCvData(prev => ({ ...prev, summary: result.summary }));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Job Description Alignment</h2>
            <p className="text-sm text-gray-600">Paste a job description below to get an ATS compatibility score, keyword suggestions, and an AI-generated professional summary tailored to the role.</p>

            <div>
                <Textarea
                    label="Job Description"
                    id="jobDescription"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here..."
                />
            </div>
            
            <button
                onClick={handleAnalyze}
                disabled={isLoading || !jobDescription}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors font-semibold"
            >
                <SparklesIcon />
                {isLoading ? 'Analyzing...' : 'Analyze & Generate Summary'}
            </button>
            
            {analysisResult && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4 animate-fade-in">
                    <div>
                        <h3 className="font-semibold text-gray-800">ATS Compatibility Score</h3>
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                            <div
                                className="bg-green-500 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-500"
                                style={{ width: `${analysisResult.score}%` }}
                            >
                                {analysisResult.score}%
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">Suggested Keywords</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {analysisResult.keywords.map((kw, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{kw}</span>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="font-semibold text-gray-800">Generated Summary</h3>
                        <p className="text-sm text-gray-700 mt-1 italic p-2 bg-blue-50 rounded-md border-l-4 border-blue-500">{cvData.summary}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalysisStep;
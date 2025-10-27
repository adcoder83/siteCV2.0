import React, { useState } from 'react';
import type { CVData, Experience } from '../../types';
import { Input, Textarea } from '../ui/FormControls';
import { SparklesIcon, TrashIcon, PlusIcon } from '../ui/Icons';
import { generateBulletPoints } from '../../services/geminiService';

interface Props {
    cvData: CVData;
    setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const ExperienceForm: React.FC<Props> = ({ cvData, setCvData }) => {
    const [loadingAI, setLoadingAI] = useState<string | null>(null);

    const handleExperienceChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCvData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => exp.id === id ? { ...exp, [name]: value } : exp)
        }));
    };

    const addExperience = () => {
        const newExp: Experience = {
            id: crypto.randomUUID(),
            jobTitle: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            description: '',
        };
        setCvData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
    };

    const removeExperience = (id: string) => {
        setCvData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
    };

    const handleGenerateBullets = async (id: string) => {
        const currentExp = cvData.experience.find(exp => exp.id === id);
        if (!currentExp) return;

        setLoadingAI(id);
        const bullets = await generateBulletPoints(currentExp);
        setCvData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => exp.id === id ? { ...exp, description: bullets } : exp)
        }));
        setLoadingAI(null);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
            <p className="text-sm text-gray-600">Detail your professional history. Use our AI to generate impactful, metric-driven bullet points.</p>
            
            {cvData.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 border border-gray-200 rounded-lg space-y-4 relative">
                    <h3 className="font-semibold text-gray-700">Position #{index + 1}</h3>
                    <Input label="Job Title" id={`jobTitle-${exp.id}`} name="jobTitle" value={exp.jobTitle} onChange={(e) => handleExperienceChange(exp.id, e)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Company" id={`company-${exp.id}`} name="company" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, e)} />
                        <Input label="Location (e.g. City, Country)" id={`location-${exp.id}`} name="location" value={exp.location} onChange={(e) => handleExperienceChange(exp.id, e)} />
                        <Input label="Start Date" id={`startDate-${exp.id}`} name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, e)} />
                        <Input label="End Date" id={`endDate-${exp.id}`} name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, e)} />
                    </div>
                    <div>
                        <Textarea label="Description / Accomplishments" id={`description-${exp.id}`} name="description" value={exp.description} onChange={(e) => handleExperienceChange(exp.id, e)} />
                        <button
                            onClick={() => handleGenerateBullets(exp.id)}
                            disabled={loadingAI === exp.id}
                            className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-semibold disabled:opacity-50"
                        >
                            <SparklesIcon />
                            {loadingAI === exp.id ? 'Generating...' : 'Generate with AI'}
                        </button>
                    </div>

                    {cvData.experience.length > 1 && (
                         <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                             <TrashIcon />
                         </button>
                    )}
                </div>
            ))}

            <button onClick={addExperience} className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 hover:border-gray-400 transition-colors">
                <PlusIcon />
                Add Experience
            </button>
        </div>
    );
};

export default ExperienceForm;
import React, { useState } from 'react';
import type { CVData } from '../../types';
import { Input } from '../ui/FormControls';
import { XIcon } from '../ui/Icons';

interface Props {
    cvData: CVData;
    setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

type SkillType = 'technical' | 'soft';

const SkillInput: React.FC<{
    label: string;
    skills: string[];
    onSkillsChange: (newSkills: string[]) => void;
}> = ({ label, skills, onSkillsChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            if (!skills.includes(inputValue.trim())) {
                onSkillsChange([...skills, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        onSkillsChange(skills.filter(skill => skill !== skillToRemove));
    };

    return (
        <div>
            <Input 
                label={label}
                id={label}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a skill and press Enter"
            />
            <div className="flex flex-wrap gap-2 mt-2">
                {skills.map(skill => (
                    <span key={skill} className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="text-blue-600 hover:text-blue-800">
                            <XIcon />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

const SkillsForm: React.FC<Props> = ({ cvData, setCvData }) => {
    
    const handleSkillsChange = (skillType: SkillType, newSkills: string[]) => {
        setCvData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [skillType]: newSkills
            }
        }));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
            <p className="text-sm text-gray-600">List your key technical and soft skills. This section is crucial for ATS optimization.</p>
            
            <div className="space-y-6">
                <SkillInput 
                    label="Technical Skills"
                    skills={cvData.skills.technical}
                    onSkillsChange={(newSkills) => handleSkillsChange('technical', newSkills)}
                />
                 <SkillInput 
                    label="Soft Skills"
                    skills={cvData.skills.soft}
                    onSkillsChange={(newSkills) => handleSkillsChange('soft', newSkills)}
                />
            </div>
        </div>
    );
};

export default SkillsForm;
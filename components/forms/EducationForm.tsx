import React from 'react';
import type { CVData, Education } from '../../types';
import { Input } from '../ui/FormControls';
import { TrashIcon, PlusIcon } from '../ui/Icons';

interface Props {
    cvData: CVData;
    setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const EducationForm: React.FC<Props> = ({ cvData, setCvData }) => {

    const handleEducationChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCvData(prev => ({
            ...prev,
            education: prev.education.map(edu => edu.id === id ? { ...edu, [name]: value } : edu)
        }));
    };

    const addEducation = () => {
        const newEdu: Education = {
            id: crypto.randomUUID(),
            degree: '',
            institution: '',
            location: '',
            gradDate: '',
        };
        setCvData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
    };

    const removeEducation = (id: string) => {
        setCvData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Education</h2>
            <p className="text-sm text-gray-600">List your degrees, certifications, and other relevant qualifications.</p>
            
            {cvData.education.map((edu, index) => (
                <div key={edu.id} className="p-4 border border-gray-200 rounded-lg space-y-4 relative">
                    <h3 className="font-semibold text-gray-700">Qualification #{index + 1}</h3>
                    <Input label="Degree / Certification" id={`degree-${edu.id}`} name="degree" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, e)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Institution" id={`institution-${edu.id}`} name="institution" value={edu.institution} onChange={(e) => handleEducationChange(edu.id, e)} />
                        <Input label="Location (e.g. City, Country)" id={`location-${edu.id}`} name="location" value={edu.location} onChange={(e) => handleEducationChange(edu.id, e)} />
                    </div>
                    <Input label="Graduation Date" id={`gradDate-${edu.id}`} name="gradDate" value={edu.gradDate} onChange={(e) => handleEducationChange(edu.id, e)} />
                    
                    {cvData.education.length > 1 && (
                        <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                            <TrashIcon />
                        </button>
                    )}
                </div>
            ))}

            <button onClick={addEducation} className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 hover:border-gray-400 transition-colors">
                <PlusIcon />
                Add Education
            </button>
        </div>
    );
};

export default EducationForm;

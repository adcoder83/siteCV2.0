import React, { useState } from 'react';
import type { CVData } from '../types';
import ContactForm from './forms/ContactForm';
import ExperienceForm from './forms/ExperienceForm';
import SkillsForm from './forms/SkillsForm';
import EducationForm from './forms/EducationForm';
import AnalysisStep from './forms/AnalysisStep';
import HeadshotStep from './forms/HeadshotStep';

interface WizardProps {
    cvData: CVData;
    setCvData: React.Dispatch<React.SetStateAction<CVData>>;
    setShowPreviewOnMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

const STEPS = [
    { name: 'Contact', component: ContactForm },
    { name: 'Experience', component: ExperienceForm },
    { name: 'Skills', component: SkillsForm },
    { name: 'Education', component: EducationForm },
    { name: 'JD Analysis', component: AnalysisStep },
    { name: 'Headshot', component: HeadshotStep },
];

const Wizard: React.FC<WizardProps> = ({ cvData, setCvData, setShowPreviewOnMobile }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const CurrentComponent = STEPS[currentStep].component;
    const isLastStep = currentStep === STEPS.length - 1;

    const handleNext = () => {
        if (!isLastStep) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Step {currentStep + 1} of {STEPS.length}</span>
                    <span className="text-sm font-semibold text-gray-800">{STEPS[currentStep].name}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <CurrentComponent cvData={cvData} setCvData={setCvData} />
            </div>
            
            <div className="mt-6 flex justify-between">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                    Previous
                </button>
                
                {/* Desktop "Next" button */}
                <button
                    onClick={handleNext}
                    disabled={isLastStep}
                    className="hidden lg:block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                    Next
                </button>
                
                {/* Mobile "Next" / "Preview" button */}
                <button
                    onClick={() => {
                        if (isLastStep) {
                            setShowPreviewOnMobile(true);
                        } else {
                            handleNext();
                        }
                    }}
                    className="lg:hidden px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                    {isLastStep ? 'Preview CV' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Wizard;
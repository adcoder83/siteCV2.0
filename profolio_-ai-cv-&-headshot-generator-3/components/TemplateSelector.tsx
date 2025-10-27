
import React from 'react';
import type { Template } from '../types';

interface TemplateSelectorProps {
    selectedTemplate: Template;
    setSelectedTemplate: (template: Template) => void;
}

const templates: { id: Template; name: string }[] = [
    { id: 'modern', name: 'Modern' },
    { id: 'traditional', name: 'Traditional' },
    { id: 'creative', name: 'Creative' },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, setSelectedTemplate }) => {
    return (
        <div className="flex items-center bg-gray-700 rounded-lg p-1">
            {templates.map(template => (
                <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                        selectedTemplate === template.id
                            ? 'bg-white text-gray-900 shadow'
                            : 'text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    {template.name}
                </button>
            ))}
        </div>
    );
};

export default TemplateSelector;

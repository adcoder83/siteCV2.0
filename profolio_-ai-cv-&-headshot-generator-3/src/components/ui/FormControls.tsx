import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input id={id} {...props} className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400" />
    </div>
);

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea id={id} {...props} rows={5} className="w-full px-3 py-2 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400" />
    </div>
);
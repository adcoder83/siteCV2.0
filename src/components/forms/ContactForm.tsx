

import React from 'react';
import type { CVData } from '../../types';
import { Input } from '../ui/FormControls';

interface Props {
    cvData: CVData;
    setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const ContactForm: React.FC<Props> = ({ cvData, setCvData }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCvData(prev => ({
            ...prev,
            contact: { ...prev.contact, [name]: value }
        }));
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
            <p className="text-sm text-gray-600">Let's start with the basics. This information will appear at the top of your CV.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" id="name" name="name" value={cvData.contact.name} onChange={handleChange} />
                <Input label="Professional Title" id="title" name="title" value={cvData.contact.title} onChange={handleChange} />
                <Input label="Phone Number" id="phone" name="phone" type="tel" value={cvData.contact.phone} onChange={handleChange} />
                <Input label="Email Address" id="email" name="email" type="email" value={cvData.contact.email} onChange={handleChange} />
                <Input label="LinkedIn Profile URL" id="linkedin" name="linkedin" value={cvData.contact.linkedin} onChange={handleChange} />
                <Input label="Location (e.g., City, State)" id="location" name="location" value={cvData.contact.location} onChange={handleChange} />
            </div>
        </div>
    );
};

export default ContactForm;
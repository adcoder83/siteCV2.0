import React from 'react';
import type { CVData } from '../types';
import {
    PhoneIcon,
    MailIcon,
    LinkedinIcon,
    LocationIcon,
    UserCircleIcon,
} from './ui/Icons';

interface CVPreviewProps {
    cvData: CVData;
}

const SidebarSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <section className={`mt-8 ${className}`}>
        <h3 className="text-sm font-bold uppercase text-sky-300 tracking-wider mb-3">{title}</h3>
        {children}
    </section>
);


const MainSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <section className={`mb-8 ${className}`}>
        <h3 className="text-sm font-bold uppercase text-sky-900 border-b-2 border-gray-200 pb-1 mb-4 tracking-wider">{title}</h3>
        {children}
    </section>
);

const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
    const { contact, summary, skills, experience, education, headshot } = cvData;

    return (
        <div id="cv-preview" className="w-full h-full bg-white text-gray-800 text-xs font-sans flex overflow-hidden">
            {/* Sidebar (25%) */}
            <aside className="w-1/4 p-8 bg-sky-900 text-white flex flex-col">
                <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-28 h-28 rounded-full bg-sky-800 flex-shrink-0 overflow-hidden mb-3">
                        {headshot ? (
                            <img src={headshot} alt={contact.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="p-4 text-sky-500"><UserCircleIcon /></div>
                        )}
                    </div>
                </div>
                
                <SidebarSection title="Contact">
                    <div className="space-y-4 text-[10px] text-gray-200 font-medium">
                        {contact.phone && <p className="flex items-center gap-3"><PhoneIcon /> <span>{contact.phone}</span></p>}
                        {contact.email && <p className="flex items-center gap-3"><MailIcon /> <span>{contact.email}</span></p>}
                        {contact.linkedin && <p className="flex items-center gap-3 break-words"><LinkedinIcon /> <span>{contact.linkedin}</span></p>}
                        {contact.location && <p className="flex items-center gap-3"><LocationIcon /> <span>{contact.location}</span></p>}
                    </div>
                </SidebarSection>

                {skills && (skills.technical.length > 0 || skills.soft.length > 0) && (
                    <SidebarSection title="Skills">
                        {skills.technical.length > 0 && (
                            <div className="mt-2">
                                <h4 className="font-bold text-xs mb-2 text-gray-100">Technical</h4>
                                <ul className="space-y-1 text-[11px]">
                                    {skills.technical.map(skill => <li key={skill} className="text-gray-200 font-medium">{skill}</li>)}
                                </ul>
                            </div>
                        )}
                        {skills.soft.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-bold text-xs mb-2 text-gray-100">Soft</h4>
                                <ul className="space-y-1 text-[11px]">
                                    {skills.soft.map(skill => <li key={skill} className="text-gray-200 font-medium">{skill}</li>)}
                                </ul>
                            </div>
                        )}
                    </SidebarSection>
                )}
            </aside>
            
            {/* Main content (75%) */}
            <main className="w-3/4 p-10 overflow-y-auto">
                <header className="text-left mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-800">{contact.name}</h1>
                    <h2 className="text-base font-semibold text-sky-800 uppercase tracking-widest mt-1">{contact.title}</h2>
                </header>
                
                {summary && (
                    <MainSection title="Summary">
                        <p className="text-xs leading-relaxed">{summary}</p>
                    </MainSection>
                )}
                
                 {experience?.length > 0 && (
                    <MainSection title="Experience">
                        <div className="space-y-6">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-sm text-gray-900">{exp.jobTitle}</h4>
                                        <p className="font-medium text-gray-500 text-xs text-right">{exp.startDate} - {exp.endDate}</p>
                                    </div>
                                    <p className="italic text-xs text-gray-600 mb-2">{exp.company} | {exp.location}</p>
                                    <ul className="list-disc list-inside text-xs leading-relaxed space-y-2">
                                        {exp.description.split('\n').filter(line => line.trim()).map((line, index) => (
                                            <li key={index}>{line.replace(/^- /, '').trim()}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </MainSection>
                )}

                {education?.length > 0 && (
                    <MainSection title="Education">
                         <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id}>
                                     <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold text-sm text-gray-900">{edu.degree}</h4>
                                        <p className="font-medium text-gray-500 text-xs text-right">{edu.gradDate}</p>
                                    </div>
                                    <p className="italic text-xs text-gray-600">{edu.institution} | {edu.location}</p>
                                </div>
                            ))}
                        </div>
                    </MainSection>
                )}
            </main>
        </div>
    );
};

export default CVPreview;
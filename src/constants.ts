import type { CVData } from './types';

export const INITIAL_CV_DATA: CVData = {
  contact: {
    name: 'Your Name',
    title: 'Your Professional Title',
    phone: '+1 (123) 456-7890',
    email: 'your.email@example.com',
    linkedin: 'linkedin.com/in/yourprofile',
    location: 'City, Country',
  },
  summary: 'Results-oriented professional with 5+ years of experience in digital strategy and analytics, passionate about driving business growth through creative and data-driven solutions. Seeking to leverage proven skills in marketing and project management to contribute to your company.',
  skills: {
      technical: ['Python', 'SQL', 'Tableau', 'Excel', 'Google Analytics'],
      soft: ['Communication', 'Problem Solving', 'Leadership', 'Teamwork', 'Adaptability'],
  },
  experience: [
    {
      id: crypto.randomUUID(),
      jobTitle: 'Job Title',
      company: 'Company Name',
      location: 'City, Country',
      startDate: 'Month Year',
      endDate: 'Present',
      description: '- Managed a $250K annual budget and increased lead conversion by 30%.\n- Developed and implemented a new marketing strategy that resulted in a 15% increase in brand awareness.\n- Led a team of 5 to successfully launch a new product line.',
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      degree: 'Degree or Certification',
      institution: 'University or Institution Name',
      location: 'City, Country',
      gradDate: 'Month Year',
    },
  ],
  headshot: '',
};
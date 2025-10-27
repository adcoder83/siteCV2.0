export interface ContactInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  location: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  gradDate: string;
}

export interface Skills {
    technical: string[];
    soft: string[];
}

export interface CVData {
  contact: ContactInfo;
  summary: string;
  skills: Skills;
  experience: Experience[];
  education: Education[];
  headshot: string;
}

// FIX: Added missing Template type for the TemplateSelector component.
export type Template = 'modern' | 'traditional' | 'creative';

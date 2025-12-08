export interface Project {
  title: string;
  description: string[];
  tech: string[];
  category: 'Web' | 'AI/ML';
  link?: string;
  github?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  details: string;
  location: string;
}

export interface SkillMetric {
  subject: string;
  A: number; // Proficiency score out of 100
  fullMark: number;
}
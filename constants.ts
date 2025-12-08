import { Project, Certification, Education, SkillMetric } from './types';
import { 
  Code2, 
  BrainCircuit, 
  Database, 
  Layout, 
  Terminal, 
  Cpu 
} from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Aditya Verma",
  role: "CSE Student (AI & ML) | Full Stack Developer",
  email: "adityaverma5069@gmail.com",
  phone: "+91 9354138042",
  location: "Gurugram, Haryana, India",
  linkedin: "https://www.linkedin.com/in/aditya-verma",
  github: "https://github.com/Player997",
  bio: "I am a Bachelor of Engineering student at Chandigarh University, specializing in Computer Science with a focus on Artificial Intelligence and Machine Learning. My journey bridges the gap between robust software engineering and innovative AI solutions. From building responsive web applications to engineering crop recommendation models, I am driven by the desire to solve real-world problems through technology."
};

export const PROJECTS: Project[] = [
  {
    title: "Smart Crop Recommendation & Disease Detection",
    category: "AI/ML",
    description: [
      "Engineered an AI-based crop recommendation model using soil (NPK, pH), location, and weather inputs.",
      "Developed a CNN-driven plant disease classifier for early detection from leaf images.",
      "Integrated into a farmer-friendly dashboard."
    ],
    tech: ["Python", "TensorFlow/Keras", "CNN", "Weather APIs", "React"],
    github: "https://github.com/Player997",
    link: "https://github.com/Player997" 
  },
  {
    title: "Expense Tracker Web App",
    category: "Web",
    description: [
      "Developed a responsive expense tracker with real-time data updates.",
      "Integrated Firebase authentication (Google OAuth + Email/Password).",
      "Implemented secure session management and real-time syncing."
    ],
    tech: ["React", "Vite", "Firebase", "Tailwind CSS", "Node.js"],
    github: "https://github.com/Player997",
    link: "https://github.com/Player997"
  },
  {
    title: "Anime Streaming Website",
    category: "Web",
    description: [
      "Built a modern anime-streaming UI with dark theme and card-based layout.",
      "Implemented genre navigation, search functionality, and reusable components.",
      "Optimized rendering performance using Vite."
    ],
    tech: ["React", "Vite", "Tailwind CSS"],
    github: "https://github.com/Player997/anime-streaming-site",
    link: "https://github.com/Player997/anime-streaming-site"
  },
  {
    title: "Task Scheduler & To-Do List",
    category: "Web",
    description: [
      "Developed a robust task management application for organizing daily activities.",
      "Implemented priority-based sorting and local storage persistence.",
      "Features a clean, responsive interface for efficient task tracking."
    ],
    tech: ["React", "JavaScript", "CSS3", "LocalStorage"],
    github: "https://github.com/Player997/task-scheduler",
    link: "https://github.com/Player997/task-scheduler"
  }
];

export const SKILLS_DATA: SkillMetric[] = [
  { subject: 'Frontend', A: 90, fullMark: 100 },
  { subject: 'Backend', A: 75, fullMark: 100 },
  { subject: 'AI/ML', A: 85, fullMark: 100 },
  { subject: 'DevOps', A: 60, fullMark: 100 },
  { subject: 'Database', A: 80, fullMark: 100 },
  { subject: 'Data Science', A: 70, fullMark: 100 },
];

export const TECH_STACK = [
  { category: "Languages", items: ["C++", "Python", "Java", "JavaScript", "TypeScript"] },
  { category: "Frontend", items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Framer"] },
  { category: "Backend", items: ["Node.js", "Express.js", "Python ML Libraries"] },
  { category: "Database & Cloud", items: ["SQL", "PostgreSQL", "Firebase", "Oracle Cloud", "Google Cloud"] },
  { category: "Tools", items: ["Git", "GitHub", "Docker", "Kubernetes", "Figma", "Power BI"] },
];

export const EDUCATION: Education[] = [
  {
    institution: "Chandigarh University",
    degree: "BE in CSE (Hons.) with AI & ML (IBM)",
    duration: "2022 - 2026",
    details: "CGPA: 7.48 | Gharuan, Punjab",
    location: "Punjab, India"
  },
  {
    institution: "SCR Public School",
    degree: "Intermediate (CBSE)",
    duration: "2021 - 2022",
    details: "Percentage: 77.8% | Science Stream",
    location: "Gurugram, Haryana"
  },
  {
    institution: "SCR Public School",
    degree: "Matriculation (CBSE)",
    duration: "2019 - 2020",
    details: "Percentage: 86.83%",
    location: "Gurugram, Haryana"
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Artificial Intelligence Analyst", issuer: "IBM", date: "Apr 2025 (Expected)" },
  { name: "Generative AI for Data Analysis", issuer: "Coursera", date: "Mar 2025" },
  { name: "OCI 2024 Generative AI Certified Professional", issuer: "Oracle", date: "Jun 2024" },
  { name: "Trust and Security with Google Cloud", issuer: "Udacity", date: "Jul 2024" },
  { name: "Data Analytics & Visualization Job Simulation", issuer: "Forage", date: "Jul 2024" },
];

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];
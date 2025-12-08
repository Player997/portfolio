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
  linkedin: "https://www.linkedin.com/in/aditya-verma-aa8178288/",
  github: "https://github.com/Player997",
  bio: "Enthusiastic Computer Science Engineer and Web Developer with practical experience in full-stack development, machine learning, and data science. Skilled in building responsive, user-focused web applications and intelligent systems. Passionate about leveraging technology to develop innovative solutions that simplify and enhance digital experiences."
};

export const PROJECTS: Project[] = [
  {
    title: "Expense tracker WebApp",
    category: "Web",
    description: [
      "Developed a responsive expense tracking application with real-time data updates.",
      "Users can add, edit, delete, and categorize expenses and view detailed summaries.",
      "Integrated Firebase for user authentication (Google OAuth and email/password login).",
      "Implemented secure session management and real-time database syncing."
    ],
    tech: ["React", "Vite.js", "Tailwind CSS", "Node.js", "Express.js", "Firebase"],
    github: "https://github.com/Player997",
    link: "https://github.com/Player997"
  },
  {
    title: "Anime Streaming Website",
    category: "Web",
    description: [
      "Built a modern anime-streaming UI with a clean dark theme and responsive card-based layout.",
      "Added genre navigation, search UI, and reusable React components for consistent design.",
      "Optimized UI performance using Vite and Tailwind CSS."
    ],
    tech: ["React", "Vite", "Tailwind CSS"],
    github: "https://github.com/Player997",
    link: "https://github.com/Player997"
  },
  {
    title: "Task Scheduler & To-Do Web App",
    category: "Web",
    description: [
      "Developed a simple, clean task manager with add, delete, and complete-task features.",
      "Designed a responsive interface with smooth interactions and dark mode support.",
      "Used localStorage for data persistence without backend dependency."
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Player997",
    link: "https://github.com/Player997"
  },
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
  { 
    category: "Languages", 
    description: "Foundational languages I use to construct logic, algorithms, and system architecture.",
    items: ["C++", "Python", "Java", "JavaScript", "TypeScript"] 
  },
  { 
    category: "Frontend", 
    description: "Libraries and frameworks for building responsive, accessible, and performant user interfaces.",
    items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Framer"] 
  },
  { 
    category: "Backend", 
    description: "Server-side technologies used to build scalable APIs and handle business logic.",
    items: ["Node.js", "Express.js", "Python ML Libraries"] 
  },
  { 
    category: "Database & Cloud", 
    description: "Solutions for persistent data storage and cloud infrastructure management.",
    items: ["SQL", "PostgreSQL", "Firebase", "Oracle Cloud", "Google Cloud"] 
  },
  { 
    category: "Tools", 
    description: "Essential DevOps, version control, and design tools that streamline the development lifecycle.",
    items: ["Git", "GitHub", "Docker", "Kubernetes", "Figma", "Power BI"] 
  },
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
  { name: "Artificial Intelligence Analyst", issuer: "IBM", date: "Apr 2025" },
  { name: "Generative AI for Data Analysis", issuer: "Coursera", date: "Mar 2025" },
  { name: "Introduction to Generative AI", issuer: "LinkedIn Learning", date: "Aug 2024" },
  { name: "Data Analytics & Visualization Job Simulation", issuer: "Forage", date: "Jul 2024" },
  { name: "OCI 2024 Generative AI Certified Professional", issuer: "Oracle", date: "Jun 2024" },
  { name: "Trust and Security with Google Cloud", issuer: "Udacity", date: "Jul 2024" },
  { name: "Python for Data Science, AI & Development", issuer: "Coursera", date: "Apr 2024" },
];

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];
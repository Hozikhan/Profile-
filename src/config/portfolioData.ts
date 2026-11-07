/**
 * =========================================================================
 * HUZAIFA HUSSAIN - CYBER-TECH PORTFOLIO CONFIGURATION
 * =========================================================================
 * ALL text, titles, bios, links, education records, projects, and image paths
 * are consolidated in this single configuration object. You can edit any value
 * below to update the portfolio instantly without digging into UI components.
 * =========================================================================
 */

// Import uploaded reference B&W photo of Huzaifa Hussain
import userBwPhoto from '../assets/images/huzaifa_user_bw.png';
import dedonProjectImage from '../assets/images/gallery_project_dedon_1794061169370.jpg';
import labImage from '../assets/images/gallery_campus_lab_1794061170057.jpg';

export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  metrics?: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  category: 'Languages' | 'Web Tech' | 'AI & Tools' | 'Core Engineering';
  icon: string;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  status: 'In Progress' | 'Completed';
  description: string;
  keyAchievements: string[];
  badge: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  image: string;
}

export interface PortfolioConfig {
  profile: {
    fullName: string;
    callsign: string;
    designation: string;
    typingRoles: string[];
    currentInstitution: string;
    currentYear: string;
    location: {
      city: string;
      district: string;
      state: string;
      country: string;
      coordinates: { lat: number; lng: number };
      formatted: string;
    };
    bioShort: string;
    bioLong: string[];
    statusBadge: string;
    heroBgImage: string;
    portraitImage: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    instagram: string;
    email: string;
    discord?: string;
  };
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  skills: SkillItem[];
  projects: Project[];
  education: EducationItem[];
  gallery: GalleryItem[];
  hudSettings: {
    systemVersion: string;
    telemetryProtocol: string;
    defaultGlowColor: 'cyan' | 'blue' | 'teal' | 'white';
  };
}

export const PORTFOLIO_DATA: PortfolioConfig = {
  profile: {
    fullName: "Huzaifa Hussain",
    callsign: "HUZAIFA ✦ CE DEV",
    designation: "1st Year Diploma in Computer Engineering Student",
    typingRoles: [
      "Diploma in Computer Engineering Student",
      "Full-Stack Web Tinkerer",
      "C & Python Coder",
      "Creative Project Builder",
      "Tech & AI Explorer"
    ],
    currentInstitution: "MMANTC (Mansoor Hasan Girls & Boys Technical Campus)",
    currentYear: "1st Year Diploma in Computer Engineering",
    location: {
      city: "Madhubani",
      district: "Madhubani",
      state: "Bihar",
      country: "India",
      coordinates: { lat: 26.35, lng: 86.07 },
      formatted: "Madhubani, Bihar, India"
    },
    bioShort: "Hey! I'm a passionate 1st year Diploma in Computer Engineering student from Madhubani, Bihar, studying at MMANTC. I love turning creative ideas into functional code, building responsive web apps, and exploring C, Python & AI tools.",
    bioLong: [
      "Hey there! I am Huzaifa Hussain, currently pursuing my 3-year Diploma in Computer Engineering at MMANTC. Originally from Madhubani, Bihar, India, I have a deep passion for computing, coding, and building things that work seamlessly.",
      "Right now in my 1st year of Diploma, I am sharpening my core fundamentals in C programming, logic building, Python automation, and modern web development using HTML5, CSS3, JavaScript, React, and Tailwind CSS.",
      "Beyond college lectures, I love experimenting with cool interactive projects like Dedon.ai (an AI tools directory), tinkering with creative web designs, and collaborating with fellow tech enthusiasts!"
    ],
    statusBadge: "OPEN TO COLLABORATION & PROJECTS",
    heroBgImage: userBwPhoto,
    portraitImage: userBwPhoto,
  },

  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    email: "hozikhan00@gmail.com",
    discord: "https://discord.com"
  },

  stats: [
    { label: "DIPLOMA YEAR", value: "01", description: "1st Year Diploma in CE" },
    { label: "FAVORITE SKILLS", value: "10+", description: "C, Python, JS, Web & AI" },
    { label: "SHOWCASE BUILDS", value: "04", description: "Web & Coding Projects" },
    { label: "HOMETOWN", value: "BR-IN", description: "Madhubani, Bihar" },
  ],

  skills: [
    // Languages
    {
      name: "C Language",
      level: 82,
      category: "Languages",
      icon: "Code2",
      description: "Foundational systems programming, memory management, pointers, and data structures."
    },
    {
      name: "Python",
      level: 85,
      category: "Languages",
      icon: "Terminal",
      description: "Scripting, algorithm implementations, automation scripts, and data handling."
    },
    {
      name: "JavaScript (ES6+)",
      level: 88,
      category: "Languages",
      icon: "FileCode",
      description: "Modern asynchronous workflows, DOM manipulation, functional paradigms, and Web APIs."
    },

    // Web Tech
    {
      name: "HTML5 & Semantic Markup",
      level: 95,
      category: "Web Tech",
      icon: "Layout",
      description: "Accessible, semantic web structure, microdata, and SEO best practices."
    },
    {
      name: "CSS3 & Modern Tailwind",
      level: 92,
      category: "Web Tech",
      icon: "Palette",
      description: "Utility-first design, cybernetic HUD aesthetics, responsive grid/flexbox layouts."
    },
    {
      name: "React.js",
      level: 84,
      category: "Web Tech",
      icon: "Atom",
      description: "Component architecture, custom hooks, state synchronization, and component lifecycles."
    },
    {
      name: "Three.js & 3D WebGL",
      level: 76,
      category: "Web Tech",
      icon: "Box",
      description: "Interactive 3D geometry rendering, procedural textures, camera perspective, and lighting rigs."
    },

    // AI & Tools
    {
      name: "AI Tools & Prompt Engineering",
      level: 90,
      category: "AI & Tools",
      icon: "Cpu",
      description: "Gemini API integrations, multimodal workflows, developer productivity acceleration."
    },
    {
      name: "Git & GitHub",
      level: 80,
      category: "AI & Tools",
      icon: "GitBranch",
      description: "Version control, branching strategies, collaborative workflows, and repository management."
    },
    {
      name: "Linux / Bash CLI",
      level: 78,
      category: "AI & Tools",
      icon: "TerminalSquare",
      description: "Shell commands, system administration basics, scripting, and development toolchains."
    },

    // Core Engineering
    {
      name: "Computer Architecture & Logic",
      level: 82,
      category: "Core Engineering",
      icon: "CircuitBoard",
      description: "Boolean algebra, logic gates, ALU design principles, memory hierarchies."
    },
    {
      name: "Data Structures Fundamentals",
      level: 78,
      category: "Core Engineering",
      icon: "Network",
      description: "Arrays, linked lists, stacks, queues, searching and sorting algorithm analysis."
    }
  ],

  projects: [
    {
      id: "dedon-ai",
      title: "Dedon.ai – AI Tools Directory",
      category: "AI & Web Platform",
      tagline: "Curated Directory & Exploration Hub for Next-Generation AI Tools",
      description: "A centralized cyber-tech discovery hub designed to catalog, review, and categorize cutting-edge artificial intelligence models, productivity bots, vision generators, and developer APIs with lightning-fast real-time search.",
      technologies: ["React", "Tailwind CSS", "JavaScript", "AI Directory Engine", "REST API"],
      metrics: "Cataloging 250+ Tools",
      image: dedonProjectImage,
      demoUrl: "https://dedon.ai",
      githubUrl: "https://github.com",
      highlights: [
        "Dynamic multi-category filtering across NLP, Computer Vision, Audio, and Code synthesis",
        "Cybernetic dark-mode UI with high-contrast electric blue status tags and instant search",
        "Responsive grid layout optimized for mobile and desktop developer workflows"
      ]
    },
    {
      id: "online-shopping-ict",
      title: "Online Shopping ICT Presentation",
      category: "Academic & Systems Architecture",
      tagline: "Comprehensive E-Commerce Architecture & Digital Transaction Workflow",
      description: "An interactive educational presentation and technical blueprint analyzing the core information and communications technology (ICT) infrastructure powering modern electronic commerce.",
      technologies: ["Web Slides", "Interactive Diagrams", "Data Flow Models", "HTML/CSS/JS"],
      metrics: "Grade A+ Commendation",
      image: labImage,
      demoUrl: "#projects",
      githubUrl: "https://github.com",
      highlights: [
        "In-depth breakdown of secure payment gateways, SSL/TLS handshake, and order dispatch pipelines",
        "Database entity-relationship mapping for catalog, cart state, and customer authentication",
        "Interactive digital transaction simulation demonstrated during engineering seminar"
      ]
    },
    {
      id: "cyber-portfolio-3d",
      title: "Interactive 3D Portfolio Matrix",
      category: "Interactive 3D WebGL",
      tagline: "Scroll-Driven Three.js 3D Photo Shrinking & Monochrome Experience",
      description: "Custom-engineered personal portfolio featuring procedural WebGL cube cluster, real-time mouse parallax, scroll-driven perspective compression, and sleek monochrome noir aesthetics.",
      technologies: ["React 19", "Three.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      metrics: "60 FPS Hardware Rendered",
      image: userBwPhoto,
      demoUrl: "#hero",
      githubUrl: "https://github.com",
      highlights: [
        "Custom Three.js WebGL scene with software GL fallback and RoomEnvironment reflections",
        "Scroll-driven shrinking photo effect translating 3D depth into About section layout",
        "Sleek black-and-white noir design aesthetic with 5-second continuous background animation"
      ]
    },
    {
      id: "algorithmic-toolkit",
      title: "C & Python Algorithmic Toolkit",
      category: "Systems & Algorithms",
      tagline: "High-Performance Data Structures & Computational Math Utilities",
      description: "Collection of optimized data structure implementations in C and algorithmic automation scripts in Python built during first-year engineering coursework.",
      technologies: ["C99", "Python 3", "Algorithms", "Memory Profiling", "CLI Tools"],
      metrics: "O(log n) Benchmarks",
      image: labImage,
      demoUrl: "#skills",
      githubUrl: "https://github.com",
      highlights: [
        "Dynamic array resizing, doubly linked list operations, and memory-leak checked pointers",
        "Recursive matrix transformations and mathematical graph traversals in pure C",
        "Automated unit testing suite for sorting algorithms and complexity benchmarks"
      ]
    }
  ],

  education: [
    {
      id: "mmantc",
      institution: "MMANTC (Mansoor Hasan Girls & Boys Technical Campus)",
      degree: "Diploma in Computer Engineering",
      period: "2024 – 2027 (Currently in 1st Year)",
      location: "Maharashtra / India",
      status: "In Progress",
      description: "Pursuing 3-year Diploma in Computer Engineering curriculum with hands-on practice in C, Python, web development, digital logic, and operating system principles.",
      keyAchievements: [
        "Active member of campus computer club and developer peer group",
        "Building strong foundation in C language, Python logic, and web design",
        "Created interactive tech presentations and student utilities"
      ],
      badge: "1ST YEAR DIPLOMA"
    },
    {
      id: "dps-kaluahi",
      institution: "DPS Kaluahi (Delhi Public School, Kaluahi)",
      degree: "Secondary & Foundation Schooling",
      period: "Graduated with Distinction",
      location: "Kaluahi, Madhubani, Bihar, India",
      status: "Completed",
      description: "Completed secondary education with strong excellence in Science, Mathematics, and Computer Applications.",
      keyAchievements: [
        "Distinction in Mathematics and Computer Studies",
        "Represented school in science & technology events",
        "Awarded best student project in digital applications"
      ],
      badge: "DPS ALUMNUS"
    }
  ],

  gallery: [
    {
      id: "gal-portrait",
      title: "Huzaifa Hussain – Portrait",
      caption: "First-year Diploma in Computer Engineering student at MMANTC, native of Madhubani, Bihar.",
      category: "Profile & Portrait",
      image: userBwPhoto
    },
    {
      id: "gal-dedon",
      title: "Dedon.ai Directory Interface",
      caption: "High-tech curated directory designed for searching and discovering AI tools.",
      category: "Project Showcase",
      image: dedonProjectImage
    },
    {
      id: "gal-lab",
      title: "Engineering Workbench & Coding Lab",
      caption: "Embedded systems, oscilloscope diagnostics, and dual-monitor C / Python coding setup.",
      category: "Campus & Tech Lab",
      image: labImage
    },
    {
      id: "gal-matrix",
      title: "Monochrome Noir Portrait Matrix",
      caption: "Minimalist black and white high-contrast architecture powering the 3D portfolio.",
      category: "Visual Architecture",
      image: userBwPhoto
    }
  ],

  hudSettings: {
    systemVersion: "v2.6.4-NOIR",
    telemetryProtocol: "ST-86.07 // MADHUBANI_NODE",
    defaultGlowColor: "white"
  }
};

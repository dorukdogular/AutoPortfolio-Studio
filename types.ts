export interface BasicInfo {
  name: string;
  title: string;
  email: string;
  bio: string;
  profileImage: string; // base64 string
  profileImageFile?: File;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
}

export interface Certification {
  id: string;
  name: string;
  authority: string;
  date: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  heading: string;
}

export interface Theme {
  id: string;
  name: string;
  isAIGenerated: boolean;
  light: ThemeColors;
  dark: ThemeColors;
}

export interface Layout {
  id: string;
  name: string;
}

export type ColorScheme = 'light' | 'dark' | 'system';
export type FontSize = 'sm' | 'base' | 'lg';
export type ContentWidth = 'standard' | 'wide' | 'full';

export interface SiteSettings {
  title: string;
  description: string;
  favicon: string; // base64 string
  fontFamily: string;
  colorScheme: ColorScheme;
  fontSize: FontSize;
  contentWidth: ContentWidth;
}

export interface PortfolioData {
  basicInfo: BasicInfo;
  skills: string[];
  skillsTitle: string;
  projects: Project[];
  projectsTitle: string;
  socialLinks: SocialLink[];
  experience: Experience[];
  education: Education[];
  testimonials: Testimonial[];
  certifications: Certification[];
  themeId: string;
  layoutId: string;
  siteSettings: SiteSettings;
}

export type Tab = 'Basic Info' | 'Projects' | 'Experience' | 'Education' | 'Testimonials' | 'Certs' | 'Socials' | 'Layout' | 'Theme' | 'Settings' | 'AI Assistant';

export interface ExportData {
  portfolioData: PortfolioData;
  customThemes: Theme[];
}

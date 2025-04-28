export interface ProfileData {
  profileImage: string;
  description: string;
  resumeUrl: string;
  skills: TechStackItem[];
}

export interface Project {
  name: string;
  description: string;
  stars: number;
  url?: string;
  homepage?: string;
  language: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface TechStackItem {
  name: string;
  icon: string;
}
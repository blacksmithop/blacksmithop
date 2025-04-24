export interface TechStack {
  name: string;
  icon: string;
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
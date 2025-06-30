import { ExperienceLevel, TechStack } from "./user";

export interface CodeSnippet {
  id: number;
  title: string;
  description: string;
  codeSnippet1: string;
  codeSnippet2: string;
  correctAnswer: number;
  explanation: string; 
  techStack: TechStack;
  difficulty: ExperienceLevel;
  isAI?: boolean;
}

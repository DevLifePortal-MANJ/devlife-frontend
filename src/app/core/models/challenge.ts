import { ExperienceLevel, TechStack } from "./user";

export interface Challenge {
  stack: TechStack;
  level: ExperienceLevel;
  task: string;
  roasts: string[];
  praises: string[];
}


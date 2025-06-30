export interface User {
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  techStack: TechStack; 
  experienceLevel: number; 
  zodiacSign?: ZodiacSign;
  points?: number;
}
export enum TechStack {
  React = 0,
  Angular = 1,
  Vue = 2,
  Net = 3,
  Python = 4
}
export enum ExperienceLevel {
  Junior = 0,
  Middle = 1,
  Senior = 2,

}
export enum ZodiacSign {
  Aries = 0,
  Taurus = 1,
  Gemini = 2,
  Cancer = 3,
  Leo = 4,
  Virgo = 5,
  Libra = 6,
  Scorpio = 7,
  Sagittarius = 8,
  Capricorn = 9,
  Aquarius = 10,
  Pisces = 11,
}



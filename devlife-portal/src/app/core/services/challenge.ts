import { Injectable } from '@angular/core';
import { ExperienceLevel, TechStack } from '../models/user';
import { Challenge } from '../models/challenge';

@Injectable({ providedIn: 'root' })
export class ChallengeService {
  private challenges: Challenge[] = [
    {
      stack: TechStack.Angular,
      level: ExperienceLevel.Junior,
      task: 'დაწერე კომპონენტი, რომელიც აჩვენებს counter-ს და ზრდის მას ღილაკზე დაჭერისას.',
      roasts: [
        'კომპონენტი მუშაობს, მაგრამ ღმერთმა უწყოს როგორ 🤷‍♂️',
        'ChangeDetectorRef-ს რომ მიაგნებდი, თვითონაც გაგვიკვირდებოდა 😅',
        'Lifecycle hook-ებს ისე უყურებ, თითქოს Harry Potter-ია 🧙‍♂️'
      ]
  },
  {
    stack: TechStack.React,
    level: ExperienceLevel.Middle,
    task: 'დაწერე კომპონენტი რომელიც იყენებს useEffect-ს API call-თვის და აჩვენებს მონაცემს.',
    roasts: [
      'useEffect-ს იყენებ ისე, როგორც წარსულის შეცდომებს – არასდროს ასწორებ 😅',
      'React კი არა, Recrash დაწერე 🍝',
      'რენდერების რაოდენობა რეალურ დროში NASA-ს სატელიტსაც აინტერესებს 🚀'
    ]
  },
  {
    stack: TechStack.Python,
    level: ExperienceLevel.Senior,
    task: 'დაწერე Python სკრიპტი, რომელიც ასინქრონურად კითხულობს ფაილებს და აერთიანებს მათ.',
    roasts: [
      'async/await-ს იყენებ, მაგრამ კოდი მაინც ბლოკავს ყველაფერს 🤯',
      'Python-მა თვითონ გითხრა: `exit()` 🐍',
      'შენი კოდი ისეა დაწერილი, AI-ც ვერ ჩაწვდა მის მიზანს 🤖'
    ]
  }
  ];
  getRandomRoast(challenge: Challenge): string {
    if (!challenge.roasts || challenge.roasts.length === 0) return 'კოდი სევდაშია 😢';
    const i = Math.floor(Math.random() * challenge.roasts.length);
    return challenge.roasts[i];
  }

  getChallengeByStack(stack: TechStack): Challenge | null {
    return this.challenges.find(c => c.stack === stack) || null;
  }

  getLevelByStack(stack: TechStack): ExperienceLevel | null {
  const challenge = this.getChallengeByStack(stack);
  return challenge ? challenge.level : null;
}

  getAllChallenges(): Challenge[] {
    return this.challenges;
  }
}

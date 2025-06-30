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
      ],
      praises: [
        'შენ რომ Angular-ს შექმნიდი, უკეთესი გამოვიდოდა 💪',
        'კომპონენტი სუფთაა, ლამაზია – პირდაპირ Angular დოკუმენტაციაში შეტანე 📚',
        'ყველა hook-ს სწორი ადგილას იყენებ — Angular itself is proud! 🔥'
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
      ],
      praises: [
        'useEffect როგორც უნდა — ზუსტად ისე გამოიყენე 💡',
        'React-ში შენს კოდს ისე წარადგენ, F8-ზე პირდაპირ გაგიყვანენ 🎤',
        'ოპტიმიზაცია არ გჭირდება — უკვე იდეალურია 🌈'
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
      ],
      praises: [
        'ასინქრონულობაზე ლექციას შენგან მოვუსმენდი 🎓',
        'შენი სკრიპტი ისე ლამაზად მუშაობს, Python-იც გაოცებულია 🐍💖',
        'კოდი გაშიფრული პოეზიაა — ოპტიმალური და ელეგანტური ✨'
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

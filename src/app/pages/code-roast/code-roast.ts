import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonacoEditor } from '../../components/monaco-editor/monaco-editor';
import { ChallengeService } from '../../core/services/challenge';
import { Challenge } from '../../core/models/challenge';
import { TechStack,ExperienceLevel } from '../../core/models/user';

@Component({
  selector: 'app-code-roast',
  standalone: true,
  templateUrl: './code-roast.html',
  styleUrls: ['./code-roast.css'],
  imports: [CommonModule, MonacoEditor],
})
export class CodeRoast {
  techStacks = Object.keys(TechStack).filter(key => isNaN(Number(key))); // ['React', 'Angular', ...]
  selectedStack: string = 'Angular';

  challenge: Challenge | null = null;
  userCode: string = '';
  roastMessage: string = '';
  showRoast = false;

  constructor(private challengeService: ChallengeService) {}
  ngOnInit(): void {
    this.loadChallenge();
  }

  loadChallenge(): void {
    const stackEnumValue = TechStack[this.selectedStack as keyof typeof TechStack];
    this.challenge = this.challengeService.getChallengeByStack(stackEnumValue);
    this.showRoast = false;
    this.userCode = '';
    this.roastMessage = '';
  }

  submit(): void {
    if (!this.challenge) return;
    this.showRoast = true;

    const isGood = this.userCode.includes('+') || this.userCode.includes('return');
    const messages = isGood ? this.challenge.praises : this.challenge.roasts;
    this.roastMessage = messages[Math.floor(Math.random() * messages.length)];
  }
}

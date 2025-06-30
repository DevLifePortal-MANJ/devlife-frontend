import { Component, OnInit } from '@angular/core';
import { CodeSnippetService } from '../../core/services/code-snippet';
import { UserService } from '../../core/services/user';
import { CodeSnippet } from '../../core/models/code-snippet';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Loader } from '../../components/loader/loader';

@Component({
  selector: 'app-code-casino',
  standalone: true,
  imports: [CommonModule, Loader],
  templateUrl: './code-casino.html',
  styleUrls: ['./code-casino.css']
})
export class CodeCasino implements OnInit {
  snippet: CodeSnippet | null = null;
  choices: string[] = [];
  message: string = '';
  points: number = 0;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private snippetService: CodeSnippetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('currentUser');

    if (!token || !userStr) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.loading = true;
    this.userService.getPoints().subscribe({
      next: (points) => {
        this.points = points;
        if (points > 0) {
          this.loadNewChallenge();
        } else {
          this.message = 'ქულები ამოიწურა 😢';
          this.loading = false;
        }
      },
      error: () => {
        this.message = 'ქულების წამოღება ვერ მოხერხდა.';
        this.loading = false;
      }
    });
  }

  choose(answer: string): void {
    if (!this.snippet || this.loading) return;

    const betPoints = 10;
    if (this.points < betPoints) {
      this.message = 'არასაკმარისი ქულაა 💸';
      return;
    }

    const userAnswer = answer === this.snippet.codeSnippet1 ? 0 : 1;

    const challengeData: CodeSnippet = {
      ...this.snippet,
      correctAnswer: 0,
      explanation: this.snippet.explanation || '',
    };

    this.loading = true;

    this.snippetService.playCasinoChallenge(
      this.snippet.id,
      userAnswer,
      betPoints,
      challengeData
    ).subscribe({
      next: (res) => {
        this.userService.getPoints().subscribe({
          next: (updatedPoints) => {
            this.points = updatedPoints;
            this.message = res.message;
            this.loading = false;

            if (this.points > 0) {
              setTimeout(() => this.loadNewChallenge(), 2000);
            } else {
              this.message += ' შენ გაქვს 0 ქულა და თამაში დასრულდა. 😢';
            }
          },
          error: () => {
            this.message = 'ქულების განახლება ვერ მოხერხდა';
            this.loading = false;
          }
        });
      },
      error: () => {
        this.message = 'თამაში ვერ შესრულდა 😢';
        this.loading = false;
      }
    });
  }

  loadNewChallenge(): void {
    this.loading = true;
    this.message = '';
    this.choices = [];

    this.snippetService.getChallenge().subscribe({
      next: (res) => {
        this.snippet = res.challenge;
        this.choices = [
          res.challenge.codeSnippet1,
          res.challenge.codeSnippet2
        ].sort(() => Math.random() - 0.5);
        this.loading = false;
      },
      error: () => {
        this.message = 'ახალი ჩელენჯის წამოღება ვერ მოხერხდა.';
        this.loading = false;
      }
    });
  }
}

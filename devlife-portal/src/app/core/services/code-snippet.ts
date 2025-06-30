import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodeSnippet } from '../../core/models/code-snippet';

@Injectable({ providedIn: 'root' })
export class CodeSnippetService {
  private casinoUrl = 'http://localhost:5000/api/casino';

  constructor(private http: HttpClient) {}

  getChallenge(): Observable<{ challenge: CodeSnippet; userPoints: number }> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<{ challenge: CodeSnippet; userPoints: number }>(
      `${this.casinoUrl}/challenge`,
      { headers }
    );
  }

  playCasinoChallenge(
    challengeId: number,
    userAnswer: number,
    betPoints: number,
    challengeData: CodeSnippet 
  ): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      challengeId,
      userAnswer,
      betPoints,
      challengeData
    };

    return this.http.post(`${this.casinoUrl}/play`, body, { headers });
  }
}

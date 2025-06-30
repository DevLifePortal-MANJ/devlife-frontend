import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private authUrl = 'http://localhost:5000/api/auth';
  private casinoUrl = 'http://localhost:5000/api/casino';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('currentUser');
    if (stored) this.currentUser = JSON.parse(stored);
  }

  register(user: Pick<User, 'username' | 'firstName' | 'lastName' | 'birthDate' | 'techStack' | 'experienceLevel'>): Observable<any> {
    const token = localStorage.getItem('token');

    const params = new HttpParams()
      .set('username', user.username)
      .set('firstName', user.firstName)
      .set('lastName', user.lastName)
      .set('birthDate', user.birthDate)
      .set('techStack', user.techStack)
      .set('experienceLevel', user.experienceLevel);

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post(`${this.authUrl}/register`, null, { headers, params });
  }

  login(username: string): Observable<void> {
    const params = new HttpParams().set('username', username);

    return this.http.post<{ token: string; user: User }>(`${this.authUrl}/login`, null, { params }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        this.currentUser = res.user;
      }),
      map(() => void 0)
    );
  }
  getCurrentUser(): User | null {
    return this.currentUser;
  }
  logout(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.post(`${this.authUrl}/logout`, null, { headers }).subscribe({
      complete: () => this.clearSession(),
      error: () => this.clearSession()
    });
  }

  private clearSession(): void {
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  getDashboardData(): Observable<{
    welcomeMessage: string;
    user: User;
    dailyHoroscope: string;
    luckyTech: string;
  }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<{
      welcomeMessage: string;
      user: User;
      dailyHoroscope: string;
      luckyTech: string;
    }>(`${this.authUrl.replace('/auth', '')}/dashboard`, { headers });
  }

  getPoints(): Observable<number> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<{ points: number }>(`${this.casinoUrl}/points`, { headers }).pipe(
      tap(res => {
        if (this.currentUser) this.currentUser.points = res.points;
      }),
      map(res => res.points)
    );
  }

  updatePoints(amount: number): Observable<{ points: number }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post<{ points: number }>(`${this.casinoUrl}/points`, { amount }, { headers }).pipe(
      tap(res => {
        if (this.currentUser) this.currentUser.points = res.points;
      })
    );
  }
}

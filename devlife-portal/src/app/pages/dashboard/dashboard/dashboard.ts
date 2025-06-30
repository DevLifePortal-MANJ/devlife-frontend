import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user';
import { User } from '../../../core/models/user';
import { Router } from '@angular/router';
import { Gif } from '../../../components/gif/gif';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [CommonModule, Gif]
})
export class Dashboard implements OnInit {
  user: User | null = null;
  points: number = 0;
  welcomeMessage: string = '';
  dailyHoroscope: string = '';
  luckyTech: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.userService.getDashboardData().subscribe({
      next: (res) => {
        this.user = res.user;
        this.welcomeMessage = res.welcomeMessage;
        this.dailyHoroscope = res.dailyHoroscope;
        this.luckyTech = res.luckyTech;
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });

    this.userService.getPoints().subscribe({
      next: (pts) => this.points = pts,
      error: () => this.points = 0
    });
  }
}

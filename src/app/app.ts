import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navigation } from './components/navigation/navigation';
import { CommonModule } from '@angular/common';
import { Particles } from './components/particles/particles/particles';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navigation,CommonModule,Particles],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isSidebarCollapsed = true;
  protected title = 'devlife-portal';
  constructor(private router: Router) {}
  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
  isAuthRoute(): boolean {
    const path = this.router.url;
    return path === '/login' || path === '/register';
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule,CommonModule],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css'] 
})
export class Navigation {
  isCollapsed = true;

  @Output() collapsedChange = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsedChange.emit(this.isCollapsed);
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

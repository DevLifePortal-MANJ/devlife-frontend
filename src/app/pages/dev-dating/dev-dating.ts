import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dev-dating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dev-dating.html',
  styleUrl: './dev-dating.css'
})
export class DevDating {
  step: 'setup' | 'match' | 'chat' = 'setup';

  gender = '';
  preference = '';
  bio = '';

  profiles = [
    { name: 'Anna', stack: 'React', gender: 'female' },
    { name: 'Nika', stack: 'Angular', gender: 'male' },
    { name: 'Gio', stack: 'Vue', gender: 'male' },
    { name: 'Mariam', stack: 'React', gender: 'female' },
    { name: 'Elene', stack: 'Angular', gender: 'male' },
    { name: 'Vakhtangi', stack: 'Vue', gender: 'male' }
  ];
  currentIndex = 0;
  likedProfile: any = null;

  userStack = 'Angular';
  chatHistory: string[] = [];
  userMessage = '';

  @ViewChild('card') cardRef!: ElementRef;

  filteredProfiles: any[] = [];

  get currentProfile() {
    return this.filteredProfiles[this.currentIndex];
  }

  startMatching() {
    this.filteredProfiles = this.profiles.filter(p =>
      this.preference === 'any' || p.gender === this.preference
    );
    this.currentIndex = 0;
    this.step = 'match';
  }

  like() {
    this.likedProfile = this.currentProfile;
    this.step = 'chat';

    setTimeout(() => {
      this.chatHistory.push(`${this.likedProfile.name}: გამარჯობა! მომწონს, რომ შენც ${this.userStack}-ით მუშაობ 💻`);
    }, 1500);
  }
  skip() {
    const card = this.cardRef?.nativeElement as HTMLElement;
    if (card) {
      card.style.transition = 'none';
      card.style.transform = 'translateX(0) rotate(0deg)';
    }
    this.currentIndex++;

    if (this.currentIndex >= this.filteredProfiles.length) {
      alert('დამთავრდა პრეფერენციის პროფილები 😢');
      this.step = 'setup';
    }
  }
  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.chatHistory.push(`შენ: ${this.userMessage}`);
    const reply = this.generateAiReply(this.userMessage);
    setTimeout(() => this.chatHistory.push(`${this.likedProfile.name}: ${reply}`), 1000);
    this.userMessage = '';
  }

  generateAiReply(userInput: string): string {
    const lower = userInput.toLowerCase();
    if (lower.includes('stack') || lower.includes('tech'))
      return `მიყვარს ${this.likedProfile.stack}, მაგრამ Angular-საც ვაფასებ 😅`;
    if (lower.includes('project'))
      return `შენ რომელ პროექტზე მუშაობ? ჩემი ბოლო იყო fullstack pet app 🐶`;
    return 'ძალიან საინტერესოა 🤔 გაიმეორე, აბა?';
  }

  handleSwipe(event: TouchEvent | MouseEvent) {
    const startX = (event as TouchEvent).touches
      ? (event as TouchEvent).touches[0].clientX
      : (event as MouseEvent).clientX;

    const moveHandler = (moveEvent: TouchEvent | MouseEvent) => {
      const currentX = (moveEvent as TouchEvent).touches
        ? (moveEvent as TouchEvent).touches[0].clientX
        : (moveEvent as MouseEvent).clientX;
      const deltaX = currentX - startX;

      const card = this.cardRef.nativeElement as HTMLElement;
      card.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 20}deg)`;
    };

    const endHandler = (endEvent: TouchEvent | MouseEvent) => {
      const endX = (endEvent as TouchEvent).changedTouches
        ? (endEvent as TouchEvent).changedTouches[0].clientX
        : (endEvent as MouseEvent).clientX;
      const deltaX = endX - startX;

      const card = this.cardRef.nativeElement as HTMLElement;
      card.style.transition = 'transform 0.3s ease';

      if (deltaX > 100) {
        card.style.transform = 'translateX(100vw)';
        setTimeout(() => this.like(), 300);
      } else if (deltaX < -100) {
        card.style.transform = 'translateX(-100vw)';
        setTimeout(() => this.skip(), 300);
      } else {
        card.style.transform = 'translateX(0)';
      }

      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', endHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('touchend', endHandler);
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', endHandler);
    window.addEventListener('touchmove', moveHandler);
    window.addEventListener('touchend', endHandler);
  }
}

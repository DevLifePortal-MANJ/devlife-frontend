import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-escape-meeting',
  imports: [CommonModule,FormsModule],
  templateUrl: './escape-meeting.html',
  styleUrl: './escape-meeting.css'
})
export class EscapeMeeting {
category: string = 'standup';
excuse: string = '';
generateExcuse() {
  const excuses: Record<string, string[]> = {
    standup: ['სერვერს ცეცხლი გაუჩნდა 🔥', 'დეველოპერის კატა კლავიატურაზეა 🐱'],
    sprint: ['ინტერნეტი გაქრა 🌐', 'მუშაობა Production-ზეა და ვერ გამოვეთიშები'],
    client: ['AI-მ ცნობიერება შეიძინა 🤖', 'დეველოპერი ტყეშია და სიგნალი არ აქვს 🌲'],
    team: ['ლეპტოპმა გადაწყვიტა შვებულება აიღოს 💻', 'გამარჯვებულმა ბაგმა დამჯაბნა 🐛'],
  };

  const random = Math.floor(Math.random() * excuses[this.category].length);
  this.excuse = excuses[this.category][random];
}
}

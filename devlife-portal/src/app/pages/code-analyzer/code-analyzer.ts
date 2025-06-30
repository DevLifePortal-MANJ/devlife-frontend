import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-analyzer',
  imports: [CommonModule,FormsModule],
  templateUrl: './code-analyzer.html',
  styleUrl: './code-analyzer.css'
})
export class CodeAnalyzer {
 githubUrl = '';
  result = '';

  analyzeCode() {
    if (!this.githubUrl.includes('github.com')) {
      this.result = 'გთხოვთ შეიყვანოთ სწორი GitHub ლინკი';
    } else {
      this.result = '🔍 შენი კოდის ანალიზი: შენ ხარ Chaotic Debugger! 🧠';
    }
  }
}

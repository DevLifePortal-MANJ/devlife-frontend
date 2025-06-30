import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonacoEditor } from '../../components/monaco-editor/monaco-editor'; 

@Component({
  selector: 'app-code-roast',
  standalone: true,
  templateUrl: './code-roast.html',
  styleUrls: ['./code-roast.css'],
  imports: [CommonModule, MonacoEditor]
})
export class CodeRoast {
  challenge = {
    task: 'დაწერე ფუნქცია, რომელიც აბრუნებს ორი რიცხვის ჯამს.',
    roasts: [
      'ეს კოდი ისე ცუდია, ბაბუაჩემმაც არ ინება გაეშვა 😅',
      'კომპილატორმა ინანა რომ გაჩნდა 🤖',
      'აქამდე ვფიქრობდი, რომ გო ანუ Go იყო ნელი... ახლა ვხედავ, თურმე არის SlothScript 🦥'
    ],
    praises: [
      'ძალიან კარგი კოდია, კი არ გაუშვი – პენთაგონშიც გადაგზავნე 🚀',
      'შენ კოდი დაწერე თუ ლექსი? ბრავო! 🎯',
      'ეს კოდი კი არა – წმინდა source-ია 💎'
    ]
  };

  userCode: string = '';
  roastMessage: string = '';
  showRoast = false;

  submit(): void {
    this.showRoast = true;
    const isGood = this.userCode.includes('+') || this.userCode.includes('return');
    const messages = isGood ? this.challenge.praises : this.challenge.roasts;
    this.roastMessage = messages[Math.floor(Math.random() * messages.length)];
  }
  
}

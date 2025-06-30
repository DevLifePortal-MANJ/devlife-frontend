import { Component } from '@angular/core';
import {ElementRef,  HostListener,  OnInit,  Renderer2,  ViewChild,} from '@angular/core';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
}
@Component({
  selector: 'app-particles',
  imports: [],
  templateUrl: './particles.html',
  styleUrl: './particles.css'
})
export class Particles {
@ViewChild('starsCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  stars: Star[] = [];
  ctx!: CanvasRenderingContext2D;
  mouse = { x: 0, y: 0 };
  starCount = 100;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const canvas = this.el.nativeElement.querySelector('#starsCanvas') as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.createStars();
    this.animate();
  }

  createStars() {
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }
  }

  animate() {
    const canvas = this.el.nativeElement.querySelector('#starsCanvas') as HTMLCanvasElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.stars.forEach((star) => {
      star.x += star.vx;
      star.y += star.vy;

      if (star.x <= 0 || star.x >= canvas.width) star.vx *= -1;
      if (star.y <= 0 || star.y >= canvas.height) star.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = 'white';
      this.ctx.fill();
    });

    for (let i = 0; i < this.stars.length; i++) {
      for (let j = i + 1; j < this.stars.length; j++) {
        const a = this.stars[i];
        const b = this.stars[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const mouseDistX = (a.x + b.x) / 2 - this.mouse.x;
          const mouseDistY = (a.y + b.y) / 2 - this.mouse.y;
          const mouseDistance = Math.sqrt(mouseDistX ** 2 + mouseDistY ** 2);

          let alpha = 1 - distance / 100;
          if (mouseDistance < 200) {
            alpha += (200 - mouseDistance) / 400;
          }

          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(alpha, 1)})`;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  @HostListener('window:resize')
  onResize() {
    const canvas = this.el.nativeElement.querySelector('#starsCanvas') as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.createStars();
  }
}

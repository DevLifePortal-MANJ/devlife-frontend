import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-bug-chase',
  standalone: true,
  templateUrl: './bug-chase.html',
  styleUrls: ['./bug-chase.css']
})
export class BugChase implements OnInit {
  @ViewChild('gameCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  character = {
    x: 50,
    y: 130,
    width: 50,
    height: 80,
    isJumping: false,
    isDucking: false,
    jumpHeight: 160,
    velocityY: 0
  };

  obstacles: { x: number; y: number; width: number; height: number; type: string }[] = [];
  gravity = 1.8;
  points = 0;
  gameOver = false;
  win = false;
  animationFrameId: any;

  powerUps = {
    coffee: { active: false, duration: 5000, speedMultiplier: 2 },
    weekend: { active: false, duration: 5000, invincible: true }
  };
  powerUpTimers: any[] = [];
  speedMultiplier = 1;

  readonly TARGET_POINTS = 100;
  canvas!: HTMLCanvasElement;

  ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = 600;
    this.canvas.height = 200;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.focus(); // ✅ focus for key events

    this.spawnObstacle();
    this.setupKeyboard();
    this.gameLoop();
  }

  setupKeyboard(): void {
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') this.jump();
      if (e.key === 'ArrowDown') this.duck();
      if (e.key.toLowerCase() === 'c') this.activatePowerUp('coffee');
      if (e.key.toLowerCase() === 'w') this.activatePowerUp('weekend');
    });
  }

  gameLoop(): void {
    if (this.gameOver || this.win) {
      this.drawEndScreen();
      cancelAnimationFrame(this.animationFrameId);
      return;
    }

    this.clearCanvas();
    this.updateCharacter();
    this.updateObstacles();
    this.checkCollision();
    this.drawCharacter();
    this.drawObstacles();
    this.drawPoints();

    if (this.points >= this.TARGET_POINTS) this.win = true;

    this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateCharacter(): void {
    if (this.character.isJumping) {
      this.character.y += this.character.velocityY;
      this.character.velocityY += this.gravity;

      if (this.character.y >= (this.character.isDucking ? 160 : 150)) {
        this.character.y = this.character.isDucking ? 160 : 150;
        this.character.isJumping = false;
        this.character.velocityY = 0;
      }
    }
  }

  updateObstacles(): void {
    this.obstacles.forEach(o => o.x -= 5 * this.speedMultiplier);

    if (this.obstacles[0] && this.obstacles[0].x + this.obstacles[0].width < 0) {
      this.obstacles.shift();
      this.points += 10;
      this.spawnObstacle();
    }
  }

  spawnObstacle(): void {
    const isFlying = Math.random() < 0.5;
    const y = isFlying ? 160 : 100;
    const height = 30;
    const width = 30;
    const types = isFlying ? ['🐛', '📅'] : ['📅', '💀', '🐞'];
    const type = types[Math.floor(Math.random() * types.length)];

    this.obstacles.push({
      x: this.canvas.width,
      y,
      width,
      height,
      type
    });
  }

  drawCharacter(): void {
    this.ctx.font = '50px Segoe UI Emoji';
    const emoji = this.character.isDucking ? '🙇‍💻' : '👩‍💻';
    this.ctx.fillText(emoji, this.character.x, this.character.y + 50);
  }

  drawObstacles(): void {
    this.ctx.font = '30px Segoe UI Emoji';
    this.obstacles.forEach(o => this.ctx.fillText(o.type, o.x, o.y + 30));
  }

  drawPoints(): void {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`ქულები: ${this.points}`, 10, 30);
    this.ctx.fillText(`საპოვენელი: ${this.TARGET_POINTS}`, 10, 50);
  }

  drawEndScreen(): void {
    const message = this.win ? '🎉 მოგებაა!' : 'თამაში დამთავრდა';
    this.ctx.fillStyle = this.win ? 'gold' : 'red';
    this.ctx.font = '40px Arial';
    this.ctx.fillText(message, 200, 100);
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`შენ გაქვს ${this.points} ქულა`, 180, 140);
  }

  jump(): void {
    if (!this.character.isJumping) {
      this.character.isJumping = true;
      this.character.velocityY = -Math.sqrt(2 * this.gravity * this.character.jumpHeight);
    }
  }

  duck(): void {
    if (!this.character.isJumping && !this.character.isDucking) {
      this.character.isDucking = true;
      this.character.height = 50;
      this.character.y = 160;
      setTimeout(() => {
        this.character.isDucking = false;
        this.character.height = 80;
        this.character.y = 130;
      }, 800);
    }
  }

  checkCollision(): void {
    if (this.powerUps.weekend.active) return;

    const box = {
      x: this.character.x,
      y: this.character.y,
      width: this.character.width,
      height: this.character.height
    };

    for (const o of this.obstacles) {
      const ob = { x: o.x, y: o.y, width: o.width, height: o.height };
      const collided =
        !(box.x > ob.x + ob.width ||
          box.x + box.width < ob.x ||
          box.y > ob.y + ob.height ||
          box.y + box.height < ob.y);

      if (collided) {
        this.gameOver = true;
        break;
      }
    }
  }

  activatePowerUp(type: 'coffee' | 'weekend'): void {
    if (this.powerUps[type].active) return;
    this.powerUps[type].active = true;
    if (type === 'coffee') this.speedMultiplier = this.powerUps.coffee.speedMultiplier;

    const timer = setTimeout(() => {
      this.powerUps[type].active = false;
      if (type === 'coffee') this.speedMultiplier = 1;
    }, this.powerUps[type].duration);
    this.powerUpTimers.push(timer);
  }

  restartGame(): void {
    this.points = 0;
    this.character.y = 130;
    this.character.isJumping = false;
    this.character.isDucking = false;
    this.character.velocityY = 0;
    this.obstacles = [];
    this.speedMultiplier = 1;
    this.gameOver = false;
    this.win = false;
    this.spawnObstacle();
    this.gameLoop();
  }
}

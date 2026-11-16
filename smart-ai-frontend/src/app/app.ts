import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AIChatComponent } from './components/ai-chat';

@Component({
  imports: [AIChatComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('smart-ai-frontend');
}

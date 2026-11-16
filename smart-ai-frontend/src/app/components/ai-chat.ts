import { Component, inject, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AIService } from '../../app/service/ai.service';

import { finalize } from 'rxjs';

@Component({
  selector: 'app-ai-chat',

  standalone: true,

  imports: [FormsModule],

  templateUrl: './ai-chat.html',
})
export class AIChatComponent {
  private aiService = inject(AIService);

  prompt = '';

  response = signal<string>('');

  loading = signal<boolean>(false);

  errorMessage = '';

  sendMessage(): void {
    if (!this.prompt.trim() || this.loading()) {
      return;
    }

    this.loading.set(true);

    this.response.set('');

    this.errorMessage = '';

    this.aiService
      .sendPrompt(this.prompt)

      .pipe(
        finalize(() => {
          this.loading.set(false);
        }),
      )

      .subscribe({
        next: (result) => {
          this.response.set(result.reply);
        },

        error: (error) => {
          this.errorMessage = 'Something went wrong. Please try again.';

          console.error(error);
        },
      });
  }
}

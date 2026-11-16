import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

export interface AIRequest {
  prompt: string;
}

export interface AIResponse {
  reply: string;
}

@Injectable({
  providedIn: 'root',
})
export class AIService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/chat';

  sendPrompt(prompt: string): Observable<AIResponse> {
    const request: AIRequest = {
      prompt: prompt,
    };

    return this.http.post<AIResponse>(this.apiUrl, request);
  }
}

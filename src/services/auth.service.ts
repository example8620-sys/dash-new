import { Injectable, signal, effect } from '@angular/core';

export interface User {
  username: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);

  constructor() {
    const storedUser = localStorage.getItem('rdygic_user');
    if (storedUser) {
      try {
        this.currentUser.set(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('rdygic_user');
      }
    }

    // Effect to sync signal with local storage
    effect(() => {
      const user = this.currentUser();
      if (user) {
        localStorage.setItem('rdygic_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('rdygic_user');
      }
    });
  }

  login(username: string, pass: string): boolean {
    // Hardcoded credentials as per requirements
    if (username === 'Shubham Kumar' && pass === 'Shubham@123') {
      this.currentUser.set({ username, name: 'Shubham Kumar' });
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser.set(null);
  }
}
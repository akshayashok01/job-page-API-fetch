import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly defaultUsername = 'akshayashok238@gmail.com';
  private readonly defaultPassword = 'admin123';
  private isAuthenticated = false;


  constructor(private router: Router) {}
  // method to authenticate credentials
  validateCredentials(username : string,password : string){
    if(username !== this.defaultUsername){
      return{valid : false,message : 'Username is wrong'};
    }
    if(password !== this.defaultPassword){
      return{valid : false,message : 'Password is wrong'};
    }
    return {valid : true,message : ''};
  }

  login(username: string, password: string): boolean {
    if (username === this.defaultUsername && password === this.defaultPassword) {
      this.isAuthenticated = true;
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || localStorage.getItem('isLoggedIn') === 'true';
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
username = 'akshayashok238@gmail.com';
password= 'admin123';
errorMessage = '';
constructor(private authService : AuthService,private router : Router){}

onSubmit():void{

  const validation = this.authService.validateCredentials(this.username,this.password);
  if(this.authService.login(this.username,this.password)){
    this.router.navigate(['/home']);
  }
  else{
    this.errorMessage = validation.message;
  }
}
}

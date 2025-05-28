import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy{
  title = 'job-angular';

  showNavbar = true;
  private routerSubsc : Subscription;

  constructor(private router : Router){
    this.routerSubsc = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.showNavbar = ! event.urlAfterRedirects.includes('/login');
      }
    });
  }

  ngOnDestroy(): void {
    if(this.routerSubsc){
      this.routerSubsc.unsubscribe();
    }
    
  }

 
}

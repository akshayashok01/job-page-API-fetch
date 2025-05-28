import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  getUsers(): Observable<any[]> {
    const users = [];
  
    for (let i = 1; i <= 36; i++) {
      users.push({
        name: `User ${i}`,
        designation: `Role ${i}`,
        rating: +(4 + Math.random()).toFixed(1),
        salary: Math.floor(Math.random() * 50) + 50,
        experience: Math.floor(Math.random() * 10),
        image: `/assets/images/${(i % 2) + 1}.jpg`
      });
    }
  
    return of(users);
  }
  
}

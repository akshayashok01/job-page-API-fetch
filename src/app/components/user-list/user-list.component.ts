import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';


interface User {
  name: string;
  designation: string;
  rating: number;
  salary: number;
  experience: number;
  image: string;
}
@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.updatePagination();
    });
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  totalPages(): number[] {
    return Array(Math.ceil(this.users.length / this.itemsPerPage)).fill(0).map((_, i) => i + 1);
  }
}

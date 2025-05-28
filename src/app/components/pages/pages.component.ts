import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-pages',
  imports: [CommonModule],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  allJobs: any[] = [];
  displayedJobs: any[] = [];
  currentPage = 1;
  pageSize = 12;

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobService.fetchJobs().subscribe(jobs => {
      this.allJobs = jobs;
      this.updateDisplayedJobs();
    });
  }

  updateDisplayedJobs() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedJobs = this.allJobs.slice(start, start + this.pageSize);
  }

  getNonNullKeys(job: any) {
    return Object.keys(job).filter(key => job[key] !== null);
  }

  totalPages(): number {
    return Math.ceil(this.allJobs.length / this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.updateDisplayedJobs();
    }
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  firstPage() {
    this.goToPage(1);
  }

  lastPage() {
    this.goToPage(this.totalPages());
  }

  pageNumbers(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }
}
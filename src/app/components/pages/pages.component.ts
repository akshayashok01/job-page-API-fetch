import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-pages',
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  allJobs: any[] = [];
  displayedJobs: any[] = [];
  currentPage = 1;
  pageSize = 9; // Changed to 9 cards per page
  maxVisiblePages = 3; // Number of pages to show around current page


  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobService.fetchJobs().subscribe(jobs => {
      // Filter and map only the required fields
      this.allJobs = jobs
        .filter(job => job.job_title && job.job_info_id) // Ensure required fields exist
        .map(job => ({
          job_title: job.job_title,
          job_info_id: job.job_info_id,
          company_name: job.company_name,
          company_address: job.company_address,
          category: job.category,
          longitude: job.longitude,
          latitude: job.latitude
        }));
      
      
      if (this.allJobs.length > 108) {
        this.allJobs = this.allJobs.slice(0, 108);
      }
      
      this.updateDisplayedJobs();
    });
  }

  updateDisplayedJobs() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedJobs = this.allJobs.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.allJobs.length / this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.updateDisplayedJobs();
      // window.scrollTo(0, 0); 
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

  getPaginationPages(): number[] {
    const total = this.totalPages();
    const current = this.currentPage;
    const pages: number[] = [];
    
  
    const start = Math.max(2, current - Math.floor(this.maxVisiblePages / 2));
    const end = Math.min(total - 1, start + this.maxVisiblePages - 1);
    
    for (let i = start; i <= end; i++) {
      if (i > 1 && i < total) {
        pages.push(i);
      }
    }
    
    return pages;
  }
}
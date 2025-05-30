import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { JoinComponent } from '../join/join.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, JoinComponent, FooterComponent],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  allJobs: any[] = [];
  displayedJobs: any[] = [];
  currentPage = 1;
  pageSize = 9;
  maxVisiblePages = 3;

  jobLocations: { [key: string]: { prefecture: string; city: string } } = {};

  constructor(private jobService: JobService, private http: HttpClient) {}

  ngOnInit() {
    this.jobService.fetchJobs().subscribe(jobs => {
      this.allJobs = jobs
        .filter(job => job.job_title && job.latitude && job.longitude)
        .slice(0, 108)
        .map(job => ({
          job_title: job.job_title,
          job_info_id: job.job_info_id,
          company_name: job.company_name,
          company_address: job.company_address,
          category: job.category,
          latitude: job.latitude,
          longitude: job.longitude
        }));

      this.updateDisplayedJobs();

      // Reverse geocode locations with caching
      this.allJobs.forEach(job => {
        const key = `${job.latitude},${job.longitude}`;
        const cached = localStorage.getItem(`loc-${key}`);
        if (cached) {
          this.jobLocations[key] = JSON.parse(cached);
        } else {
          this.getLocationFromOpenCage(job.latitude, job.longitude).then(location => {
            this.jobLocations[key] = location;
            localStorage.setItem(`loc-${key}`, JSON.stringify(location));
          });
        }
      });
    });
  }

  async getLocationFromOpenCage(lat: number, lon: number): Promise<{ prefecture: string; city: string }> {
    const apiKey = 'cfde4f02945849b4b4fd5303198d5bf4'; // 🔐 Replace with your actual OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&language=en`;

    try {
      const response: any = await this.http.get(url).toPromise();
      const components = response?.results[0]?.components;

      return {
        prefecture: components?.state || components?.province || 'Unknown Prefecture',
        city: components?.city || components?.town || components?.village || components?.hamlet || 'Unknown City'
      };
    } catch (err) {
      console.error('OpenCage API error:', err);
      return { prefecture: 'Unknown', city: 'Unknown' };
    }
  }

  getJobPrefecture(job: any): string {
    const key = `${job.latitude},${job.longitude}`;
    return this.jobLocations[key]?.prefecture || 'Loading...';
  }

  getJobCity(job: any): string {
    const key = `${job.latitude},${job.longitude}`;
    return this.jobLocations[key]?.city || 'Loading...';
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
    const start = Math.max(2, current - Math.floor(this.maxVisiblePages / 2));
    const end = Math.min(total - 1, start + this.maxVisiblePages - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
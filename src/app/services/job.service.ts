import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobService {
  private apiUrl = 'http://internal-project.nexware-global.com:9061/api/daijob/geohashing_get_job'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  fetchJobs() {
    const payload = {
      //  Replace with actual payload structure required by your API
      category: "",
      city: "",
      employment_period_id: "",
      is_landing: 1,
      keyword: "",
      latitude: 35.69258350869548,
      longitude: 139.70822675530584,
      prefecture: "",
      salary: "",
      salary_amount: "",
      work_period: 3,
    };

    return this.http.post<any>(this.apiUrl, payload).pipe(
      map(res => [...(res.success || []), ...(res.csv || [])])
    );
  }
}
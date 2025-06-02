import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly apiKey = '4fc6674d1543472a990cd6a504f4dad3'; // 🔑 Replace with your API key
  private readonly cachePrefix = 'loc-';

  constructor(private http: HttpClient) {}

  async getLocationFromGeoapify(lat: number, lon: number): Promise<{ prefecture: string; city: string }> {
    const key = `${lat},${lon}`;
    const cacheKey = `${this.cachePrefix}${key}`;

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${this.apiKey}`;

    try {
      const response: any = await this.http.get(url).toPromise();
      const props = response?.features?.[0]?.properties;

      const location = {
        prefecture: props?.state || 'Unknown Prefecture',
        city: props?.city || props?.town || props?.village || props?.hamlet || 'Unknown City'
      };

      localStorage.setItem(cacheKey, JSON.stringify(location));
      return location;
    } catch (error) {
      console.error(`Failed to fetch location for ${lat},${lon}`, error);
      return { prefecture: 'Unknown', city: 'Unknown' };
    }
  }
}
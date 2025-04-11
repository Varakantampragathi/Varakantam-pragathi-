import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = 'http://localhost:5000/api/menu';

  constructor(private http: HttpClient) { }

  getMenuItems(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addMenuItem(menuItem: any): Observable<any> {
    return this.http.post(this.baseUrl, menuItem);
  }
}

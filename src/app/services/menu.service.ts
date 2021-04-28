import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  /**
   * Get options of menu from menu.json
   * @returns Observable with the options of menu
   */
  getMenuOptions() {
    return this.http.get<Menu[]>('/assets/data/menu.json');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../models/menu';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  //Observable de menus
  menuOptions: Observable<Menu[]>;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.menuOptions = this.menuService.getMenuOptions();
  }


  logout() {
    console.log('user logout');
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }



}

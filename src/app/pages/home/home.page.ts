import { Component, OnInit } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  textHeader = 'Welcome';
  flagArrow = false;

  constructor(
    private authSvc: AuthService,
    private usersService: UsersService
  ) {
    this.getDataUser();
  }

  ngOnInit() { }

  async getDataUser() {
    this.authSvc.getCurrentuser().then((user) => {
      user.uid;
    });
  }
}
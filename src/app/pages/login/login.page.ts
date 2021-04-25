import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private authSvc: AuthService,
    private usersService: UsersService,
    private router: Router,
    private menuController: MenuController
  ) {}

  ngOnInit() {}

  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        console.log('user -> ', user);
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  ionViewDidEnter(): void {
    this.menuController.enable(false);
  }

  ionViewDidLeave(): void {
    this.menuController.enable(true);
  }
}

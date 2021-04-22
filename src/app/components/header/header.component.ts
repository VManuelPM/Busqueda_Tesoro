import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  @Input() textHeader: string;
  @Input() flagArrow: boolean;

  constructor(private authSvc: AuthService, private location:Location, private router: Router) { }

  ngOnInit() {}

  back(){
    this.location.back();
  }

}

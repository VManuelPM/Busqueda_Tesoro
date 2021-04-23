import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  @Input() textHeader: string;
  @Input() flagArrow: boolean;

  constructor(private location:Location, private router: Router) { }

  ngOnInit() {}

  back(){
    this.location.back();
  }

}

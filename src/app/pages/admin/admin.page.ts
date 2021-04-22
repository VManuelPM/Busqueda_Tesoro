import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  textHeader = "Add Game";
  flagArrow = true;

  constructor() { }

  ngOnInit() {
  }

}

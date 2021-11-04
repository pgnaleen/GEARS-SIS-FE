import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}


 const allowssidemenuitems = ['admin', 'dashoboard'];

// admin.add.info
// admin.add.user
export const ROUTES: RouteInfo[] = [
  // {}
    // { key: 'admin.add.user', path: '/useradd', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { key: 'admin.add.info', path: '/infoadd', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { key: 'admin.add', path: '/add', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/admin', title: 'Admin',  icon: 'assignment_ind', class: '' }
];

@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);// forloop
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}

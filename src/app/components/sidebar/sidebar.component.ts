import {Component, OnInit} from '@angular/core';

declare interface RouteInfo {
  key: string;
  path: string;
  title: string;
  icon: string;
  class: string;
  children?: RouteInfo[];
}

const allowMenuItems = ['admin', 'test', 'test.comp1', 'test.comp2', 'test.comp2.comp4'];

export const ROUTES: RouteInfo[] = [

  { key: 'infoadd', path: '/infoadd', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { key: 'add', path: '/add', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { key: 'admin', path: '/admin', title: 'Admin', icon: 'assignment_ind', class: ''}
  , { key: 'test', path: '/test', title: 'Test children', icon: 'notifications', class: '', children: [
      {key: 'test.comp1', path: '/test-comp1', title: 'Component 1', icon: 'dashboard', class: ''},
      {key: 'test.comp2', path: '/test-comp2', title: 'Component 2', icon: 'person', class: '', children: [
          {key: 'test.comp2.comp3', path: '/test-comp3', title: 'Component 3', icon: 'dashboard', class: ''},
          {key: 'test.comp2.comp4', path: '/test-comp4', title: 'Component 4', icon: 'person', class: ''},
        ]},
    ]
  },
];

@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => {
      if (allowMenuItems.includes(menuItem.key)) {// check whether main menu authorized, include in the list
        if (menuItem.children){// if there are children then check there permission seperately
          return this.removeUnauthorizedSubMenuItems(menuItem);
        } else {
          return menuItem;
        }
      }

    });// forloop
  }

  removeUnauthorizedSubMenuItems(menuItem: RouteInfo): RouteInfo {
    console.log(menuItem + 'menu item has children')

    menuItem.children = menuItem.children.filter(submenuItem => {
      if (allowMenuItems.includes(submenuItem.key)) {
        // if submenu also has submenus and so on
        if (submenuItem.children){// if there are children for first level submenu and so on, then check there permission seperately
          return this.removeUnauthorizedSubMenuItems(submenuItem);
        } else {
          return submenuItem;
        }
      } else { // no else path as this filter copy one list to another. as submenuitem not in the list no need to copy
      }
    });

    return menuItem;
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}

import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  snackBarConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['mat-toolbar', 'mat-warn']
  }

  constructor(public snackBar: MatSnackBar) { }

  showNotification(msg) {
    this.snackBar.open(msg, '', this.snackBarConfig);
  }
}

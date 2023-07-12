import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
title = 'Payroll'
  constructor(public dialog: MatDialog) {
    this.dialog
  }

openDialog() {
  this.dialog.open(DialogComponent);
}

}

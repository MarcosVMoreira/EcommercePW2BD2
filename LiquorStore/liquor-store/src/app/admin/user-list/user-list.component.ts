import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/model/user';
import { UserService } from 'src/service/user.service';
import { LoginService } from 'src/service/login.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[];
  p: number = 1;

  constructor(
    private userService: UserService,
    private loginService: LoginService) {
    if (!this.loginService.isAdmin) {
      this.loginService.redirect();
    }
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res => {
      this.userList = res;
    }, err => {
      console.log(err);
    });
  }
}

import { Component, OnInit } from '@angular/core';

import { User } from 'src/model/user';
import { UserService } from 'src/service/user.service';
import { LoginService } from 'src/service/login.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  userList: User[];

  constructor(
    private userService: UserService,
    private loginService: LoginService) {
    if (!this.loginService.isAdmin) {
      this.loginService.redirect();
    }
  }

  ngOnInit() {
  }

  search(name) {
    this.userService.getUsersByName(name).subscribe(res => {
      this.userList = res;
    }, err => {
      console.log(err);
    });
  }
}

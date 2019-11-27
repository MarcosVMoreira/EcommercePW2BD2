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
    private userApi: UserService,
    private login: LoginService) {
    if (!this.login.isAdmin) {
      this.login.redirect();
    }
  }

  ngOnInit() {
  }

  search(name) {
    this.userApi.getUsersByName(name).subscribe(res => {
      this.userList = res;
    }, err => {
      console.log(err);
    });
  }
}

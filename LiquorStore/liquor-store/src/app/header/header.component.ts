import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private login: LoginService) { }

  ngOnInit() {
  }

  logout() {
    this.login.userLogout();
  }

}

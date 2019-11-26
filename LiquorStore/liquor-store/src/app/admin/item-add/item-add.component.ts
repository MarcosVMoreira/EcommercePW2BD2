import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  constructor(
    private login: LoginService,
    private router: Router) {
    if (!this.login.isAdmin) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
  }

}

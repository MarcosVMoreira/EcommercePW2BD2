import { Component, OnInit } from "@angular/core";

import { LoginService } from "src/service/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.loginService.userLogout();
  }

  search(name) {
    if (name != "") this.router.navigateByUrl(`busca/${name}`);
  }

  getSection() {
    return this.router.url.toString().split("/")[1] === "busca" ? true : false;
  }
}

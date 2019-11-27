import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

import { ApiService } from 'src/service/api.service';
import { LoginService } from 'src/service/login.service';
import { Product } from 'src/model/product';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css'],
  animations: [
    trigger('animate', [
      state('initial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('initial=>final', animate('500ms ease-in')),
    ]),
  ]
})
export class PurchasesComponent implements OnInit {
  currentState: string = 'initial';
  productList: Product[];
  image: SafeResourceUrl;

  constructor(
    private _api: ApiService,
    private router: Router,
    private login: LoginService,
    private sanitizer: DomSanitizer) {
    if (!this.login.isLogged) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
    if (this.currentState = "initial") {
      setTimeout(() => {
        this.currentState = 'final';
      });
    }

    this._api.getUserProducts(this.login.user[0].usu_id).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        res[i].prod_imagem = this.sanitizer.bypassSecurityTrustUrl(res[i].prod_imagem);
      }
      this.productList = res;
    }, err => {
      console.log(err);
    });
  }
}

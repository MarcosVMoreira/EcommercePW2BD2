import { Component, OnInit } from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";

import { Product } from "src/model/product";
import { ProductService } from "src/service/product.service";
import { LoginService } from "src/service/login.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  productList: Product[];
  image: SafeResourceUrl;
  name: string;

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.params["nomeProduto"];
    this.productService.getProductsByName(this.name).subscribe(
      res => {
        for (let i = 0; i < res.length; i++) {
          res[i].prod_imagem = this.sanitizer.bypassSecurityTrustUrl(
            res[i].prod_imagem
          );
        }
        this.productList = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  search(name) {
    this.router.navigateByUrl(`/busca/${name}`);
    this.name = name;
    this.productService.getProductsByName(name).subscribe(
      res => {
        for (let i = 0; i < res.length; i++) {
          res[i].prod_imagem = this.sanitizer.bypassSecurityTrustUrl(
            res[i].prod_imagem
          );
        }
        this.productList = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { Product } from '../../model/product';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit {

  constructor(private productService:ProductService, private router:Router){}
  products:Product[]

  ngOnInit(): void {
    this.productService.getProduct().subscribe((data:Product[])=>{
      this.products=data;
    })
  }
  onEdit(product:Product)
  {
    let productJson:string=JSON.stringify(product);
    this.router.navigateByUrl('/inventory/edit/'+productJson)
    alert(product.productName)
  }
  onDelete(id:number)
  {
    this.productService.deleteProduct(id).subscribe();
   // window.location.reload();
  }

}

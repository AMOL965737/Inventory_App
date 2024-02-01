import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  productForm: FormGroup;
  isNewProduct: boolean = true;

  constructor(private fb:FormBuilder , private ps:ProductService, 
    private ac:ActivatedRoute){ }

  ngOnInit(): void {
    this.initializeForm();
    this.checkRouteParams();
  }
  
  initializeForm(){
    this.productForm=this.fb.group(
      {
        productId:[],
        productName:[],
        productPrice:[],
        productColor:[],
        availableQuantity:[],
        supplier:this.fb.group(
          {
            supplierId:[],
            supplierName:[],
            supplierEmail:[],
            supplierAddress:[],
            pincode:[]
          })
      });
  }
  checkRouteParams() {
    this.ac.paramMap.subscribe(params => {
      const productJson = params.get('data');
      if (productJson) {
        const editDetails: Product = JSON.parse(productJson);
        this.productForm.patchValue(editDetails);
        this.isNewProduct = false;
      }
    });
  }

  onSubmit() {
    if (this.isNewProduct) {
      this.ps.saveProduct(this.productForm.value).subscribe();
      alert('Product Data Created Successfully!');
    } else {
      this.ps.updateProduct(this.productForm.value).subscribe();
      alert('Product Details Updated Successfully');
    }
    this.productForm.reset();
    window.location.reload(); 
  }

  // patchEditValue()
  // {
  //   if(this.flag != null)
  //   {
  //   this.ac.paramMap.subscribe(
  //     param=>{
  //       let productJson:string= param.get('data')
  //       let editDetails:Product= JSON.parse(productJson);
  //       this.productForm.patchValue(editDetails);
  //       this.flag=false;
  //     }
    
  //   )
  //   }
  // }

}

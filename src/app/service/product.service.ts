import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  saveProduct(product:Product)
  {
    return this.http.post('http://localhost:9091/save_product', product)
  }
  getProduct()
  {
    return this.http.get('http://localhost:9091/view_products')
  }
  updateProduct(product:Product)
  {
    return this.http.put('http://localhost:9091/update_product/'+product.productId, product)
  }
  deleteProduct(id:number)
  {
    return this.http.delete('http://localhost:9091/delete_product/'+id)
  }
}

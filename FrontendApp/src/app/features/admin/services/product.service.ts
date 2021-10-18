import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { Product } from '../../../shared/models/product.model';
import {share} from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProductService {

  $products = new BehaviorSubject<Product[]>([]);
  $productDetails = new BehaviorSubject<Product>(undefined);

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    const $req = this.http.get<Product[]>(`${environment.apiUrl}/product`);
    $req.pipe(share())
      .subscribe(response => {
        if (response?.length) {
          this.$products.next(response);
        }
      });
    return $req;
  }

  getProductDetails(id: string): Observable<Product> {
    const $req = this.http.get<Product>(`${environment.apiUrl}/product/${id}`);
    $req.pipe(share())
      .subscribe(response => {
        if (response) {
          this.$productDetails.next(response);
        }
      });
    return $req;
  }

  createProduct(payload: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/product`, payload);
  }

  updateProduct(id: string, payload: Product): Observable<Product> {
    return this.http.patch<Product>(`${environment.apiUrl}/product/${id}`, payload);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${environment.apiUrl}/product/${id}`);
  }
}

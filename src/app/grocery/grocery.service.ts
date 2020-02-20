import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { Product } from "./models/product";

const GET_GROCERY = "http://localhost:3000/grocery";
const PATCH_GROCERY = "http://localhost:3000/grocery/";

@Injectable({
  providedIn: "root"
})
export class GroceryService {
  constructor(private http: HttpClient) {}

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(GET_GROCERY);
  }

  updateProduct(paramsObject): Observable<Product> {
    const params = new HttpParams({
      fromObject: {
        ...paramsObject
      }
    });
    return this.http.patch<Product>(`${PATCH_GROCERY}${paramsObject.id}`, params);
  }

}

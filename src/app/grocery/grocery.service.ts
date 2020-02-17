import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

const GET_GROCERY = "http://localhost:3000/grocery";

@Injectable({
  providedIn: "root"
})
export class GroceryService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(GET_GROCERY);
  }
}

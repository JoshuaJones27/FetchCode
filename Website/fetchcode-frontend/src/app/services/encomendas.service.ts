import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncomendasService {
  startUpdateLast(purchaseDetail: NgForm) {
    throw new Error('Method not implemented.');
  }
  modeUpdate: boolean;
  purchases: any;

  constructor(private http: HttpClient) { }

  GetAllEncomendas() : Observable<unknown>{
    return this.http.get<unknown>("http://localhost:3000/v1/encomenda")
  }

  CreatePurchase(body) {
    return this.http.post("http://localhost:3000/v1/encomenda", body)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from './purchase';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor() { }

  purchases: Purchase[] = [];
  modeUpdate: boolean = false;


  createPurchase(purchaseDetail: Purchase) {
    this.purchases.push(purchaseDetail);
    console.log(this.purchases);
  }

  startUpdateLast(purchaseDetail : NgForm){
    this.modeUpdate = true;
    const lastPurchase = this.purchases[this.purchases.length - 1];

    purchaseDetail.form.patchValue({
      fullName: lastPurchase.fullName,
      email: lastPurchase.email,
      address: lastPurchase.address,
      city: lastPurchase.city,
      state: lastPurchase.state,
      postalCode: lastPurchase.postalCode,
      cardName: lastPurchase.cardName,
      creditCardNumber: lastPurchase.creditCardNumber,
      expirationMonth: lastPurchase.expirationMonth,
      expirationYear: lastPurchase.expirationYear,
      cvv: lastPurchase.cvv,
    })
  }

  updateLast(purchaseDetail : NgForm){
    this.purchases[this.purchases.length - 1] = purchaseDetail.form.value;
    this.modeUpdate = false;
    purchaseDetail.reset();
  }

  cancelUpdate(purchaseDetail : NgForm){
    this.modeUpdate = false;
    purchaseDetail.reset();
  }

  deleteLastPurchase(){
    this.purchases.pop();
  }
}

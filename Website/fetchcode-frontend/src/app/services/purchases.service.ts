import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Checkout } from './checkout';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

  checkouts: Checkout[] = [];
  modeUpdate: boolean = false;


  createPurchase(checkoutDetail: Checkout) {
    this.checkouts.push(checkoutDetail);
    console.log(this.checkouts);
  }

  startUpdateLast(checkoutDetail : NgForm){
    this.modeUpdate = true;
    const lastCheckout = this.checkouts[this.checkouts.length - 1];

    checkoutDetail.form.patchValue({
      fullName: lastCheckout.fullName,
      email: lastCheckout.email,
      address: lastCheckout.address,
      city: lastCheckout.city,
      state: lastCheckout.state,
      postalCode: lastCheckout.postalCode,
      cardName: lastCheckout.cardName,
      creditCardNumber: lastCheckout.creditCardNumber,
      expirationMonth: lastCheckout.expirationMonth,
      expirationYear: lastCheckout.expirationYear,
      cvv: lastCheckout.cvv,
    })
  }

  updateLast(checkoutDetail : NgForm){
    this.checkouts[this.checkouts.length - 1] = checkoutDetail.form.value;
    this.modeUpdate = false;
    checkoutDetail.reset();
  }

  cancelUpdate(checkoutDetail : NgForm){
    this.modeUpdate = false;
    checkoutDetail.reset();
  }

  deleteLastCheckout(){
    this.checkouts.pop();
  }
}

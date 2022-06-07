import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Checkout } from '../services/checkout';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    // this.GetAllEncomendas()
  }

  // GetAllEncomendas() {
  //   this.checkoutService.GetAllEncomendas().subscribe(encomendas => console.log(encomendas));
  // }

  modeUpdate: boolean = false;
  closeModal: boolean = true;

  onSubmit(checkoutDetail: NgForm) {
    this.checkoutService.createCheckout(checkoutDetail.form.value)
    this.modeUpdate = this.checkoutService.modeUpdate;
    checkoutDetail.reset();
  }

  startUpdateLast(checkoutDetail : NgForm){
    if(this.checkoutService.checkouts.length){
      this.checkoutService.startUpdateLast(checkoutDetail);
      this.modeUpdate = this.checkoutService.modeUpdate;
    } else {
      this.closeModal = false;
    }
  }

  updateLast(checkoutDetail : NgForm){
    this.checkoutService.updateLast(checkoutDetail);
    this.modeUpdate = this.checkoutService.modeUpdate;
  }

  cancelUpdate(checkoutDetail : NgForm){
    this.checkoutService.cancelUpdate(checkoutDetail);
    this.modeUpdate = this.checkoutService.modeUpdate;
  }

  deleteLastCheckout(){
    if(this.checkoutService.checkouts.length){
      this.checkoutService.deleteLastCheckout();
    } else {
      this.closeModal = false;
    }
  }

  closeWarning(){
    this.closeModal = true;
  }
}

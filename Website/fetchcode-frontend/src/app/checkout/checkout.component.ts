import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private CheckoutService: CheckoutService) { }

  ngOnInit(): void {
    this.GetAllCheckouts()
  }

  GetAllCheckouts() {
    this.CheckoutService.GetAllCheckouts().subscribe(checkouts => console.log(checkouts));
  }

  modeUpdate: boolean = false;
  closeModal: boolean = true;

  onSubmit(checkoutDetail: NgForm) {
    this.CheckoutService.createCheckout(checkoutDetail.form.value)
    this.modeUpdate = this.CheckoutService.modeUpdate;
    checkoutDetail.reset();
  }

  startUpdateLast(checkoutDetail : NgForm){
    if(this.CheckoutService.checkouts.length){
      this.CheckoutService.startUpdateLast(checkoutDetail);
      this.modeUpdate = this.CheckoutService.modeUpdate;
    } else {
      this.closeModal = false;
    }
  }

  updateLast(checkoutDetail : NgForm){
    this.CheckoutService.updateLast(checkoutDetail);
    this.modeUpdate = this.CheckoutService.modeUpdate;
  }

  cancelUpdate(checkoutDetail : NgForm){
    this.CheckoutService.cancelUpdate(checkoutDetail);
    this.modeUpdate = this.CheckoutService.modeUpdate;
  }

  deleteLastCheckout(){
    if(this.CheckoutService.checkouts.length){
      this.CheckoutService.deleteLastCheckout();
    } else {
      this.closeModal = false;
    }
  }

  closeWarning(){
    this.closeModal = true;
  }
}

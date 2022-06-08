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
  Checkouts;
  ngOnInit(): void {
    this.GetAllCheckouts()
  }

  GetAllCheckouts() {
    this.CheckoutService.GetAllCheckouts().subscribe(checkouts => this.Checkouts = checkouts);
  }

  modeUpdate: boolean = false;
  closeModal: boolean = true;

  onSubmit(checkoutDetail: NgForm) {
    this.CheckoutService.PostCheckout(checkoutDetail.form.value).subscribe(
      data => console.log(data),
      error => console.log(error)     );
  }

  updateLast(checkoutDetail : NgForm){
    this.CheckoutService.PutCheckoutLast(this.Checkouts[this.Checkouts.length - 1].id, checkoutDetail.form.value).subscribe(
      data => console.log(data),
      error => console.log(error)     );
    this.modeUpdate = this.CheckoutService.modeUpdate;
  }

  cancelUpdate(checkoutDetail : NgForm){
    this.CheckoutService.cancelUpdate(checkoutDetail);
    this.modeUpdate = this.CheckoutService.modeUpdate;
  }

  deleteLastCheckout(){
    this.CheckoutService.DeleteCheckoutID(this.Checkouts[this.Checkouts.length - 1].id).subscribe(
      data => console.log(data),
      error => console.log(error)     );
  }

  closeWarning(){
    this.closeModal = true;
  }
}

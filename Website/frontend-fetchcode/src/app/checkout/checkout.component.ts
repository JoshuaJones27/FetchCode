import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Purchase } from '../services/purchase';
import { PurchasesService } from '../services/purchases.service';
import { EncomendasService } from '../services/encomendas.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  purchaseService: any;

  constructor(private EncomendasService: EncomendasService) { }

  ngOnInit(): void {
    this.GetAllEncomendas()
  }

  GetAllEncomendas() {
    this.EncomendasService.GetAllEncomendas().subscribe(encomendas => console.log(encomendas));
  }

  modeUpdate: boolean = false;
  closeModal: boolean = true;

  onSubmit(purchaseDetail: NgForm) {
    this.EncomendasService.CreatePurchase(purchaseDetail.form.value)
    this.modeUpdate = this.EncomendasService.modeUpdate;
    purchaseDetail.reset();
  }

  startUpdateLast(purchaseDetail : NgForm){
    if(this.EncomendasService.purchases.length){
      this.EncomendasService.startUpdateLast(purchaseDetail);
      this.modeUpdate = this.purchaseService.modeUpdate;
    } else {
      this.closeModal = false;
    }
  }

  updateLast(purchaseDetail : NgForm){
    this.purchaseService.updateLast(purchaseDetail);
    this.modeUpdate = this.purchaseService.modeUpdate;
  }

  cancelUpdate(purchaseDetail : NgForm){
    this.purchaseService.cancelUpdate(purchaseDetail);
    this.modeUpdate = this.purchaseService.modeUpdate;
  }

  deleteLastPurchase(){
    if(this.purchaseService.purchases.length){
      this.purchaseService.deleteLastPurchase();
    } else {
      this.closeModal = false;
    }
  }

  closeWarning(){
    this.closeModal = true;
  }
}

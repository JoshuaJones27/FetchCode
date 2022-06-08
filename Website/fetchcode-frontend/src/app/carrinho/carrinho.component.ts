import { Component, OnInit } from '@angular/core';
import { EncomendasService } from '../services/encomendas.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  constructor(private EncomendasService: EncomendasService) { }

  ngOnInit(): void {
    // this.GetAllEncomendas()
  }

  // GetAllEncomendas() {
  //   this.EncomendasService.GetAllEncomendas().subscribe(encomendas => console.log(encomendas));
  // }

}

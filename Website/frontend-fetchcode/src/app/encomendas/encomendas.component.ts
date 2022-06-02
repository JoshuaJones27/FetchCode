import { Component, OnInit } from '@angular/core';
import { EncomendasService } from '../services/encomendas.service';

@Component({
  selector: 'app-encomendas',
  templateUrl: './encomendas.component.html',
  styleUrls: ['./encomendas.component.css']
})
export class EncomendasComponent implements OnInit {

  constructor(private EncomendasService: EncomendasService) { }

  ngOnInit(): void {
    this.GetAllEncomendas()
  }

  GetAllEncomendas() {
    this.EncomendasService.GetAllEncomendas().subscribe(encomendas => console.log(encomendas));
  }
}

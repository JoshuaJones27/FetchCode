import { Component, OnInit } from '@angular/core';
import { TesteService } from '../services/teste.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {

  constructor(private TesteService: TesteService) { }

  ngOnInit(): void {
    this.GetAllTestes()
  }

  GetAllTestes(){
    this.TesteService.GetAllTestes().subscribe(item => console.log(item))
  }
}

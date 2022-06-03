import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  constructor(private userService: UserDataService) { }

  ngOnInit(): void {
  }

  userInserted: boolean = false;

  onSubmit(form: NgForm){
    this.userService.setUserProfile(form.value);
    this.userInserted = true;
    form.reset();
    this.readUserProfile(form);
  }

  readUserProfile(dadosForm : NgForm){
    const user = this.userService.getUserProfile();
    dadosForm.setValue(user);
  }

  updateUser(dadosForm: NgForm){
    this.userService.updateUserProfile(dadosForm);
  }

  deleteUser(){
    this.userService.deleteUser();
    this.userInserted = false;
  }
}

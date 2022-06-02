import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  showUserModal: boolean = false;
  userProfile
  user: boolean = false;

  selectOnlyThis(id: number) {
    const checkBox = Array.from(document.getElementsByClassName('check') as HTMLCollectionOf<HTMLInputElement>);

    checkBox.forEach(element => {
      element.checked = false;
    });

    checkBox[id].checked = true;
  }

  onSubmit(profileDetail: NgForm){
    this.profileService.setUserProfile(profileDetail.form.value)
    profileDetail.reset();
    this.userProfile = profileDetail.form.value;
    this.user = true;
  }

  updateUser(profileDetail: NgForm){
    this.profileService.updateUserProfile(profileDetail.form.value);
  }

  showUser(){
    this.showUserModal = true;
    this.userProfile = this.profileService.getUserProfile();
  }

  deleteUser(profileDetail: NgForm){
    this.profileService.deleteUser();
    profileDetail.reset();
    this.user = false;
  }

  closeWarning(){
    this.showUserModal = false;
  }
}

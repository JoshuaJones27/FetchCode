import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userProfile: User

  constructor() { }

  getUserProfile() {
    return this.userProfile;
  }

  setUserProfile(userProfile: User) {
    this.userProfile = userProfile;
  }

  deleteUser() {
    this.userProfile = null;
  }

  updateUserProfile(dadosForm) {
    this.userProfile.Email = dadosForm.Email;
    this.userProfile.FirstName = dadosForm.FirstName;
    this.userProfile.LastName = dadosForm.LastName;
    this.userProfile.Password = dadosForm.Password;
    this.userProfile.PhoneNumber = dadosForm.PhoneNumber;
    this.userProfile.Gender = dadosForm.Gender;
    this.userProfile.DOB = dadosForm.DOB;
    this.userProfile.Address = dadosForm.Address;
    this.userProfile.Country = dadosForm.Country;
    this.userProfile.City = dadosForm.City;
    this.userProfile.PostalCode = dadosForm.PostalCode;
  }
}

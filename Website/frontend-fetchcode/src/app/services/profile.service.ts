import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  userProfile: Profile

  getUserProfile(){
    return this.userProfile;
  }

  setUserProfile(profile: Profile) {
    this.userProfile = profile;
  }

  updateUserProfile(profile: Profile){
    this.userProfile = {
      corFav: profile.corFav ? profile.corFav : this.userProfile.corFav,
      idade: profile.idade  ? profile.idade : this.userProfile.idade,
      genero: profile.genero  ? profile.genero : this.userProfile.genero,
      estacaoFav: profile.estacaoFav  ? profile.estacaoFav : this.userProfile.estacaoFav,
      roupaFav: profile.roupaFav  ? profile.roupaFav : this.userProfile.roupaFav,
      marcaFav: profile.marcaFav  ? profile.marcaFav : this.userProfile.marcaFav,
    };
  }

  deleteUser(){
    this.userProfile = null;
  }
}

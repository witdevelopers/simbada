import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings } from '../app-setting';
import { AppStorageService } from '../services/app-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private key: string = 'token'
  private userKey: string = 'user'
  private apiBaseUrl = Settings.apiUrl + 'Account/'

  constructor(private http: HttpClient, private storage: AppStorageService) { }

  login(address, signature) {
    return new Promise((resolve, reject) => {

      this.http.get(this.apiBaseUrl + "Login?address=" + address + "&signature=" + signature).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  register(sponsorAddress, transactionHash) {
    return new Promise((resolve, reject) => {

      let payload = { sponsorAddress: sponsorAddress, transactionHash: transactionHash };
      this.http.post(this.apiBaseUrl + "Register", payload).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  isSponsorValid(sponsorId) {
    return new Promise((resolve, reject) => {

      this.http.get(this.apiBaseUrl + "IsSponsorValid?sponsorId=" + sponsorId).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  getPackages() {
    return new Promise((resolve, reject) => {

      this.http.get(this.apiBaseUrl + "GetPackages").subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  get isLoggedIn(): Boolean {
    return this.storage.isSet(this.key)
  }

  get isAdmin(): Boolean {
    return (this.user.userType == 'Admin')
  }

  logout() {
    this.storage.remove(this.key)
    this.storage.remove(this.userKey)
  }


  get user(): userDetails {
    var usr = this.storage.getObject<userDetails>(this.userKey)
    if (usr) {
      return usr;
    }
    else {
      var empty: userDetails = {
        id: 0, name: '', userId: '', contact: '', userType: '', token: ''
      }
      return (empty);
    }
  }
}


export interface userDetails {
  id: number,
  userId: string
  name: String,
  contact: string,
  userType: string
  token: string
}


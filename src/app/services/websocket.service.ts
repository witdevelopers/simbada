import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiUrl } from 'src/app/services/games/api-constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  wsToken: any;
  constructor(private http: HttpClient, private auth: AuthService) {

  }

  public getWsToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      const payload = { 'UserId': this.auth.user.userId, 'UserType': this.auth.user.userType }
      this.http.post<any>(ApiUrl.account.getWsToken, payload).subscribe(
        {
          next: (response) => {
            //console.log("resp", response)
            if (response) {
              if (response.status && response.data != null && response.data != undefined && response.data != "") {
                //console.log("resp2", response)
                this.wsToken = response.data;
                resolve(this.wsToken);
              }
              else {
                reject("Unable to get token!");
              }
            }
            reject("Unable to get token!");
          },
          error: (error) => {
            reject("Unable to get token!");
          }
        })
    });
  }

  public async getWebsocket(relativeUrl: string, urlParams: string = ""): Promise<any> {
    //console.log(urlParams.charAt(0));
    if (urlParams != null && urlParams != undefined && urlParams != "" && urlParams.charAt(0)!="&") {
      urlParams = "&" + urlParams;
    }
    if (this.wsToken == null || this.wsToken == undefined || this.wsToken == "") {
      await this.getWsToken();
      return this.getWebsocket(relativeUrl, urlParams);
    }
    else {
      return new WebSocket(ApiUrl.wsUrl + relativeUrl + "?_token=" + this.wsToken + urlParams);
    }
  }
}

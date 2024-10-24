import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Settings } from '../app-setting';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiBaseUrl: string = Settings.apiUrl + 'Account/';
  public routes = [];

  public companyDetails: any;
  public packages: any[] = []
  

  constructor(private http: HttpClient) { }

  async getCompanyDetails() {
    if (!this.companyDetails) {
      let result = await firstValueFrom(this.http.get(this.apiBaseUrl + 'CompanyDetails'));
       console.log(result)
      this.companyDetails = result["data"]["table"][0];
      this.packages = result["data"]["table1"];
       console.log(this.companyDetails)
    }
    return this.companyDetails;
  }

}

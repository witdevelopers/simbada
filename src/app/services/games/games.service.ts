import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiUrl } from './api-constants';
import { BetModel } from '../../games/models/bet.model';


@Injectable({
  providedIn: 'root'
})
export class GamesService {
  url=ApiUrl.game;
  constructor(private http: HttpClient) { }

  current(){
      return this.http.get<any>(this.url.current)
  }

  userDetails(){
    return this.http.get<any>(this.url.userDetails)
  }


  addOrder(model:BetModel){
    console.log("Data of Model", model);
    return this.http.post<any>(this.url.addOrder,model);
  }

  periodWinHistory(pageNo:number,pageSize:number){
    return this.http.get<any>(this.url.periodHistory+"?pageNo="+pageNo+"&pageSize="+pageSize)
  }

  getBetOrders(pageNo:number,pageSize:number){
    
    return this.http.get<any>(ApiUrl.game.getOrders+"?pageNo="+pageNo+"&pageSize="+pageSize)
  }

  getPeriodDetails(periodNo:string){
    return this.http.get(ApiUrl.game.getPeriodDetails+"?periodNo="+periodNo)
  }

  public getPassbook(pageNo:number=1,pageSize:number=10){
    return this.http.get<any>(ApiUrl.game.passbook+"?pageNo="+pageNo+"&pageSize="+pageSize)
  }
}






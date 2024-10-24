import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings } from '../../app-setting';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiBaseUrl = Settings.apiUrl + 'UserHome/'
  
  

  constructor(private http: HttpClient) { }

  dashboard() {
    return new Promise((resolve, reject) => {

      this.http.get(this.apiBaseUrl + "DashboardDetails").subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  mine() {
    return new Promise((resolve, reject) => {

      this.http.get(this.apiBaseUrl + "Mine").subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  directs() {
    return new Promise((resolve, reject) => {

      this.http.get(this.apiBaseUrl + "DirectDetails").subscribe((res: any) => {
        resolve(res);
      });
    });
  }
  
  levelIncome() {
    return new Promise((resolve, reject) => {

      this.http.get(this.apiBaseUrl + "GetLevelIncome").subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  POIIncome(){
    return new Promise((resolve, reject) => {

      this.http.get(this.apiBaseUrl + "GetPOIIncome").subscribe((res: any) => {
        resolve(res);
      });
    });

  }
  
  VIPIncome(){
    return new Promise((resolve, reject) => {

      this.http.get(this.apiBaseUrl + "GetVIPIncome").subscribe((res: any) => {
        resolve(res);
      });
    });

  }
  
  BoardIncome(){
    return new Promise((resolve,rejects)=>{

      this.http.get(this.apiBaseUrl + "GetBoardIncome").subscribe((res: any) => {
        resolve(res);
      });
    });
  }
  
  EORIncome(){
    return new Promise((resolve,rejects)=>{

      this.http.get(this.apiBaseUrl + "GetEORIncome").subscribe((res: any) => {
        resolve(res);
      });
    });
  }
  
  MiningIncome(){
    return new Promise((resolve,rejects)=>{

      this.http.get(this.apiBaseUrl + "GetMiningIncome").subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  VipPoolDetails(){
    return new Promise((resolve,rejects)=>{

      this.http.get(this.apiBaseUrl + "GetVipPoolDetails").subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  VipQualifiers(){
    return new Promise((resolve,rejects)=>{

      this.http.get(this.apiBaseUrl + "GetVIPQualifiers").subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  getPrizePools(cycleId: number=0){
    return new Promise((resolve,rejects)=>{

      this.http.get(this.apiBaseUrl + "GetPrizePools?cycleId="+cycleId).subscribe((res: any) => {
        resolve(res);
      });
    });
  }
  
  BoardPools(){
    return new Promise((resolve,rejects)=>{

      this.http.get(this.apiBaseUrl + "GetBoardPools").subscribe((res: any) => {
        resolve(res);
      });
    });
  }


  BoardEntries(poolId:any){

    return new Promise((resolve,rejects)=>{
      // let poolId = this.BoardEntries.controls.poolId.value;
      this.http.get(this.apiBaseUrl + "GetBoardEntries?poolId=" +poolId).subscribe((res:any)=>{
        resolve(res)
        // resolve(poolId);
        // console.log('poolId:', poolId);
        
      })
    })
  }

  BoardCount(entryId:any,poolId:any){
    console.log("board count request", entryId, poolId)
    return new Promise((resolve,rejects)=>{
      this.http.get(this.apiBaseUrl + "GetBoardCount?entryId=" + entryId + "&poolId=" + poolId).subscribe((res:any)=>{
        resolve(res);
        // console.log('entryId:', entryId, 'poolId:', poolId);
      })
    })
  }
  
  TokenBuyHistory(){
    return new Promise((resolve,rejects)=>{

      this.http.get(this.apiBaseUrl + "GetTokenBuyHistory").subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  TokenSellHistory(){
    return new Promise((resolve,rejects)=>{

      this.http.get(this.apiBaseUrl + "GetTokenSellHistory").subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  IncomeWithdawalHistory(){
    return new Promise((resolve,rejects)=>{

      this.http.get(this.apiBaseUrl + "GetIncomeWithdrawal").subscribe((res: any) => {
        resolve(res);
      });
    });
  }

}

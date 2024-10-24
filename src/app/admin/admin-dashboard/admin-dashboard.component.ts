import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiUrl } from 'src/app/services/games/api-constants';
import { WebsocketService } from 'src/app/services/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  socket: WebSocket;

  betInfo: any = [];
  totalBetAmount:string='0';

  details: any;
  constructor(private ws: WebsocketService, private http: HttpClient, private auth: AuthService
  ) {
  }
  async getBetInfo() {

    this.socket = await this.ws.getWebsocket("Dashboard/WsCurrentPeriodBetInfo");
    // this.socket.onopen = function (event:any) {
    //   console.log("open", event);
    // };
    // this.socket.onclose = function (event:any) {
    //   console.log("close", event);
    // };
    // this.socket.onerror = function (event:any) {
    //   console.log("error", event);
    // }
    var that = this;
    this.socket.onmessage = function (event: any) {

      var response = JSON.parse(event.data)
      that.bindBetInfo(response);
    };
  }

  bindBetInfo(response:any){
    if (response.status) {
      this.betInfo = [];
      response.data.list.forEach((element: any) => {
        var obj = {
          Number: element.number,
          Color1: element.color1,
          Color2: element.color2,
          BetOnNumber: element.betOnNumber,
          BetOnColor1: element.betOnColor1,
          BetOnColor2: element.betOnColor2,
          PayoutOnNumber: element.payoutOnNumber,
          PayoutOnColor1: element.payoutOnColor1,
          PayoutOnColor2: element.payoutOnColor2,
          TotalPayoutAmount: element.totalPayoutAmount,
          IsPossibleWinner: element.isPossibleWinner == '1' ? 'row-possible-winner' : (element.isPossibleWinner == '2' ? 'row-confirmed-winner' : '')
        }
        this.betInfo.push(obj);
      });
      this.totalBetAmount=response.data.totalBetAmount;
    }
  }
  async ngOnInit() {

    this.getBetInfo();
    this.getDetails();
  }

  ngOnDestroy() {
    this.closeWebsocket();
  }

  closeWebsocket() {
    if(this.socket)
    this.socket.close(1000, "Closing from client");
  }

  ForceWin(number:string)
  {
    const payload={'number':number,'adminId':this.auth.user.id}
    
    var subscription = this.http.post<any>(ApiUrl.adminDashboard.forceToWin, payload);

    subscription.subscribe((response)=>{
      if(response.success)
      {
        Swal.fire({
          icon: "success",
          title: response.message
        })
      }
      else
      {
        Swal.fire({
          icon: "error",
          title: response.message
        })
      }
    });
  }

  refresh(){
    if(this.socket)
    {
      this.socket.send("Refresh");
    }
  }

  
  getDetails() {
    var subscription = this.http.get<any>(ApiUrl.apiUrl + 'Dashboard/getAdminDashboardDetails');

    subscription.subscribe((response) => {
      if (response.success) {
        this.details = response.data[0];
        console.log(this.details)
      }
    });
  }
}

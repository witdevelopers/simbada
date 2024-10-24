import { HttpHeaders, HttpParams } from "@angular/common/http"
import { Settings } from '../../app-setting';
import { HttpClient } from '@angular/common/http';
export class ApiUrl {
    constructor(private http: HttpClient) {
    }
    public static apiUrl: string = Settings.apiUrl

    public static wsUrl: string = Settings.wsUrl

    public static adminDashboard = class {
        public static currentPeriodBetInfo = ApiUrl.apiUrl + ""
        public static forceToWin = ApiUrl.apiUrl + "Dashboard/ForceWin"

    }

    public static account=class  {
        private static base=ApiUrl.apiUrl+"account/"

        public static login:string=this.base+"login"

        public static RegistrationOtp:string=this.base+"sendRegistrationOtp"
    
        public static isValidMobile:string=this.base+"isValidMobile"
    
        public static isValidSponsor:string=this.base+"isValidSponsor"
    
        public static register:string=this.base+"register"
        
        public static getWsToken=this.base+"getWsToken";

        public static getUser=this.base+"getUser"
    }

    public static game = class {
        private static base = ApiUrl.apiUrl + "games/"

        public static current = this.base + "current"

        public static userDetails = this.base + "userDetails"

        public static addOrder = this.base + "addOrder"

        public static periodHistory = this.base + "periodWinHistory"

        public static getOrders = this.base + "getUserAllOrders"

        public static getPeriodDetails = this.base + "getPeriodDetails"
        
        public static passbook=this.base+"passbook"
    }

    public static SpinGame = class {
        private static base = ApiUrl.apiUrl + "Games/SpinGame/"

        public static addOrder = this.base + "PlaceBet"

        public static getOrders = this.base + "GetAllBets"

        public static getBalance = this.base+"GetBalance"
    }

}


export interface ApiResponse {
    status: boolean,
    message: string,
    data: any
}

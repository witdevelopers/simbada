import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Settings } from 'src/app/app-setting';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AdminLayoutComponent implements OnInit {

  appName:string="";

  constructor(public auth: AuthService, private router: Router) {
     this.appName=Settings.AppName;
  }

  ngOnInit(): void {
    let node = document.createElement('script');
    node.src = "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js";
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  logout() {
    sessionStorage.removeItem("address");
    sessionStorage.removeItem("memberId");
    this.router.navigate(['/auth/login']);
  }

  collapse(){
    if(document.body.clientWidth<600)
    {
      document.getElementById("btnToggler")?.click();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Settings } from 'src/app/app-setting';

@Component({
  selector: 'app-breakingnews',
  templateUrl: './breakingnews.component.html',
  styleUrls: ['./breakingnews.component.css']
})
export class BreakingnewsComponent implements OnInit {

  imageInfo : any[]=[]  

  currentIndex = 0;

  constructor(private api: UserService,private router: Router) { }

  ngOnInit(): void {
  this.showSlides()
  this.fetchImage()
  }

  async fetchImage(){
    let table = ((await this.api.dashboard()) as any).data.table1;

    table.forEach(row => {
      row.filePath = (row.filePath as string).replace('../', Settings.adminUrl)
    });

    this.imageInfo = table;
    // console.log("fetch Ai" ,this.imageInfo)

  }


  async  showSlides() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.imageInfo.length;
    }, 2000); 
  }

  async  setCurrentSlide(index: number) {
    this.currentIndex = index;
  }
}

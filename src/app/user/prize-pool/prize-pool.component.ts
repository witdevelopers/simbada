import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-prize-pool',
  templateUrl: './prize-pool.component.html',
  styleUrls: ['./prize-pool.component.css']
})
export class PrizePoolComponent implements OnInit, OnDestroy {

  pools: any[] = []

  selectedValue: any;
  interval: any;
  constructor(private api: UserService) { }

  ngOnInit() {
    this.getPoolDetails()
  }

  async getPoolDetails() {
    let result: any = await this.api.getPrizePools()
    console.log("Prize pools", result)
    if (result && result.status) {
      this.pools = result.data.table;

      if (this.pools.length > 0) {
        this.onPoolSelect(this.pools[0])
      }
    }
  }

  onPoolSelect(value) {
    this.selectedValue = value;
    this.startCountdown(this.selectedValue.remainingSeconds)
  }

  startCountdown(secondsRemaining) {
    this.interval = setInterval(() => {
      secondsRemaining--;

      const days = Math.floor(secondsRemaining / (3600 * 24));
      const hours = Math.floor((secondsRemaining % (3600 * 24)) / 3600);
      const minutes = Math.floor((secondsRemaining % 3600) / 60);
      const seconds = Math.floor(secondsRemaining % 60);

      document.getElementById("days").textContent = days.toString().padStart(2, '0');
      document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
      document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
      document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

      if (secondsRemaining <= 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

}

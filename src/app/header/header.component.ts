import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  rateObj = {
    usd: 0,
    eur: 0,
  };

  getRate() {
    return fetch(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
    )
      .then((response) => response.json())
      .then((json) => this.showRate(json));
  }

  showRate(obj: any) {
    this.rateObj.usd = obj[25].rate;
    this.rateObj.eur = obj[32].rate;
  }

  ngOnInit(): void {
    this.getRate();
    setInterval(() => this.getRate(), 600000);
  }
}

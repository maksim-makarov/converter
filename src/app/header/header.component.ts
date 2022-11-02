import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  course: any[] = [];

  rateObj = {
    usd: 0,
    eur: 0,
    date: '',
  };

  getRate() {
    return fetch(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
    )
      .then((response) => response.json())
      .then((json) => this.showRate(json));
  }

  showRate(obj: any) {
    console.log('Rates updated');
    this.rateObj.usd = obj[25].rate;
    this.rateObj.eur = obj[32].rate;
    this.rateObj.date = obj[25].exchangedate;
  }

  ngOnInit(): void {
    this.getRate();
    setInterval(() => this.getRate(), 600000);
  }
}
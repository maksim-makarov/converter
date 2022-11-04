import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  constructor() {}

  fromValue = 0;
  toValue = 0;
  ratio = 1;

  fromCurrency: any = 'usd';
  toCurrency: any = 'uah';

  directCalculate(): void {
    this.ratio =
      this.rateObj[this.toCurrency] / this.rateObj[this.fromCurrency];
    this.toValue = this.fromValue / this.ratio;
  }

  reverseCalculate() {
    this.ratio =
      this.rateObj[this.toCurrency] / this.rateObj[this.fromCurrency];
    this.fromValue = this.toValue * this.ratio;
  }

  rateObj: any = {
    usd: 0,
    eur: 0,
    uah: 1,
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

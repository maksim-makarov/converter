import { Component, OnInit } from '@angular/core';
import { RatesService } from '../rates.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private ratesService: RatesService) {}

  rates: any;
  newRates: any = [];

  ngOnInit(): void {
    this.ratesService.getRates().subscribe((data) => {
      this.rates = data;
      console.log(this.rates);
      this.rates.forEach((element: any) => {
        if (element.cc == 'USD' || element.cc == 'EUR') {
          delete element.r030;
          delete element.txt;
          delete element.exchangedate;
          this.newRates.push(element);
        }
      });
      // this.newNewRates.push({ rate: 1, cc: 'UAH' });
      console.log(this.newRates);
    });
  }
}

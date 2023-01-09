import { Component, OnInit } from '@angular/core';
import { RatesService } from '../rates.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  constructor(private ratesService: RatesService) {}

  fromValue = 0;
  toValue = 0;
  ratio = 1;

  rates: any[] = [];

  fromCurrency: any = 'USD';
  toCurrency: any = 'UAH';

  directCalculate(): void {
    this.ratio =
      this.findRate(this.toCurrency) / this.findRate(this.fromCurrency);
    this.toValue = this.fromValue / this.ratio;
  }

  reverseCalculate() {
    this.ratio =
      this.findRate(this.toCurrency) / this.findRate(this.fromCurrency);
    this.fromValue = this.toValue * this.ratio;
  }

  findRate(title: string) {
    for (const iterator of this.rates) {
      if (iterator.title == title) return iterator.rate;
    }
  }

  ngOnInit(): void {
    this.ratesService.getRates().subscribe((data) => {
      data.forEach((element: any) => {
        if (element.title == 'USD' || element.title == 'EUR') {
          this.rates.push(element);
        }
      });
      this.rates.push({ rate: 1, title: 'UAH' });
    });
  }
}

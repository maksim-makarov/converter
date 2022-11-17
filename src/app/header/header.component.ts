import { Component, OnInit } from '@angular/core';
import { RatesService } from '../rates.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private ratesService: RatesService) {}

  rates: any[] = [];

  ngOnInit(): void {
    this.ratesService.getRates().subscribe((data) => {
      data.forEach((element: any) => {
        if (
          element.title == 'USD' ||
          element.title == 'EUR' ||
          element.title == 'GBP'
        ) {
          this.rates.push(element);
        }
      });
    });
  }
}

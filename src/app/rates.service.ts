import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  constructor(private http: HttpClient) {}

  getRates() {
    return this.http
      .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .pipe(
        map((res: any) =>
          res.map((data: any) => {
            return { rate: data.rate, title: data.cc };
          })
        )
      );
  }
}

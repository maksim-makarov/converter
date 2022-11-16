import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RatesService {
  constructor(private http: HttpClient) {}

  getRates() {
    return this.http.get(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
    );
  }
}

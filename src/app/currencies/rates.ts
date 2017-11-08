import {Component} from '@angular/core';
import {Rates} from '../models/models';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-rates',
  providers: [HttpClient],
  templateUrl: './rates.html',
})
export class RatesComponent {
  rates;

  constructor(http: HttpClient) {
    console.log("RATES")
    this.rates = new Rates(http);
    this.rates.fetch();
    console.log(this.rates);
  }

}

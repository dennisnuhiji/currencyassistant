import {Component} from '@angular/core';
import {Currencies, Rates} from './models/models';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-convert',
  providers: [HttpClient],
  templateUrl: './convert.html',
})
export class ConvertComponent {
  currencies;
  rates;
  selectedFrom;
  selectedTo;
  inputFrom;
  inputTo;
  keyFrom;
  keyTo;
  fromRate;
  toRate;
  basicFrom;
  basicTo;

  constructor(http: HttpClient) {
    this.currencies = new Currencies(http);
    this.rates = new Rates(http);
    this.currencies.fetch();
    this.rates.fetch();
    this.inputFrom = '';
    this.inputTo = '';
    console.log(this.currencies);
    console.log(this.rates);
  }

  calculate() {
    if (this.selectedFrom) {
      this.keyFrom = this.currencies.data.find((curr) => this.selectedFrom === curr.name).key;
      this.fromRate = this.rates.data.rates.find((rate) => this.keyFrom === rate.key).value;
      this.keyTo = this.currencies.data.find((curr) => this.selectedTo === curr.name).key;
      this.toRate = this.rates.data.rates.find((rate) => this.keyTo === rate.key).value;
      this.calculateBasic();
    }
    if (this.inputFrom) {
      const fromValue = this.inputFrom / this.fromRate;
      this.inputTo = (fromValue * this.toRate).toFixed(2);
    }
  }

  calculateBasic() {
    this.basicFrom = ((1 / this.fromRate) * this.toRate).toFixed(2);
    this.basicTo = ((1 / this.toRate) * this.fromRate).toFixed(2);
  }

  swapCurrencies() {
    const temp = this.selectedFrom;
    this.selectedFrom = this.selectedTo;
    this.selectedTo = temp;
    this.calculate();
  }
}

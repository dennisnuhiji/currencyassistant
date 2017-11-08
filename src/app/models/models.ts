import {HttpClient} from '@angular/common/http';
const serverUrl = 'http://localhost:1234/'; // this needs to be moved into dotenv file
export class Currencies {
  http: HttpClient;
  data: Array<any>;

  constructor(http: HttpClient) {
    this.http = http;
  }

  parse(currencies) {
    this.data = [];
    for (const s in currencies) {
      this.data.push({key: s, name: currencies[s]});
    }
  }

  fetch() {
    this.http.get(serverUrl + 'getCurrencies').subscribe((response: any) => {
      this.parse(JSON.parse(response));
    });
  }
}
export class Rates {
  http: HttpClient;
  data: {};

  constructor(http: HttpClient) {
    this.http = http;
  }

  parse(rates) {
    this.data = {};
    const date = new Date(rates.timestamp * 1000);
    this.data['timestamp'] = date.toDateString() + ' ' + date.toLocaleTimeString();
    this.data['rates'] = [];
    for (const rate in rates.rates) {
      this.data['rates'].push({key: rate, value: rates.rates[rate]});
    }
  }

  fetch() {
    this.http.get(serverUrl + 'getRates').subscribe((response: any) => {
      this.parse(JSON.parse(response));
    });
  }
}

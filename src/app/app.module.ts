import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {routing} from './router';
import {MainComponent} from './main.component';
import {ConvertComponent} from './convert';
import {RatesComponent} from './currencies/rates';


@NgModule({
  declarations: [
    MainComponent,
    ConvertComponent,
    RatesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule {
}

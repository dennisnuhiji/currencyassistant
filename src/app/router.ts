import {RouterModule, Routes} from '@angular/router';
import {ConvertComponent} from './convert';
import {RatesComponent} from './currencies/rates';


const routes: Routes = [
  {path: '', component: ConvertComponent},
  {path: 'rates', component: RatesComponent},
];

export const routing = RouterModule.forRoot(routes);

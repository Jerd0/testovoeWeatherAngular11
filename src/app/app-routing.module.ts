import {WeatherComponent} from './weather/weather.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const date = new Date();

const routes: Routes = [
  {path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`, component: WeatherComponent},
  {path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() - 1}`, component: WeatherComponent},
  {path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() - 2}`, component: WeatherComponent},
  {path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() - 3}`, component: WeatherComponent},
  {path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() - 4}`, component: WeatherComponent},
  {path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + 1}`, component: WeatherComponent},
  {path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + 2}`, component: WeatherComponent},
  {path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + 3}`, component: WeatherComponent},
  {path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + 4}`, component: WeatherComponent},
  {path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + 5}`, component: WeatherComponent},
  {path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + 6}`, component: WeatherComponent},
  {path: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + 7}`, component: WeatherComponent},
  {
    path: '',
    redirectTo: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

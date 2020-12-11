import {PastCondtitions} from '../conditions/past-conditions';
import {CurrentConditions} from '../conditions/current-conditions';
import {FutureConditions} from '../conditions/future-conditions';

export class WeatherData {
  pastCondtitions: PastCondtitions = new PastCondtitions();
  futureCondtitions: FutureConditions = new FutureConditions();
  currentConditions: CurrentConditions = new CurrentConditions();

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'currencies'})
export class CurrenciesPipe implements PipeTransform {

  transform(value: string): string {
    if (value.toUpperCase() === 'EURUSD') {
      value = 'Euro / Dollaro americano';
    } else if (value.toUpperCase() === 'EURCAD') {
      value = 'Euro / Dollaro canadese';
    } else if (value.toUpperCase() === 'EURJPY') {
      value = 'Euro / Yen';
    } else if (value.toUpperCase() === 'EURCHF') {
      value = 'Euro / Franco svizzero';
    } else if (value.toUpperCase() === 'EURGBP') {
      value = 'Euro / Sterlina';
    }
    return value;
  }

}

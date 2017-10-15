import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'isOpen'})
export class OpenedPipe implements PipeTransform {

  transform(value: Boolean): string {
    return (value) ? 'Aperto' : 'Chiuso';
  }

}

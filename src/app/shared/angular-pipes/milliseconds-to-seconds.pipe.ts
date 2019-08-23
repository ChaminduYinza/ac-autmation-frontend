import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millisecondsToSeconds'
})
export class MillisecondsToSecondsPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    // milliseconds to seconds convert
    return value / 1000;
  }
}

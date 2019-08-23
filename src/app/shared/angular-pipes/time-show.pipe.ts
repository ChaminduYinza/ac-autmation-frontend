import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeShow'
})
export class TimeShowPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const unit = value.split(' ')[1];
    const formatTime = `${value.split(':')[0]}:${value.split(':')[1]} ${unit}`;

    return formatTime;
  }
}

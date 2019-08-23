import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'towerOrderInverse'
})
export class TowerOrderInversePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value === 'c' || value === 'C') {
      return 1;
    } else {
      if (value < 0 || value > 12) {
        return args;
      } else {
        return args - value;
      }

    }
  }
}

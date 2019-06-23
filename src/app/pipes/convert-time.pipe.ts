import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment.utc(value.replace(/\s/g, '')).local().format('MM-DD-YYYY HH-mm');
  }

}

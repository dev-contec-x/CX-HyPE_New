import { Pipe, PipeTransform } from '@angular/core';

import { TimeUnits } from '@shared/models';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: Date): unknown {
    return this.convertDateToDateAgo(value);
  }

  private convertDateToDateAgo(date: Date) {
    const nowInSeconds: number = this.convertDateTo(new Date(), TimeUnits.Second);
    const inDatetoSeconds: number = this.convertDateTo(date, TimeUnits.Second);
    const diffInSeconds = Math.round(nowInSeconds - inDatetoSeconds);
    let intervalValue: number = diffInSeconds;
    let unitText = '';
    if (diffInSeconds > 60 && diffInSeconds <= 3600) {
      intervalValue = this.convertDateTo(diffInSeconds, TimeUnits.Minute, true);
      unitText = 'min';
    } else if (diffInSeconds > 3600 && diffInSeconds <= 86400) {
      intervalValue = this.convertDateTo(diffInSeconds, TimeUnits.Hour, true);
      unitText = 'hour';
    } else if (diffInSeconds > 86400 && diffInSeconds <= 2629746) {
      intervalValue = this.convertDateTo(diffInSeconds, TimeUnits.Day, true);
      unitText = 'day';
    } else if (diffInSeconds > 2629746 && diffInSeconds <= 31536000) {
      intervalValue = this.convertDateTo(diffInSeconds, TimeUnits.Month, true);
      unitText = 'month';
    } else if (diffInSeconds > 31536000) {
      intervalValue = this.convertDateTo(diffInSeconds, TimeUnits.Year, true);
      unitText = 'year';
    }

    if (unitText && unitText.length > 0) {
      return `${ intervalValue } ${ unitText }${ intervalValue > 1 ? 's' : '' }`;
    } else {
      return 'few moments ago';
    }
  }

  private convertDateTo = (date: any, unit: TimeUnits, convert?: boolean) => {
    let timeValue: number = date;
    let convertValue: number;
    if (convert) {
      timeValue = (date as Date).getTime();
    }
    switch(unit) {
      case TimeUnits.Minute:
        convertValue = 60;
        break;
      case TimeUnits.Hour:
        convertValue = 3600;
        break;
      case TimeUnits.Day:
        convertValue = Math.round(3600 * 24);
        break;
      case TimeUnits.Month:
        convertValue = Math.round(3600 * 24 * 30);
        break;
      case TimeUnits.Year:
        convertValue = Math.round(3600 * 24 * 30 * 12);
        break;
      default:
        convertValue = 1000;
    }

    return Math.round(timeValue / convertValue);
  };
}

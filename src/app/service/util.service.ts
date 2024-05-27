import { Injectable } from '@angular/core';
import * as moment from 'moment';
declare var Kakao;

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
  ) {
  }

  setQueryParams(dto: any): string {
    const queries = Object.keys(dto).filter(key => typeof dto[key] !== 'undefined').map(key => {
      const value = dto[key];
      if (Array.isArray(value)) {
        return `${key}=[${value}]`
      }
      else return `${key}=${value}`;
    }).join('&');
    return queries;
  }


  getDate(date: Date, isEnd = false): moment.Moment {
    const mdate = !isEnd ? moment(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }) : moment(date).set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
    return mdate;
  }

  groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    list.reduce((previous, currentItem) => {
      const group = getKey(currentItem);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    }, {} as Record<K, T[]>);

  getRandomColor(): string {
    let random = this.getRandomString();
    while (random.length !== 6) {
      random = this.getRandomString();
    }
    return `#${random}3D`;
  }

  private getRandomString() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }
}
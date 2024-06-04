import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Corp, CorpSearchDto } from '../model/corp';
import { Pagination } from '../model/pagination';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CorpService {

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) { }

  searchFinance(dto: any): Observable<Pagination<Corp>> {
    const query = this.utilService.setQueryParams(dto);
    return this.http.get<Pagination<Corp>>(`/api/search/finance?${query}`);
  }

  getCorp(corpCode: string): Observable<Corp> {
    return this.http.get<Corp>(`/api/corp/${corpCode}`);
  }

  searchCorp(dto: CorpSearchDto): Observable<Pagination<Corp>> {
    const query = this.utilService.setQueryParams(dto);
    return this.http.get<Pagination<Corp>>(`/api/search/corp?${query}`).pipe(
      map(v => {
        v.items = v.items.map(item => {
          item.finance = item.finances.filter(f => f.year == 202312)[0];
          return item;
        })
        return v;
      })
    );
  }

  summaryCorp(corpName: string): Observable<{ response: string }> {
    return this.http.get<{ response: string }>(`api/summary/corp?corpName=${corpName}`);
  }
}
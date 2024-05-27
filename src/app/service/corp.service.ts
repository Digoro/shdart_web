import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Corp } from '../model/corp';
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

  search(dto: any): Observable<Pagination<Corp>> {
    const query = this.utilService.setQueryParams(dto);
    return this.http.get<Pagination<Corp>>(`/api/search?${query}`);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, map } from 'rxjs';
import { Message } from '../model/chat';
import { Corp, CorpSearchDto } from '../model/corp';
import { Pagination } from '../model/pagination';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CorpService {

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private socket: Socket
  ) { }

  searchFinance(dto: any): Observable<Pagination<Corp>> {
    const query = this.utilService.setQueryParams(dto);
    return this.http.get<Pagination<Corp>>(`/api/search/finance?${query}`);
  }

  getCorp(corpCode: string): Observable<Corp> {
    return this.http.get<Corp>(`/api/corp/${corpCode}`);
  }

  findCorp(term: string): Observable<Corp[]> {
    return this.http.get<Corp[]>(`/api/find/corp?term=${term}`);
  }

  searchCorp(dto: CorpSearchDto): Observable<Corp[]> {
    const query = this.utilService.setQueryParams(dto);
    return this.http.get<Corp[]>(`/api/search/corp?${query}`).pipe(
      map(v => {
        v = v.map(item => {
          item.finance = item.finances.filter(f => f.year == 202312)[0];
          return item;
        })
        return v;
      })
    );
  }

  getSummaryMarket() {
    return this.socket.fromEvent('emitSummaryMarket');
  }

  emitSummaryMarket() {
    return this.socket.emit('getSummaryMarket')
  }

  getSummaryCorp() {
    return this.socket.fromEvent('emitSummaryCorp');
  }

  emitSummaryCorp(corpName: string) {
    return this.socket.emit('getSummaryCorp', { corpName })
  }

  getAnswerMessage(messageList: Message[]): Observable<{ answer: string }> {
    return this.http.post<{ answer: string }>(`api/chat`, { messageList })
  }
}
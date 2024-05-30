import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Corp } from './model/corp';
import { CorpService } from './service/corp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  columns: Columns[];
  config: Config;
  pagination = {
    offset: 1,
    limit: 30,
    count: -1
  };
  corps: Corp[];
  currentPage = 1;
  currentLimit = 30;

  constructor(
    private corpService: CorpService
  ) { }

  ngOnInit(): void {
    this.columns = [
      { key: 'index', title: '번호', width: '1%' },
      { key: 'code', title: '상장코드', width: '1%' },
      { key: 'name', title: '기업', width: '1%' },
      { key: 'market', title: '시장', width: '1%' },
      { key: 'industry', title: '산업', width: '1%' },
      { key: 'year', title: '연도', width: '1%' },
      { key: 'fullRevenue', title: '매출액', width: '1%' },
      { key: 'operatingProfit', title: '영업이익', width: '1%' },
      { key: 'netIncome', title: '당기순이익', width: '1%' },
      { key: 'operatingProfitMargin', title: '영업이익률', width: '1%' },
      { key: 'netProfitMargin', title: '순이익률', width: '1%' },
      { key: 'roe', title: 'ROE', width: '1%' },
      { key: 'eps', title: 'EPS', width: '1%' },
      { key: 'per', title: 'PER', width: '1%' },
      { key: 'bps', title: 'BPS', width: '1%' },
      { key: 'pbr', title: 'PBR', width: '1%' },
      { key: 'dividendPerShare', title: '주당배당금', width: '1%' },
    ];
    this.config = { ...DefaultConfig };
    this.config.rows = 30;
    this.config.horizontalScroll = true;
    this.config.orderEnabled = false;

    this.setCorps(1, 30);
  }

  setCorps(page: number, limit: number) {
    this.corpService.search({ page, limit }).subscribe(resp => {
      this.corps = resp.items;
      this.pagination = { limit: resp.meta.itemsPerPage, offset: resp.meta.currentPage, count: resp.meta.totalItems };
    })
  }

  onTableEvent(event: any): void {
    if (event.event === 'onPagination') {
      this.currentPage = event.value.page;
      this.currentLimit = event.value.limit;
      this.setCorps(event.value.page, event.value.limit);
    }
  }
}

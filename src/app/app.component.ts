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
    limit: 10,
    count: -1
  };
  corps: Corp[];
  currentPage = 1;
  currentLimit = 10;

  constructor(
    private corpService: CorpService
  ) { }

  ngOnInit(): void {
    this.columns = [
      { key: 'index', title: '번호', width: '1%' },
      { key: 'code', title: '기업코드', width: '1%' },
      { key: 'name', title: '기업', width: '1%' },
      { key: 'stock_code', title: '상장코드', width: '1%' },
      { key: 'modify_date', title: '수정일', width: '1%' },
      { key: 'created_date', title: '생성일', width: '1%' },
      { key: 'update_date', title: '수정일', width: '1%' },
    ];
    this.config = { ...DefaultConfig };
    this.config.horizontalScroll = true;
    this.config.orderEnabled = false;

    this.setCorps(1, 10);
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

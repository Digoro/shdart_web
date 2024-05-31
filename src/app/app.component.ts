import { Component, OnInit } from '@angular/core';
import { Corp } from './model/corp';
import { PaginationMeta } from './model/pagination';
import { CorpService } from './service/corp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pagination = {
    offset: 1,
    limit: 30,
    count: -1
  };
  corps: Corp[];
  currentPage: number;
  nextPage: number;
  currentLimit = 30;
  meta: PaginationMeta;

  constructor(
    private corpService: CorpService
  ) { }

  ngOnInit(): void {
    this.setCorps(1, 30);
  }

  setCorps(page: number, limit: number) {
    this.corpService.searchCorp({ page, limit }).subscribe(resp => {
      this.corps = resp.items;
      this.meta = resp.meta;
      this.pagination = { limit: resp.meta.itemsPerPage, offset: resp.meta.currentPage, count: resp.meta.totalItems };
      this.setPagination(resp.meta);
    })
  }

  onTableEvent(event: any): void {
    if (event.event === 'onPagination') {
      this.currentPage = event.value.page;
      this.currentLimit = event.value.limit;
      this.setCorps(event.value.page, event.value.limit);
    }
  }

  private setPagination(meta) {
    this.currentPage = +meta.currentPage;
    const lastPage = +meta.totalPages;
    if (this.currentPage + 1 <= lastPage) {
      this.nextPage = this.currentPage + 1;
    }
  }

  onScroll() {
    if (this.currentPage < this.nextPage) {
      this.corpService.searchCorp({ page: +this.nextPage, limit: this.currentLimit }).subscribe(resp => {
        this.corps = [...this.corps, ...resp.items];
        this.setPagination(resp.meta);
      })
    }
  }
}

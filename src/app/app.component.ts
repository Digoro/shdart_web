import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('th') th: ElementRef<any>;
  @ViewChild('thView') thView: ElementRef<any>;
  observer: IntersectionObserver;

  constructor(
    private corpService: CorpService
  ) { }

  ngOnInit(): void {
    this.corpService.searchCorp({ page: 1, limit: 30 }).subscribe(resp => {
      this.corps = resp.items;
      this.meta = resp.meta;
      this.pagination = { limit: resp.meta.itemsPerPage, offset: resp.meta.currentPage, count: resp.meta.totalItems };
      this.setPagination(resp.meta);
    });
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('in');
        const elements = document.getElementsByClassName('myTd');
        for (const element of elements) {
          element.classList.add('myTdIn');
          element.classList.remove('myTdOut');
        }
        this.th.nativeElement.style.minWidth = '100%';
        this.th.nativeElement.style.maxWidth = '100%';
        this.th.nativeElement.style.whiteSpace = 'nowrap';
      } else {
        console.log('out');
        const elements = document.getElementsByClassName('myTd');
        for (const element of elements) {
          element.classList.add('myTdOut');
          element.classList.remove('myTdIn');
        }
        this.th.nativeElement.style.minWidth = '100px';
        this.th.nativeElement.style.maxWidth = '100px';
        this.th.nativeElement.style.whiteSpace = 'wrap';
      }
    });
  }

  setTableObserver() {
    setTimeout(() => {
      this.observer.unobserve(this.thView.nativeElement);
      this.observer.observe(this.thView.nativeElement);
    });
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
    this.setTableObserver()
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

import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { Corp, CorpSearchDto } from 'src/app/model/corp';
import { PaginationMeta } from 'src/app/model/pagination';
import { CorpService } from 'src/app/service/corp.service';

@Component({
  selector: 'theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss']
})
export class ThemePage implements OnInit {
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
  theme: any;

  selectedQuestion: string;
  standards;

  constructor(
    private corpService: CorpService,
    private route: ActivatedRoute,
    public location: Location,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(resp => {
      this.theme = resp;
      this.setCorps(1, 30);
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const elements = document.getElementsByClassName('myTd');
          for (const element of elements) {
            element.classList.add('myTdIn');
            element.classList.remove('myTdOut');
          }
          this.th.nativeElement.style.minWidth = '100%';
          this.th.nativeElement.style.maxWidth = '100%';
          this.th.nativeElement.style.whiteSpace = 'nowrap';
        } else {
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
    })
  }

  setTableObserver() {
    setTimeout(() => {
      this.observer.unobserve(this.thView.nativeElement);
      this.observer.observe(this.thView.nativeElement);
    });
  }

  setCorps(page: number, limit: number) {
    const dto = this.getSearchDto(page, limit, this.theme.name);
    this.corpService.searchCorp(dto).subscribe(resp => {
      this.corps = resp.items;
      this.meta = resp.meta;
      this.pagination = { limit: resp.meta.itemsPerPage, offset: resp.meta.currentPage, count: resp.meta.totalItems };
      this.setPagination(resp.meta);
    })
  }

  getSearchDto(page, limit, theme): CorpSearchDto {
    let searchDto: CorpSearchDto;
    if (theme === '저평가된 성장주') {
      searchDto = {
        page, limit,
        revenuePerYearIncreaseRatio: 10,
        netProfitPerYearIncreaseRatio: 20,
        per: 20
      }
    } else if (theme === '성장 기대주') {
      searchDto = {
        page, limit,
        netProfitIncreaseRatio: 10,
        netProfitPerYearIncreaseRatio: 10,
      }
    } else if (theme === '안정 성장주') {
      searchDto = {
        page, limit,
        netProfitPerYearIncreaseRatio: 10,
        continuousIncreaseNetProfit: 1,
        roe: 15,
      }
    } else if (theme === '아직 저렴한 가치주') {
      searchDto = {
        page, limit,
        per: 15,
        pbr: 1.5,
        netProfitPerYearIncreaseRatio: 10,
      }
    } else if (theme === '고수익 저평가') {
      searchDto = {
        page, limit,
        per: 15,
        roe: 15,
      }
    } else if (theme === '돈 잘버는 회사 찾기') {
      searchDto = {
        page, limit,
        roe: 15,
      }
    }
    this.standards = Object.keys(searchDto).filter(v => v != 'page' && v != 'limit');
    return searchDto;
  }

  onTableEvent(event: any): void {
    if (event.event === 'onPagination') {
      this.currentPage = event.value.page;
      this.currentLimit = event.value.limit;
      this.setCorps(event.value.page, event.value.limit);
    }
  }

  private setPagination(meta) {
    this.setTableObserver();
    this.currentPage = +meta.currentPage;
    const lastPage = +meta.totalPages;
    if (this.currentPage + 1 <= lastPage) {
      this.nextPage = this.currentPage + 1;
    }
  }

  onScroll() {
    if (this.currentPage < this.nextPage) {
      const dto = this.getSearchDto(+this.nextPage, this.currentLimit, this.theme.name);
      this.corpService.searchCorp(dto).subscribe(resp => {
        this.corps = [...this.corps, ...resp.items];
        this.setPagination(resp.meta);
      })
    }
  }

  openBm(template, key: string) {
    this.selectedQuestion = key;
    this.bottomSheet.open(template, { closeOnNavigation: true, panelClass: 'nnb-bottom-sheet' });
  }

  closeBm() {
    this.bottomSheet.dismiss();
  }
}

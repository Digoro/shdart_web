import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Corp, CorpSearchDto } from 'src/app/model/corp';
import { CorpService } from 'src/app/service/corp.service';
declare var TypeHangul;

@Component({
  selector: 'theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss']
})
export class ThemePage implements OnInit {
  corps: Corp[];
  @ViewChild('th') th: ElementRef<any>;
  @ViewChild('thView') thView: ElementRef<any>;
  @ViewChild('themeTitle') themeTitle: ElementRef<any>;
  @ViewChild('themeTitleView') themeTitleView: ElementRef<any>;
  columns = [
    { key: 'name', name: '주식' },
    { key: 'fullRevenue', name: '매출액' },
    { key: 'operatingProfit', name: '영업이익' },
    { key: 'netIncome', name: '당기순이익' },
    { key: 'operatingProfitMargin', name: '영업이익률' },
    { key: 'netProfitMargin', name: '순이익률' },
    { key: 'roe', name: 'ROE' },
    { key: 'eps', name: 'EPS' },
    { key: 'per', name: 'PER' },
    { key: 'bps', name: 'BPS' },
    { key: 'pbr', name: 'PBR' },
    { key: 'revenuePerYearIncreaseRatio', name: '연평균 매출액 증감률' },
    { key: 'netProfitPerYearIncreaseRatio', name: '연평균 순이익 증감률' },
    { key: 'operatingProfitIncreaseRatio', name: '영업이익 증감률' },
    { key: 'netProfitIncreaseRatio', name: '순이익 증감률' },
    { key: 'dividendPerShare', name: '주당배당금' },
  ]
  observer: IntersectionObserver;
  theme: any;

  selectedQuestion: string;
  selectedCorp: Corp;
  standards: { key: string, value: number }[];
  order = { key: 'fullRevenue', isAsc: false };

  constructor(
    private corpService: CorpService,
    private route: ActivatedRoute,
    public location: Location,
    private bottomSheet: MatBottomSheet,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(resp => {
      this.theme = resp;
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
      const headerObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.themeTitle.nativeElement.style.opacity = '0';
        } else {
          this.themeTitle.nativeElement.style.opacity = '1';
        }
      });
      setTimeout(() => {
        headerObserver.observe(this.themeTitleView.nativeElement);
      })
      this.setCorps();
    })
  }

  setCorps() {
    const dto = this.getSearchDto(this.theme.name);
    this.corpService.searchCorp(dto).subscribe(resp => {
      this.corps = resp.sort((a, b) => b.finance.fullRevenue - a.finance.fullRevenue)
      setTimeout(() => {
        this.observer.observe(this.thView.nativeElement);
      });
    })
  }

  getSearchDto(theme): CorpSearchDto {
    let searchDto: CorpSearchDto;
    if (theme === '저평가 성장주') {
      searchDto = {
        revenuePerYearIncreaseRatio: 10,
        netProfitPerYearIncreaseRatio: 20,
        per: 10
      }
    } else if (theme === '성장 기대주') {
      searchDto = {
        netProfitIncreaseRatio: 10,
        netProfitPerYearIncreaseRatio: 3,
      }
    } else if (theme === '안정 성장주') {
      searchDto = {
        netProfitPerYearIncreaseRatio: 10,
        continuousIncreaseNetProfit: 2,
        roe: 15,
      }
    } else if (theme === '저렴한 가치주') {
      searchDto = {
        per: 15,
        pbr: 1.5,
        netProfitPerYearIncreaseRatio: 10,
      }
    } else if (theme === '고수익 저평가') {
      searchDto = {
        per: 10,
        roe: 15,
      }
    } else if (theme === '돈 잘버는 회사') {
      searchDto = {
        operatingProfitIncreaseRatio: 20,
        roe: 15,
      }
    }
    this.standards = Object.keys(searchDto).filter(v => v != 'page' && v != 'limit').map(v => {
      return {
        key: v,
        value: searchDto[v]
      }
    })
    return searchDto;
  }

  openBm(template, key?: string) {
    if (key) this.selectedQuestion = key;
    this.bottomSheet.open(template, { closeOnNavigation: true, panelClass: 'nnb-bottom-sheet' });
  }

  closeBm() {
    this.bottomSheet.dismiss();
  }

  goToCorp(corp: Corp) {
    this.router.navigate(['/corp', corp.code])
  }

  sort(standard: string) {
    this.order.isAsc = !this.order.isAsc;
    this.order.key = standard;
    if (standard == 'name') {
      this.corps = this.corps.sort((a, b) => this.order.isAsc ? a.name > b.name ? 1 : -1 : a.name > b.name ? -1 : 1);
    } else {
      if (this.order.key === standard) {
        this.corps = this.corps.sort((a, b) => this.order.isAsc ? a.finance[standard] - b.finance[standard] : b.finance[standard] - a.finance[standard])
      } else {
        this.corps = this.corps.sort((a, b) => b.finance[standard] - a.finance[standard])
      }
    }
  }
}

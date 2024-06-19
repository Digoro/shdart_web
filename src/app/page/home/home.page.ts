import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CorpService } from 'src/app/service/corp.service';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  cards = [
    [
      { name: '저평가 성장주', desc: '성장성 대비 저평가', color: '#CFE7C6', img: 'tree' },
      { name: '저렴한 가치주', desc: '순자산 대비 저평가', color: '#B9DAF7', img: 'diamond' }
    ],
    [
      { name: '고수익 저평가', desc: '고수익 대비 저평가', color: '#DAD5F7', img: 'money-fly' },
      { name: '돈 잘버는 회사', desc: '매출과 이익이 큰', color: '#F5E6BA', img: 'money-box' }
    ],
    [
      { name: '안정 성장주', desc: '꾸준한 이익', color: '#F6D4CA', img: 'balance' },
      { name: '성장 기대주', desc: '빠른 이익 성장', color: '#F3CEE2', img: 'cap' }
    ]
  ];
  summary = '';
  term: string;
  isMore = false;

  constructor(
    private router: Router,
    private corpService: CorpService
  ) { }

  ngOnInit(): void {
    this.corpService.getSummaryMarket().subscribe(resp => {
      this.summary += resp;
    })
    this.corpService.emitSummaryMarket();
  }

  search() {
    this.router.navigate(['/search', this.term]);
  }

  goToTheme(name: string) {
    this.router.navigate(['/theme'], {
      queryParams: this.cards.flat().filter(v => v.name == name)[0]
    });
  }

  goToChat() {
    this.router.navigate(['/chat'])
  }
}

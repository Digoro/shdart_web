import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  cards = [
    [
      { name: '저평가된 성장주', desc: '성장성 대비 저평가', color: '#CFE7C6', img: 'tree' },
      { name: '성장 기대주', desc: '빠른 이익 성장', color: '#F3CEE2', img: 'cap' }
    ],
    [
      { name: '안정 성장주', desc: '꾸준한 이익', color: '#F6D4CA', img: 'balance' },
      { name: '아직 저렴한 가치주', desc: '순자산 대비 저평가', color: '#B9DAF7', img: 'diamond' }
    ],
    [
      { name: '고수익 저평가', desc: '고수익 대비 저평가', color: '#DAD5F7', img: 'money-fly' },
      { name: '돈 잘버는 회사 찾기', desc: '매출과 이익이 큰', color: '#F5E6BA', img: 'money-box' }
    ]
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }



  goToTheme(name: string) {
    this.router.navigate(['/theme'], {
      queryParams: this.cards.flat().filter(v => v.name == name)[0]
    });
  }
}

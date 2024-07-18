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
  question = '';
  aiDesc = `엔비디아 주가가 요즘 하늘 높은 줄 모르고 쭉쭉 올라가고 있죠? 🚀 엔비디아는 원래 게임 그래픽 카드 만드는 회사로 유명했는데, 요즘은 그래픽 카드 기술을 활용해서 인공지능 분야에서도 엄청난 활약을 하고 있대요. 특히 요즘 핫한 챗GPT 같은 인공지능 서비스에는`;

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

  goToSection(section: string) {
    setTimeout(() => {
      const yOffset = -92;
      const element = document.getElementById(section);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  }
}

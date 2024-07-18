
import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/model/chat';
import { CorpService } from 'src/app/service/corp.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {
  @ViewChild('textarea') textarea: ElementRef<any>;
  chatList: Message[] = [];
  chatViewList: Message[] = [];
  search: string;
  isLoading = false;
  welcomeText = '안녕하세요! Stock AI에 오신 것을 환영합니다. 주식 투자와 관련된 모든 질문에 도움을 드리겠습니다. 무엇을 도와드릴까요?';
  welComeQuestions = [];

  constructor(
    private corpService: CorpService,
    public location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.corpService.getWelcomeQuestions().subscribe(resp => {
      try {
        if (resp.answer.startsWith("```json\n") && resp.answer.endsWith("\n```")) {
          const trimmedResponse = resp.answer.slice(8, -4);
          this.welComeQuestions = JSON.parse(trimmedResponse);
        } else {
          this.welComeQuestions = JSON.parse(resp.answer);
        }
      } catch (e) {
        console.log('relation question format invalid')
      }
    })
    const textarea = document.getElementById('myTextarea');
    textarea.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
      if (this.scrollHeight > 160) {
        this.style.height = '160px';
        this.style.overflowY = 'scroll';
      } else {
        this.style.overflowY = 'hidden';
      }
    });
  }

  sendMessage(question?: string) {
    if (this.isLoading) {
      alert('응답 중입니다.');
      return;
    }
    if (question) {
      this.search = question;
    }
    if (!this.search) return;
    if (this.search.trim() === '') return;
    if (this.search.length > 65535) {
      alert('입력 메시지가 너무 큽니다.')
      return;
    }
    this.isLoading = true;
    this.scrollToBottom();
    this.chatList.push(new Message("user", [{ text: this.search }]));
    this.chatViewList.push(new Message("user", [{ text: this.search }]));
    this.corpService.getAnswerMessage(this.chatList).subscribe(resp => {
      this.chatList.push(new Message("model", [{ text: resp.answer }]));
      this.chatViewList.push(new Message("model", [{ text: resp.answer }]));
      this.isLoading = false;
      this.corpService.getRelationQuestions(this.chatList).subscribe(resp => {
        try {
          if (resp.answer.startsWith("```json\n") && resp.answer.endsWith("\n```")) {
            console.log('trim')
            const trimmedResponse = resp.answer.slice(8, -4);
            const question = JSON.parse(trimmedResponse);
            this.chatViewList.push(new Message("question", [{ text: question }]));
          } else {
            const question = JSON.parse(resp.answer);
            this.chatViewList.push(new Message("question", [{ text: question }]));
          }
        } catch (e) {
          console.log('relation question format invalid')
        }
      });
    }, error => {
      alert('죄송합니다. 일시적인 오류가 발생했습니다. 다시 질문해주세요.');
      this.isLoading = false;
      this.chatList.pop();
      this.chatViewList[this.chatViewList.length - 1].role = 'error';
    });
    this.search = undefined;
  }

  scrollToBottom(): void {
    setTimeout(() => {
      document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
    });
  }

  goToHome() {
    this.router.navigate(['/'])
  }
}


import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  welcomeText = '안녕하세요! 주식 AI 어시스턴트에 오신 것을 환영합니다. 주식 투자와 관련된 모든 질문에 도움을 드리겠습니다. 무엇을 도와드릴까요?';

  constructor(
    private corpService: CorpService,
    public location: Location,

  ) { }

  ngOnInit(): void {
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
    if (question) this.search = question;
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
          const question = JSON.parse(resp.answer);
          this.chatViewList.push(new Message("question", [{ text: question }]));
        } catch (e) {
          console.log('relation question format invalid')
        }
      });
    }, error => {
      alert('죄송합니다. 일시적인 오류가 발생했습니다. 다시 질문해주세요.');
      this.isLoading = false;
      this.chatList.pop();
    })
    this.search = undefined;
    this.textarea.nativeElement.style.height = '54px';
    this.textarea.nativeElement.focus();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Corp } from 'src/app/model/corp';
import { CorpService } from 'src/app/service/corp.service';
declare var TypeHangul;

@Component({
  selector: 'corp',
  templateUrl: './corp.page.html',
  styleUrls: ['./corp.page.scss']
})
export class CorpPage implements OnInit {
  corp: Corp;
  summary = '';
  isMore = false;

  constructor(
    private corpService: CorpService,
    public location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.corpService.getCorp(params.code).subscribe(corp => {
        this.corp = corp;
        this.corp.finances = corp.finances.reverse();
        this.corpService.getSummaryCorp().subscribe(resp => {
          this.summary += resp;
        });
        this.corpService.emitSummaryCorp(this.corp.name);
      })
    })
  }
}

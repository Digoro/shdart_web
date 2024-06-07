import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Corp } from 'src/app/model/corp';
import { CorpService } from 'src/app/service/corp.service';

@Component({
  selector: 'search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  corps: Corp[];
  term: string;

  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private corpService: CorpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(resp => {
      this.term = resp.term;
      this.corpService.findCorp(this.term).subscribe(resp => {
        this.corps = resp;
      })
    });
  }

  goToCorp(corp: Corp) {
    this.router.navigate(['/corp', corp.code])
  }
}

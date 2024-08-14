
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import IndicatorsCore from 'highcharts/indicators/indicators';
import IndicatorZigzag from 'highcharts/indicators/zigzag';
import HC_Stock from 'highcharts/modules/stock';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Corp, StockPrice } from 'src/app/model/corp';
import { CorpService } from 'src/app/service/corp.service';
HC_Stock(Highcharts);
IndicatorsCore(Highcharts);
IndicatorZigzag(Highcharts);

@Component({
  selector: 'corp',
  templateUrl: './corp.page.html',
  styleUrls: ['./corp.page.scss']
})
export class CorpPage implements OnInit {
  corp: Corp;
  stockPrices: StockPrice[];
  summary = '';
  isMore = false;
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(
    private corpService: CorpService,
    public location: Location,
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private router: Router
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
      });
      this.corpService.searchStockPrice({ page: 1, limit: 100, code: `${params.code}` }).subscribe(resp => {
        this.stockPrices = resp.items;
        this.chartOptions = {
          rangeSelector: {
            buttons: [{
              type: 'hour',
              count: 1,
              text: '1h'
            }, {
              type: 'day',
              count: 1,
              text: '1d'
            }, {
              type: 'month',
              count: 1,
              text: '1m'
            }, {
              type: 'year',
              count: 1,
              text: '1y'
            }, {
              type: 'all',
              text: 'All'
            }],
            inputEnabled: false, // it supports only days
            selected: 4 // all
          },
          series: [
            {
              type: 'line',
              data: this.stockPrices.map(v => {
                return [Date.parse(v.date.toString()), v.open, v.high, v.low, v.close]
              }).reverse(),
              pointInterval: 24 * 3600 * 1000,
            },
            {
              type: 'zigzag',
              showInLegend: true,
              linkedTo: 'base',
            },
          ],
        };
      })
    })
  }

  goToOrder(code: string) {
    const deviceInfo = this.deviceService.getDeviceInfo();
    console.log(deviceInfo);
    let url;
    const btoaParam = btoa(`sno3=2100&submenu=&tabidx=&param=scode^${code}&market=&pname=&`);
    if (deviceInfo.os == 'Android') {
      url = `intent://action?mw=${btoaParam}#Intent;scheme=newshinhanialpha;package=com.shinhaninvest.nsmts;end;`;
    } else if (deviceInfo.os == 'iOS') {
      url = `NewShinhaniAlpha://?mw=${btoaParam}`;
    } else if (deviceInfo.os == 'Mac') {
      url = 'http://itunes.apple.com/kr/app/id1168512940?mt=8';
    } else {
      url = 'https://play.google.com/store/apps/details?id=com.shinhaninvest.nsmts&hl=ko';
    }
    window.open(url, '_blank');
  }

  goToHome() {
    this.router.navigate(['/'])
  }
}

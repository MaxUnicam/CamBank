import { Component, OnInit } from '@angular/core';

import { CamBankService } from 'app/services/iCamBankService';


@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html'
})

export class StatisticsComponent implements OnInit {

  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';


  constructor(private apiService: CamBankService) { }


  ngOnInit() {

  }


  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}

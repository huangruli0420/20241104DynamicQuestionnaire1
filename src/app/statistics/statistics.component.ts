import { Component } from '@angular/core';
import Chart from 'chart.js/auto'
import { Router, RouterLink } from '@angular/router';
import { ChartComponent } from "./chart/chart.component";
import { Service } from '../../service/service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [RouterLink, ChartComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {

    // 建構方法、ngOnInit
    constructor(private router: Router,private servie:Service) { }

    isAdminMode!:Boolean;

    ngOnInit(): void {
      this.isAdminMode = this.servie.isAdminMode;
    }

  // 多選M 單選Q 文字輸入T
  questData = {
    questName: 'MyGO人氣投票',
    sDate: '2024/12/05',
    eDate: '2024/12/31',
    questionDataArray: [
      {
        id: '1',
        type: 'M',
        name: '請選擇喜歡的角色(可複選):',
        labels: ['高松燈','千早愛音','長崎爽世','豐川祥子'],
        data: [30, 20, 10, 15],
        color: ['#66ccff','#ff99cc','#ffff99','#b366ff',]
      },
      {
        id: '2',
        type: 'Q',
        name: '請選擇最喜歡的樂團:',
        labels: ['MyGO','Ave Mujica',],
        data: [30, 25, ],
        color: ['#33ccff', '#ff3399', ]
      }
      ,
      {
        id: '3',
        type: 'T',
        name: '請輸入你內心的吶喊:',
        labels: [],
        data: ['是又怎樣','為什麼要演奏春日影' ,'又來了一個新人','你這個人，滿腦子都只想到自己呢', '我從來不覺得玩樂團開心過','普通和理所當然是什麼呢'],
        color: ['cyan']
      }
    ]
  }
}

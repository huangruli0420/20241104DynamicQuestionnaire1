import { Component, Input } from '@angular/core';
import  Chart  from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

  @Input() eachQuestionData!:any;

  ngOnInit(): void {
  }

  // 因為需要抓取頁面標籤所以需要使用ngAfterViewInit這個生命週期
  // 這個生命週期為當頁面渲染結束後才會觸發
  ngAfterViewInit(): void {
    console.log(this.eachQuestionData);
    this.createPie();
  }



  // 一開啟頁面就會顯示圓餅圖的方法，寫在ngOnInIt裡面了
  createPie() {
    // 獲取canvas元素
    let ctx = document.getElementById(this.eachQuestionData.id) as HTMLCanvasElement;

    let pieData = {
      // X軸文字
      labels: this.eachQuestionData.labels,
      datasets: [
        {
          // 數據
          data: this.eachQuestionData.data,
          // 線與邊框顏色
          backgroundColor: this.eachQuestionData.color,
          // 滑鼠移到圖表上的偏移量
          hoverOffset: 0,
        }
      ]
    }

    // 加上這個檢查來確保只有在 ctx 存在時才創建圖表，如果直接在 ctx 不存在的情況下創建圖表，程式就會報錯
    if(ctx){
    //創建圖表
    let chart = new Chart(ctx, {
      // 圖表類型和資料來源
      type: 'pie',
      data: pieData,
      options:{
        responsive:true,
        // maintainAspectRatio: false,
      }
    });

    }

  }

}

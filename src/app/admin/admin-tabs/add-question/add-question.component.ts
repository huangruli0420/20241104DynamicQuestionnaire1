import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Service } from '../../../../service/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.scss'
})
export class AddQuestionComponent {

  // 儲存要新增的問卷名稱、問卷描述、開始時間、結束時間
  addQuestionnaireName!: string;
  addQuestionnaireDcp!: string;
  addQuestionnaireStartTime!: string;
  addQuestionnaireEndTime!: string;
  // 設定問卷開始時間的最小日期、結束時間的最小日期，ngModel綁定的得到的是字串格式
  startMinDate!: string;
  endMinDate!: string;

  // 引入service來儲存要新增的問卷的資料，還有router導航
  constructor(private router: Router, private service: Service) { }

  // 讓要新增的問卷的起始最小日期變成今天+2，用service裡面的方法
  // 設定問卷開始時間的最小日期為當日+2，先轉換成日期格式用addDate方法增加天數，再用changeDateFormat方法轉換為字串
  ngOnInit(): void {
    this.startMinDate = this.service.changeDateFormat(this.service.addDate(new Date(), 2));

    if (this.service.addQuestionnaireName) {
      this.addQuestionnaireName = this.service.addQuestionnaireName;
      this.addQuestionnaireDcp = this.service.addQuestionnaireDcp;
      this.addQuestionnaireStartTime = this.service.addQuestionnaireStartTime;
      this.addQuestionnaireEndTime = this.service.addQuestionnaireEndTime;
    }

  }

  startMinDateChange() {
    this.endMinDate = this.service.changeDateFormat(this.service.addDate(new Date(this.startMinDate), 7));
  }

  // 取消按鈕，返回admin-list
  clearNewQuestionData() {
    this.router.navigate(['/admin-list'])
    this.service.addQuestionnaireName = '';
    this.service.addQuestionnaireDcp = '';
    this.service.addQuestionnaireStartTime = '';
    this.service.addQuestionnaireEndTime = '';
    // 增加問題頁的儲存所有問題的陣列，一起清除
    this.service.savedQuestionArray = [];
  }

  // 確認按鈕，將資料帶到下一頁新增選項頁
  saveNewQuestionData() {
    if (typeof this.addQuestionnaireName !== 'string' || !this.addQuestionnaireName.trim() ||
      typeof this.addQuestionnaireDcp !== 'string' || !this.addQuestionnaireDcp.trim() ||
      !this.addQuestionnaireStartTime || !this.addQuestionnaireEndTime) {
      alert("請填寫所有欄位")
      return;
    }
    this.service.addQuestionnaireName = this.addQuestionnaireName;
    this.service.addQuestionnaireDcp = this.addQuestionnaireDcp;
    this.service.addQuestionnaireStartTime = this.addQuestionnaireStartTime;
    this.service.addQuestionnaireEndTime = this.addQuestionnaireEndTime;
    this.router.navigate(['/admin-tabs/add-option'])
  }

}

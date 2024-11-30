import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { Service } from '../../../../service/service';
import { HttpClientService } from '../../../http-service/http-client.service';

@Component({
  selector: 'app-add-preview',
  standalone: true,
  imports: [],
  templateUrl: './add-preview.component.html',
  styleUrl: './add-preview.component.scss'
})
export class AddPreviewComponent {

// 前端選項要改成
// "option_list":"[{\"option\":\"麥當勞\",\"optionNumber\":\"1\"},{\"option\":\"丹丹\",\"optionNumber\":\"2\"}, {\"option\":\"小南\",\"optionNumber\":\"3\"}]"

  constructor(private service: Service,private router:Router, private http: HttpClientService) { }

  newQuestionnaireObject!:any;

  ngOnInit(): void {
    this.newQuestionnaireObject = this.service.newQuestionnaireObject;

    console.log(this.newQuestionnaireObject);
  }

  goAddOption(){
    this.router.navigate(['/admin-tabs/add-option']);
  }

  goBackAdminList(){
    if(new Date(this.newQuestionnaireObject.startTime) > new Date() ){
      let published = true;
      this.newQuestionnaireObject.published = published;
    } else {
      let published = false;
      this.newQuestionnaireObject.published = published;
    }

     // 將所有問題的選項轉換為 JSON 字串
  this.newQuestionnaireObject.quesList = this.newQuestionnaireObject.quesList.map((question: any) => {
    if (question.type !== 'text') {
      // 確保 options 陣列的格式正確，並轉成 JSON 字串
    let formattedOptions = question.options.map((option: any) => ({
      ...option,
      optionNumber: String(option.optionNumber), // 確保 optionNumber 為字串
    }));
    return {
      ...question,
      options: JSON.stringify(formattedOptions), // 將格式化後的選項轉為字串
    };
    } else {
      return question; // 文字題型不需處理選項
    }
  });

    console.log(this.newQuestionnaireObject);

    this.http.postApi('http://localhost:8080/quiz/create',this.newQuestionnaireObject).subscribe((res) => console.log(res));

  // 管理者新增問卷頁，儲存管理者要新增的問卷名稱、問卷描述、開始時間、結束時間
  // newQuestionData!: any;
  this.service.addQuestionnaireName ='';
  this.service.addQuestionnaireDcp =  '';
  this.service.addQuestionnaireStartTime = '';
  this.service.addQuestionnaireEndTime = '';

  // 管理者新增問題頁，是否為管理者模式，決定預覽頁返回到哪個頁面
  this.service.isAdminMode= false;
  // 管理者新增問題頁，用來儲存問卷所有問題的陣列
  this.service.savedQuestionArray= [];
  // 打包上一頁新增問卷頁的4個問卷資料跟這頁的問卷的所有問題
  this.service.newQuestionnaireObject = null;

  this.router.navigate(['/admin-list']);
  }
}


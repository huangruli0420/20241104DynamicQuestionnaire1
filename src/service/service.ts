import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Service {

  // 將日期的最小時間設定為今天並回傳
  changeDateFormat(dateData: Date, dateType: string = '-') {
    let year;
    let month;
    let date;
    if (dateData) {
      year = dateData.getFullYear();
      month = dateData.getMonth() + 1;
      if (String(month).length == 1) {
        month = '0' + month;
      }
      date = dateData.getDate();
      if (String(date).length == 1) {
        date = '0' + date;
      }
      return year + dateType + month + dateType + date;
    } else {
      return '';
    }
  }

  // 增加日期和減少日期的方法，setDate 和 getDate 都是 JavaScript Date 物件內建的方法
  addDate(dateData: Date, addDate: number) {
    dateData.setDate(dateData.getDate() + addDate);
    return dateData;
  }

  minusDate(dateData: Date, minusDate: number) {
    dateData.setDate(dateData.getDate() - minusDate);
    return dateData;
  }

  // 使用者列表頁，點擊表單上的問卷名稱之後先將問卷名稱、問卷描述、問卷開始時間、問卷結束時間傳到service再傳到回答頁
  public questionName!: string;
  public questionDcp!: string;
  public questionStartTime!: string;
  public questionEndTime!: string;

  // 使用者回答頁，基本資料和所有問題答案回傳到這裡，並帶到下一頁預覽頁
  userName!: string;
  userPhone!: string;
  userEmail!: string;
  userAge!: number | null;
  userSelectedAnswers: any;


  // 管理者新增問卷頁，儲存管理者要新增的問卷名稱、問卷描述、開始時間、結束時間
  // newQuestionData!: any;
  addQuestionnaireName!: string;
  addQuestionnaireDcp!: string;
  addQuestionnaireStartTime!: string;
  addQuestionnaireEndTime!: string;

  // 管理者新增問題頁，是否為管理者模式，決定預覽頁返回到哪個頁面
  isAdminMode: boolean = false;
  // 管理者新增問題頁，用來儲存問卷所有問題的陣列
  savedQuestionArray: Array<any> = [];
  // 打包上一頁新增問卷頁的4個問卷資料跟這頁的問卷的所有問題
  newQuestionnaireObject!:any;

  // //假資料練習
  // membership: any = {
  //     name:"小明",
  //     id:123456,
  //     age: 12,
  //     sex: "male",
  //     cart:[
  //           {
  //             name:"laptop",
  //             price:30000,
  //             color:"blue",
  //             amount:1,
  //           },
  //           {
  //             name:"mouse",
  //             price:20,
  //             color:"black",
  //             amount:1,
  //           },
  //           {
  //             name:"keyboard",
  //             price:50,
  //             color:"red",
  //             amount:1,
  //           },
  //           {
  //             name:"laptopBag",
  //             price:500,
  //             color:"black",
  //             amount:1,
  //           },

  //           ]
  // }

}

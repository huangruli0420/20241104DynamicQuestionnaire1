import { Service } from '../../service/service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormBuilder, FormArray } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-respond',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatCheckboxModule, MatRadioModule, FormsModule, CommonModule],
  templateUrl: './respond.component.html',
  styleUrl: './respond.component.scss'
})
export class RespondComponent {

  // 注入service取得上一頁列表頁的問卷資訊，以及回傳這頁回答頁使用者的基本資料給下一頁預覽頁使用
  constructor(private service: Service, private router: Router) { }

  // 固定在這個回答頁面的假問題資料，M為多選、Q單選、T為自由回答
  questionDataArray = [
    {
      questId: 1,
      need: true,
      questName: '請選擇喜歡的角色(可複選)',
      type: 'M',
      options: [
        { optionName: '高松燈', code: 'A', },
        { optionName: '千早愛音', code: 'B',  },
        { optionName: '長崎爽世', code: 'C', },
        { optionName: '豐川祥子', code: 'D',  },
      ]
    },
    {
      questId: 2,
      need: true,
      questName: '請選擇最喜歡的樂團',
      type: 'Q',
      options: [
        { optionName: 'MyGO ', code: 'A' },
        { optionName: 'Ave Mujica', code: 'B' },
      ]
    },
    {
      questId: 3,
      need: true,
      questName: '請輸入你內心的吶喊',
      type: 'T',
      options: []
    },
  ];

  // 顯示問卷名稱、時間和描述，從問卷列表頁來的，用ngOnInIt() 在回答頁一載入就執行
  questionName!: string;
  questionStartTime!: string;
  questionEndTime!: string;
  questionDcp!: string;

  // 承接使用者名稱、電話、Email和年齡，創建一個空陣列來儲存多選、單選、敘述題的回答
  rUserName!: string;
  rUserPhone!: string;
  rUserEmail!: string;
  rUserAge!: number | null;
  userSelectedAnswers: Array<any> = [];

  // 用這個方法給儲存使用者回答的陣列加上存放單選題value和文字敘述題的空字串
  pushUserAnswerColumn() {
    for (let data of this.questionDataArray) {
      //使用 const 宣告，表示 answerObj 本身不能被重新賦值，但可以更改它的屬性。answerObj 是每個問題的回答物件，包含初始化的回答資訊。
      const answerObj = {
        ...data,
        radioAnswer: '',
        textAnswer: '',
        // map是JS陣列的方法，...option 將 option 中的所有屬性複製到新的物件中，再加上 boxBoolean: false
        // 即初始化 boxBoolean 為 false。最終，options 中的每個選項物件都包含 boxBoolean 屬性。
        // 也在設定問卷初始資料時，可以在每個多選題選項的物件裡面加上checkboxboolean，提前初始化，就不用再用map
        options: data.options.map(option => ({
          ...option,
          checkboxBoolean: false, // 初始化每個選項的 `boxBoolean` 屬性為 false
          // 但這邊如果這樣寫會連單選跟文字的物件都加上checkboxBoolean:flase，在預覽頁卻只有多選題會使用這個來判斷是否要印出這個選項
          // 因為只有多選題有使用ngModel來綁定這個布林值，所以也可以選擇就在多選題的每個選項物件後面，在一開始就加上去
          // radioAnswer和textAnswer其實也只會在顯示單選和文字敘述時會用到，也可以選擇一開始在原始資料的物件就加上去
        }))
      };
      this.userSelectedAnswers.push(answerObj);
    }
  }

  ngOnInit(): void {
    // 從service載入 由問卷表格頁來的所選問卷名稱、開始結束時間、問卷描述
    this.questionName = this.service.questionName;
    this.questionStartTime = this.service.questionStartTime;
    this.questionEndTime = this.service.questionEndTime;
    this.questionDcp = this.service.questionDcp;

    // 從service載入 使用者的基本資料跟問題回答，若service中沒有這個資料，代表不是從下一頁預覽頁回到這頁回答頁
    // 則需要給儲存使用者回答的陣列，再用pushUserAnswer()方法加上存放單選題和文字敘述題答案的空字串
    if (!this.service.userSelectedAnswers) {
      this.pushUserAnswerColumn();
    } else {
      // 當service已有作答資料的話就要將使用者的資料塞進欄位
      this.rUserName = this.service.userName;
      this.rUserPhone = this.service.userPhone;
      this.rUserEmail = this.service.userEmail;
      this.rUserAge = this.service.userAge;
      this.userSelectedAnswers = this.service.userSelectedAnswers;
    }
  }

  // 在儲存使用者回答前，做一個確認都有填上必填資料與答案的方法，若回傳true則saveUserData才會儲存使用者資料及答案
  checkUserAnswer(): boolean {
    // 檢查使用者必填的基本資訊，用或(||)判斷，若其中一個沒填寫就會是if(true)，則方法會回傳false
    if (!this.rUserName || !this.rUserPhone) {
      return false;
    };
    // 檢查使用者必填的回答問題，用且(&&)判斷，若問題為必填且有找到無填寫的問題，則checkUserAnswer()為回傳false
    // this.isAnswerValid(data)若有沒填寫的問題會回傳false，加上驚嘆號會變true
    for (let data of this.userSelectedAnswers) {
      if (data.need && !this.isAnswerValid(data)) {
        return false;
      }
    }
    return true;
  }

  private isAnswerValid(data: any): boolean {
    switch (data.type) {
      // 檢查多選題是否至少有一個選項被選，.some是一種陣列方法，檢查.options裡的每個物件的checkboxBoolean
      // 只要有一個為true則會回傳true
      case 'M':
        return data.options.some((option: any) => option.checkboxBoolean);
      // 檢查單選題是否填寫回答，若沒填寫則回傳false
      case 'Q':
        return Boolean(data.radioAnswer);
      // 檢查自由回答題是否填寫回答，若沒填寫則回傳false
      case 'T':
        return Boolean(data.textAnswer);
      // 若無特定題型需求，視為符合條件
      default:
        return true;
    }
  }

  // 儲存使用者回答內容，並回傳給service帶到下一個頁面，按下確認鈕後在console顯示回答內容
  saveUserData() {
    if (this.checkUserAnswer()) {
      this.service.userName = this.rUserName;
      this.service.userPhone = this.rUserPhone;
      this.service.userEmail = this.rUserEmail;
      this.service.userAge = this.rUserAge;
      this.service.userSelectedAnswers = this.userSelectedAnswers;
      this.router.navigate(['/confirm'])
      console.log(this.userSelectedAnswers);

    } else {
      alert('請確認必填皆有填寫');
      return;
    }
  }

  // 若按返回則會觸發這個方法清除使用者資料，因此service裡的userAge要設定為number | null來接方法給的null
  clearUserData() {
    this.service.userName = '';
    this.service.userPhone = '';
    this.service.userEmail = '';
    this.service.userAge = null;
    this.service.userSelectedAnswers = null;
  }

}

// // 建立form表單跟名稱
// form!: FormGroup

// // 用來儲存使用者選擇的答案
// selectedAnswers: any[] = [];

// // ngOnInIt 建立表單、FORM表單確認條件，若從預覽頁返回這頁回答頁時回答者已填寫過基本資料，
// // 則會帶入已存儲在service的基本資料，或(||)左邊的值會優先判斷
// this.form = this.fb.group({
//   name: new FormControl(this.service.userName || '', Validators.required),
//   phone: new FormControl(this.service.userPhone || '', Validators.required),
//   email: new FormControl(this.service.userEmail || '', [Validators.required, Validators.email]),
//   age: new FormControl(this.service.userAge || ''),
//   // control代表在這個陣列裡的每一個quest就是一個物件，用來設定是否要加上必填(Validators.required)
//   responses: this.fb.array(
//     this.questArray.map(data =>{
//       const control = new FormControl(this.service.selectedAnswers||'');
//       if(data.need){
//         control.setValidators(Validators.required);
//       }
//       return control;
//     })
//   ),
// })

// =======================================
// onCheckboxChange(index: number, value: string): void {
//   const control = this.form.get(`responses.${index}`);
//   let currentValues = control?.value || [];

//   // 如果選項已存在，移除它；否則，添加它
//   if (currentValues.includes(value)) {
//     currentValues = currentValues.filter((v: string) => v !== value);
//   } else {
//     currentValues.push(value);
//   }

//   control?.setValue(currentValues);
// }

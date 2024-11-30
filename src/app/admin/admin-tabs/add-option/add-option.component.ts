import { SelectionModel } from '@angular/cdk/collections';
import { Service } from './../../../../service/service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-option',
  standalone: true,
  imports: [FormsModule,
    MatIconModule
  ],
  templateUrl: './add-option.component.html',
  styleUrl: './add-option.component.scss'
})
export class AddOptionComponent {

  constructor(private router: Router, private service: Service) { }

  // 要新增的問題名稱，是否要設定為必填
  quesName!: string;
  required: boolean = false;
  // 綁定select的值，問題種類 單選Q 多選M  文字輸入T
  type: string = "single";
  // 用來儲存要新增問題的選項物件的陣列，還有問題裡選項的初始index值
  addOptionArray: Array<any> = [];
  optionNumber = 0;
  // 用來儲存問卷所有問題的陣列
  savedQuestionArray: Array<any> = [];
  // 是否正在編輯某一個問卷問題
  isEditing: boolean = false;
  // 用來儲存目前正在編輯的問題在 savedQuestionArray 中的索引。如果值為 -1，表示沒有進行編輯操作。
  editingIndex: number = -1;

  ngOnInit(): void {
    this.savedQuestionArray = this.service.savedQuestionArray;
  }

  // 按下"增加選項"按鈕可以增加問題裡的選項數量的方法 =====================================================================
  addOption() {
    this.optionNumber++;
    this.addOptionArray.push({ option : "", optionNumber: this.optionNumber })
  }
  // 按下"移除選項"按鈕可以減少問題裡的選項數量的方法
  removeOption() {
    if (this.addOptionArray.length > 0) {
      this.addOptionArray.pop(); // 移除最後一個選項
      this.optionNumber--; // 遞減選項 ID
    }
  }

  // 當問題類型為文字題時，重新設定選項的數量為0
  changeSelect() {
    // 根據不同的 type 類型可清除或設置特定選項
    if (this.type === 'text') {
      this.optionNumber = 0;
      this.addOptionArray = []; // 若為文字輸入則清空選項
    }
  }

  // 決定好問卷名稱和問卷選項之後儲存問題的方法 =============================================================================
  saveQuestion() {
    // 不管哪種題型都要檢查有無問卷名稱，不能為null或用trim去掉空格確保名稱不能為一堆空格
    if (typeof this.quesName !== 'string' || !this.quesName.trim()) {
      alert('請輸入問題名稱')
      return;
    }
    // 若不是文字敘述題則要檢查選項數量，及是否都有輸入選項名稱
    if (this.type !== "text") {
      if (this.addOptionArray.length < 2) {
        alert('請至少加入兩個選項')
        return;
      }
      for (let option of this.addOptionArray) {
        if (typeof option.option !== 'string' || !option.option.trim()) {
          alert('請確認此問題的每個選項都有名稱')
          return;
        }
      }
    }
    this.savedQuestionArray.push(
      {quesId: this.savedQuestionArray.length+1,quesName: this.quesName, options: this.addOptionArray, type: this.type, required: this.required }
    );
    console.log(this.savedQuestionArray);

    this.resetForm();
  }

  // 重置所有要用來新增一個問題所使用的資料
  resetForm() {
    this.quesName = "";
    this.required = false;
    this.type = "single";
    this.addOptionArray = [];
    this.optionNumber = 0;
  }

  // 刪除最左邊一行checkbox被選取的問卷題目==============================================================================
  deleteSelectedQuestion() {
    // 過濾掉 `selected` 為 true 的項目
    this.savedQuestionArray = this.savedQuestionArray.filter(question => !question.selected);
    // 可選：檢查是否有已刪除的項目
    console.log('剩餘問題:', this.savedQuestionArray);
  }

  // 編輯最左邊一行checkbox被選取的問卷題目
  editSelectedQuestion() {
    let selectedQuestions = this.savedQuestionArray.filter(question => question.selected);
    if (selectedQuestions.length !== 1) {
      alert('請選擇一個問題進行編輯');
      return;
    }
    this.isEditing = true;

    let questionToEdit = selectedQuestions[0];

    this.quesName = questionToEdit.quesName;
    this.type = questionToEdit.type;
    this.required = questionToEdit.required;
    this.addOptionArray = [...questionToEdit.options];
    this.optionNumber = questionToEdit.options.length;

    this.editingIndex = this.savedQuestionArray.indexOf(questionToEdit);
  }

  // 儲存編輯完的問卷題目，editedQuestion.name.trim()若不是空的會回傳true，所以要加!
  saveSelectedQuestion() {

    let editedQuestion = {
      quesName: this.quesName,
      options: this.addOptionArray,
      type: this.type,
      required: this.required,
    };

    if (typeof editedQuestion.quesName !== 'string' || !editedQuestion.quesName.trim()) {
      alert('請輸入問題名稱')
      return;
    }
    // 若不是文字敘述題則要檢查選項數量，及是否都有輸入選項名稱
    if (editedQuestion.type !== "text") {
      if (editedQuestion.options.length < 2) {
        alert('請至少加入兩個選項')
        return;
      }
      for (let option of editedQuestion.options) {
        if (typeof option.option !== 'string' || !option.option.trim()) {
          alert('請確認此問題的每個選項都有名稱')
          return;
        }
      }
    }

    // 更新至原列表
    this.savedQuestionArray[this.editingIndex] = editedQuestion;

    console.log(this.savedQuestionArray);

    // 重置編輯狀態
    this.isEditing = false;
    this.editingIndex = -1;
    this.resetForm();
  }

  //    ====================================================================================================
  goAddQuestion() {
    this.router.navigate(['/admin-tabs/add-question']);
  }

  goAddPreview() {
    if (this.savedQuestionArray.length < 1) {
      alert('請至少輸入一個問題');
      return;
    }

    // 檢查問卷名稱、描述、開始時間和結束時間是否存在且有效
    if (typeof this.service.addQuestionnaireName !== 'string' || !this.service.addQuestionnaireName.trim() ||
      typeof this.service.addQuestionnaireDcp !== 'string' || !this.service.addQuestionnaireDcp.trim() ||
      !this.service.addQuestionnaireStartTime || !this.service.addQuestionnaireEndTime) {
      alert('請確認問卷的名稱、描述、開始時間和結束時間都已填寫');
      return;
    }

    this.service.savedQuestionArray = this.savedQuestionArray;

    this.service.newQuestionnaireObject = {
      name: this.service.addQuestionnaireName,
      description: this.service.addQuestionnaireDcp,
      startDate: this.service.addQuestionnaireStartTime,
      endDate: this.service.addQuestionnaireEndTime,
      quesList: this.savedQuestionArray,
    }

    this.router.navigate(['/admin-tabs/add-preview']);
  }

}

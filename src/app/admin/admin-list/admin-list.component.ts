import { Component,ViewChild, ChangeDetectionStrategy, } from '@angular/core';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Service } from '../../../service/service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, RouterLink,} from '@angular/router';
import { chinesePaginator } from '../../../paginator/chinesePaginator';
import { MatIconModule } from '@angular/material/icon';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  // 修改Table
  providers: [provideNativeDateAdapter(),
  {
    provide: MatPaginatorIntl,
    useFactory: chinesePaginator
  }
  ],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatPaginator,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatIconModule,
    MatCheckboxModule,
],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss',
  // ICON相關
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AdminListComponent {

  // 注入service裡面的changeDateFormat方法
  constructor(private service: Service, private router: Router) { }

  //讓搜尋的起始日期變成今天，用service裡面的方法
  minDate!: string;
  // ngOnInit(): void {
  //   this.minDate = (this.service.changeDateFormat(new Date(), '-'));
  // }
  //======================================================================================

  //複製貼上Angular表單
  displayedColumns: string[] = ['select', 'number', 'name', 'status', 'startTime', 'endTime', 'result'];
  dataSource = new MatTableDataSource<QuestionnaireFormat>(QuestionnaireData);
  // 最左邊一行checkbox選取
  selection = new SelectionModel<QuestionnaireFormat>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // 登出按鈕轉移到使用者頁面的方法
  adminSignOut() {
    this.service.isAdminMode = false;
    this.router.navigate(['/list']);
  }

  addQuestionnaire() {
    this.router.navigate(['/admin-tabs/add-question'])
  }

  deleteQuestionnaire() {

  }

  // checkBox
  // 全選判斷方法
  isAllSelected() {
    let numSelected = this.selection.selected.length;
    let numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // 切換全選與取消全選
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }



  //讓搜尋欄位可以即時搜尋並在F12主控台顯示搜尋內容的方法
  filteredByName(event: Event) {
    console.log((event.target as HTMLInputElement).value)
    //即時搜尋，先新建一個空陣列，遍歷原本的資料，若有問卷名有符合搜尋的值則會問卷會加進空陣列
    let filteredData: QuestionnaireFormat[] = [];
    QuestionnaireData.forEach((res) => {
      if (res.name.indexOf((event.target as HTMLInputElement).value) != -1) {
        filteredData.push(res)
      }
    })
    // 讓顯示的資料陣列=新的已篩選完資料的陣列
    this.dataSource.data = filteredData;
  }

  //暫存讓service的問卷名字、問卷開始結束時間等於點擊的問卷名字和時間
  storeData(name: string, startTime: string, endTime: string, dcp: string) {
    this.service.questionName = name;
    this.service.questionStartTime = startTime;
    this.service.questionEndTime = endTime;
    this.service.questionDcp = dcp;
  }

  // 先用ngModel儲存使用者選擇的日期，然後按下按鈕用方法以日期搜尋
  chooseSDate!: string;
  chooseEDate!: string;

  filteredByDate() {
    // 若使用者未選擇開始或結束時間則無法使用時間來搜尋
    if (!this.chooseSDate || !this.chooseEDate) {
      alert("請輸入完整搜尋區間");
      return;
    }
    // 檢查輸入統計時間的開始和結束日期
    console.log(this.chooseSDate, this.chooseEDate);
    //新建一個空陣列
    let filteredData: QuestionnaireFormat[] = [];
    // 先轉型使用者輸入日期
    let chooseEDate = new Date(this.chooseEDate);
    let chooseSDate = new Date(this.chooseSDate);
    //遍歷所有資料的日期並轉型成Date格式才能比大小，如有符合則加入新陣列
    QuestionnaireData.forEach((res) => {
      let endTime = new Date(res.endTime);
      let startTime = new Date(res.startTime);
      // 若有符合使用者搜尋時間的問卷則加入
      if (chooseSDate <= startTime && endTime <= chooseEDate) {
        filteredData.push(res)
      }
    })
    //修改資料陣列
    this.dataSource.data = filteredData;
  }


}
// class底部===================================================================



//問卷格式的介面 ==============================================================
export interface QuestionnaireFormat {
  number: number;
  name: string;
  status: string;
  startTime: string;
  endTime: string;
  result: string;
  dcp: string;
}
// ===================================================================


//問卷資料 ==============================================================
const QuestionnaireData: QuestionnaireFormat[] = [
  {
    number: 447,
    name: 'MyGO',
    status: "進行中",
    startTime: '2024/12/05',
    endTime: '2024/12/31',
    result: '前往',
    dcp: "「願意與我組樂團一生嗎？」這是高一春季結束的時候，在羽丘女子學園，每個人都在參與樂團，剛入學的愛音也急忙尋找樂團成員，希望能早點融入班級。在這期間，她得知被稱為「羽丘的不思議女孩」的燈還沒有加入任何樂團，愛音有些不確定地向她提議……我們滿是傷痕、笨拙的<音樂（呼喊）>。即便是迷失的人也好，只要有所前進就好。",
  },
  {
    number: 446,
    name: '地下城中的人',
    status: "進行中",
    startTime: '2024/12/01',
    endTime: '2024/12/31',
    result: '前往',
    dcp: "為了追尋消失的父親，盜賊少女「克蕾伊」獨自一人探索地下城，就在她與怪物戰鬥時，地下城的牆壁竟然塌落，此時，從斷垣殘壁中出現了一名自稱管理員的少女？這是由地下城工作者們交織出的地下迷宮城工作奇幻故事。",
  },
  { number: 445, name: 'E312購買傾向市調', status: "尚未開始", startTime: '2024/11/12', endTime: '2024/12/31', result: '前往', dcp: " " },
  { number: 444, name: '青春洋溢高中生投票站', status: "進行中", startTime: '2024/08/12', endTime: '2024/11/01', result: '前往', dcp: " " },
  { number: 443, name: '尾牙餐廳預選', status: "已結束", startTime: '2024/08/01', endTime: '2024/10/12', result: '前往', dcp: " " },
  { number: 442, name: '中秋禮盒預選', status: "已結束", startTime: '2024/07/15', endTime: '2024/09/20', result: '前往', dcp: " " },
  { number: 441, name: 'E300購買傾向市調', status: "已結束", startTime: '2024/07/14', endTime: '2024/08/31', result: '前往', dcp: " " },
  { number: 440, name: 'Q2最佳員工', status: "已結束", startTime: '2024/06/18', endTime: '2024/07/05', result: '前往', dcp: " " },
  { number: 339, name: '07/03大會參加統計', status: "已結束", startTime: '2024/06/03', endTime: '2024/06/30', result: '前往', dcp: " " },
  { number: 333, name: '第6期好員工票選大賽', status: "已結束", startTime: '2024/05/15', endTime: '2024/06/20', result: '前往', dcp: " " },
  { number: 332, name: '05/20會議參加統計', status: "已結束", startTime: '2024/04/08', endTime: '2024/05/18', result: '前往', dcp: " " },
];


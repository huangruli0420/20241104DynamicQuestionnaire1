import { Component } from '@angular/core';
import { Service } from '../../service/service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {


  constructor(private service: Service,private router:Router) { }

  //問卷名稱、時間和描述，在頁面一載入就執行
  questionName!: string;
  questionStartTime!: string;
  questionEndTime!: string;
  questionDcp!: string;

  //
  userName!: string;
  userPhone!: string;
  userEmail!: string;
  userAge!: number | null;
  userSelectedAnswers!:Array<any>;


  ngOnInit(): void {
    this.questionName = this.service.questionName;
    this.questionStartTime = this.service.questionStartTime;
    this.questionEndTime = this.service.questionEndTime;
    this.questionDcp = this.service.questionDcp

    this.userName = this.service.userName ;
    this.userPhone = this.service.userPhone;
    this.userEmail = this.service.userEmail;
    this.userAge = this.service.userAge;
    this.userSelectedAnswers = this.service.userSelectedAnswers;
  }

  goBackList(){
    this.service.userName = '';
    this.service.userPhone = '';
    this.service.userEmail = '';
    this.service.userAge = null ;
    this.service.userSelectedAnswers = null;
    this.router.navigate(['/list']);
  }

}

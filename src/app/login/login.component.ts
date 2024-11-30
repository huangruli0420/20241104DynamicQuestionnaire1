import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../service/service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router:Router,private service: Service){}

  goBackList(){
    this.router.navigate(['/list'])
  }

  adminSignIn(){
    this.service.isAdminMode = true;
    this.router.navigate(['/admin-list'])
  }

}

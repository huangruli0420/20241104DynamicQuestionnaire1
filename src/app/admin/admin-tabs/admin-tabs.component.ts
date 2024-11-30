import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-tabs',
  standalone: true,
  imports: [MatTabsModule,
    RouterLink,
    // RouterLinkActive,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './admin-tabs.component.html',
  styleUrl: './admin-tabs.component.scss'
})
export class AdminTabsComponent {

    // 設定頁籤的路由
    links = [
      { path: '/admin-tabs/add-question', name: '問卷' },
      { path: '/admin-tabs/add-option', name: '題目' },
      { path: '/admin-tabs/add-preview', name: '預覽' },
      { path: '/admin-tabs/feedback', name: '回饋' },
    ]
    activeLink = this.links[0].name;

    // 建構方法
  constructor(private router: Router,) {
    // 抓取路由變換
    this.router.events.subscribe((event: any) => {
      // 當變換結束(End)抓取路由的url去做判斷別請更改tabs選項
      if (event instanceof NavigationEnd) {
        for (let link of this.links) {
          if (link.path == event.url) {
            this.activeLink = link.name;
          }
        }
      }
    });
  }

}

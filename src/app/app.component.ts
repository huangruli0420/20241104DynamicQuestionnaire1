import { Component } from '@angular/core';
import { Router,RouterLink,RouterLinkActive,RouterOutlet  } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '20241104DynamicQuestionnaire';
}

import { Component } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RespondComponent } from './respond/respond.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { AdminTabsComponent } from './admin/admin-tabs/admin-tabs.component';
import { LoginComponent } from './login/login.component';
import { AddQuestionComponent } from './admin/admin-tabs/add-question/add-question.component';
import { AddOptionComponent } from './admin/admin-tabs/add-option/add-option.component';
import { FeedbackComponent } from './admin/admin-tabs/feedback/feedback.component';
import { AddPreviewComponent } from './admin/admin-tabs/add-preview/add-preview.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'respond', component: RespondComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-list', component: AdminListComponent },
  { path: 'admin-tabs', component: AdminTabsComponent,
    children : [
      {path: 'add-question',component: AddQuestionComponent},
      {path: 'add-option',component: AddOptionComponent},
      {path: 'add-preview',component: AddPreviewComponent },
      {path: 'feedback',component: FeedbackComponent},
    ]
  },
];

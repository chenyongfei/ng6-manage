import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './service/api.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { HeadTopComponent } from './component/head-top/head-top.component';


// 注册组件和指令
const COMPONENTS = [
  HeadTopComponent
];
const DIRECTIVES = [];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpClientModule
  ],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  providers: [
    ApiService
  ]
})
export class ShareModule { }

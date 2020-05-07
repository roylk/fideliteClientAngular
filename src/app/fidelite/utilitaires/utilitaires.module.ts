import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationComponent} from '../pagination/pagination.component';
import {LoaderComponent} from '../loader/loader.component';
import { AutoRefreshComponent } from '../auto-refresh/auto-refresh.component';



@NgModule({
  declarations: [PaginationComponent,LoaderComponent, AutoRefreshComponent],
  exports : [PaginationComponent, LoaderComponent, AutoRefreshComponent],
  imports: [
    CommonModule,
  ]
})
export class UtilitairesModule { }

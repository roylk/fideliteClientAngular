import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationComponent} from '../pagination/pagination.component';
import {LoaderComponent} from '../loader/loader.component';



@NgModule({
  declarations: [PaginationComponent,LoaderComponent],
  exports : [PaginationComponent, LoaderComponent],
  imports: [
    CommonModule,
  ]
})
export class UtilitairesModule { }

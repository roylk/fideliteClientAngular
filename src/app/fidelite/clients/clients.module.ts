import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {ListerClientsComponent} from './lister-clients/lister-clients.component';
import {ClientsRoutingModule} from './clients-routing.module';
import { CreerClientsComponent } from './creer-clients/creer-clients.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { DetailClientsComponent } from './detail-clients/detail-clients.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import {UtilitairesModule} from '../utilitaires/utilitaires.module';


@NgModule({
  declarations: [
    ListerClientsComponent,
    CreerClientsComponent,
    EditClientComponent,
    DetailClientsComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatTableModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatSidenavModule, 
    MatIconModule,
    MatListModule, 
    MatFormFieldModule,
    MatInputModule,
    AlertModule.forRoot(),
    UtilitairesModule
  ]
})
export class ClientsModule { }

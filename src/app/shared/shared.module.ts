import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './_components';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { PapaParseModule } from 'ngx-papaparse';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    // PapaParseModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    SidebarComponent,
    Ng2SmartTableModule,
    // PapaParseModule
  ],
  providers: []
})
export class SharedModule { }

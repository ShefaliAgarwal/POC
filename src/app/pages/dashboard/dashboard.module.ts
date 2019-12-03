import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent, CustomRendererComponent } from './dashboard.component';
import { DashboarRoutingdModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScanComponent } from './scan/scan.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CustomRendererComponent,
    ScanComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboarRoutingdModule
  ],
  entryComponents: [CustomRendererComponent],
  providers: []
})
export class DashboardModule { }

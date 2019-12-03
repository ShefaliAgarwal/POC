import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardService } from 'src/app/shared/_services';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit, OnDestroy {
  unsubscribeAll: Subject<boolean> = new Subject<boolean>();
  manufacturerData: any = [];
  distrubatorData: any = [];
  wholesalerData: any = [];
  retailerData: any = [];
  manufactureObj;
  distrubatorObj;
  wholesalerObj;
  retailerObj;

  id: any;
  constructor(private router: Router, private dashBoardService: DashboardService, private route: ActivatedRoute) {
    this.dashBoardService.manufacturerData.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
      if (data != null) {
        this.manufacturerData = data;
      }
    })
    this.dashBoardService.distrubutorData.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
      if (data != null && data.length) {
        this.distrubatorData = data;
      }
    })
    this.dashBoardService.wholeSalerData.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
      if (data != null && data.length) {
        this.wholesalerData = data;
      }
    })
    this.dashBoardService.retailerData.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
      if (data != null && data.length) {
        this.retailerData = data;
      }
    })
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log('this.id')
    this.getObj()
  }
  getObj() {
    if (this.manufacturerData.length) {
      this.manufacturerData.forEach(ele => {
        if (ele.QRID == this.id) {
          this.manufactureObj = ele;
        }
      })
    }
    if (this.distrubatorData.length) {
      this.distrubatorData.forEach(ele => {
        if (ele.QRID == this.id) {
          this.distrubatorObj = ele;
        }
      })
    }
    if (this.wholesalerData.length) {
      this.wholesalerData.forEach(ele => {
        if (ele.QRID == this.id) {
          this.wholesalerObj = ele;
        }
      })
    }
    if (this.retailerData.length) {
      this.retailerData.forEach(ele => {
        if (ele.QRID == this.id) {
          this.retailerObj = ele;
        }
      })
    }
    console.log('manufacture', this.manufactureObj)
    console.log('distrubatorObj', this.distrubatorObj)
    console.log('wholesalerObj', this.wholesalerObj)
    console.log('retailerObj', this.retailerObj)
  }
  onBack() {
    this.router.navigate(['/pages/dashboard']);
  }
  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }
}

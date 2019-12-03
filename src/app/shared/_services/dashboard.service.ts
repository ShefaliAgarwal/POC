import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  csvData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  manufacturerData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  distrubutorData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  wholeSalerData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  retailerData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }
}

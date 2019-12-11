import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import * as Papa from 'papaparse';
import { Subscription, Subject } from 'rxjs';
import { DashboardService } from 'src/app/shared/_services';
import { takeUntil } from 'rxjs/operators';

@Component({ templateUrl: 'dashboard.component.html', providers: [DatePipe] })
export class DashboardComponent implements OnInit, OnDestroy {
    dateFormat = 'yyyy-MM-dd';
    fileToUpload: File = null;
    docHash: any = '';
    manufacturersource: LocalDataSource = new LocalDataSource();
    distrubatorsource: LocalDataSource = new LocalDataSource();
    wholesalersource: LocalDataSource = new LocalDataSource();
    retailersource: LocalDataSource = new LocalDataSource();
    manfuacturerData = [];
    distrubatorData = [];
    wholesalerData = [];
    retailerData = [];
    unsubscribeAll: Subject<boolean> = new Subject<boolean>();
    settings = {
        actions: false,
        columns: {
            AssetID: {
                title: 'Asset ID',
                filter: false,
            },
            AssetName: {
                title: 'Asset Name',
                filter: false,
            },
            QRID: {
                title: 'QRID',
                filter: false,
                type: 'custom',
                renderComponent: CustomRendererComponent,
                onComponentInitFunction: (instance) => {
                    instance.save.subscribe(data => {
                        if (data) {

                        }
                    });
                },
                // valuePrepareFunction: (date, row) => {
                //     return row.AssetID + row.AssetName.substring(0, 4) + row.BOXID.substring(0, 6) + row.ConsignmentID.substring(0, 6)
                // }
            },
            BOXID: {
                title: 'Box ID',
                filter: false,
            },
            ConsignmentID: {
                title: 'Consignment ID',
                filter: false,
            },
            Owner: {
                title: 'Transaction ID',
                filter: false,
                valuePrepareFunction: () => {
                    return 'XXXXXXXXXXXXXXXX'
                }
            },
            MfgDateTime: {
                title: 'Received Date',
                filter: false,
                // valuePrepareFunction: (date) => {
                //     var raw = new Date(date);
                //     if (raw) {
                //         return this.datePipe.transform(raw, 'dd/MM/yyyy HH:mm:ss.SSS');
                //     }
                // }
            }
        },
        pager: {
            display: true,
            perPage: 25
        }
    };
    isManufacturer = false;
    isDistributor = false;
    isWholesaler = false;
    isRetailer = false;
    test = [];

    constructor(private router: Router, private datePipe: DatePipe, private toasterService: ToastrService,
        private dashboardService: DashboardService
    ) {
        this.manfuacturerData = JSON.parse(localStorage.getItem('Manufacture'));
        if (this.manfuacturerData) {
            this.isManufacturer = true;
            this.manufacturersource.load(this.manfuacturerData);
        }
        console.log('observable manufacutre dashboard', this.manfuacturerData);
        this.distrubatorData = JSON.parse(localStorage.getItem('Distributor'));
        if (this.distrubatorData) {
            this.isDistributor = true;
            this.distrubatorsource.load(this.distrubatorData);
        }

        this.wholesalerData = JSON.parse(localStorage.getItem('Wholesaler'));
        if (this.wholesalerData) {
            this.isWholesaler = true;
            this.wholesalersource.load(this.wholesalerData);
        }

        this.retailerData = JSON.parse(localStorage.getItem('Retailer'));
        if (this.retailerData) {
            this.isRetailer = true;
            this.retailersource.load(this.retailerData);
        }

        // this.dashboardService.manufacturerData.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
        //     if (data != null && data.length) {
        //         this.isManufacturer = true;
        //         this.manfuacturerData = data;
        //         console.log('observable manufacutre dashboard', this.manfuacturerData);
        //         this.manufacturersource.load(data);
        //     }
        // });
        // this.dashboardService.distrubutorData.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
        //     if (data != null && data.length) {
        //         this.isDistributor = true;
        //         this.distrubatorData = data;
        //         console.log('observable distrubatorData dashboard', this.distrubatorData);
        //         this.distrubatorsource.load(data);
        //     }
        // })
        // this.dashboardService.wholeSalerData.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
        //     if (data != null && data.length) {
        //         this.isWholesaler = true;
        //         this.wholesalerData = data;
        //         console.log('observable wholesalerData dashboard', this.wholesalerData);
        //         this.wholesalersource.load(data);
        //     }
        // })
        // this.dashboardService.retailerData.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
        //     if (data != null && data.length) {
        //         this.isRetailer = true;
        //         this.retailerData = data;
        //         console.log('observable retailerData dashboard', this.retailerData);
        //         this.retailersource.load(data);
        //     }
        // })
        this.dashboardService.csvData.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
            if (data != null && data.length) {
                this.test = data;
            }
        })
    }

    ngOnInit() {

    }
    ngOnDestroy() {
        this.unsubscribeAll.next(true);
        this.unsubscribeAll.complete();
    }
    handleFileInput(files) {
        var file = files[0];
        this.fileToUpload = files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (event: any) => {
            var csv = event.target.result; // Content of CSV file
            Papa.parse(csv, {
                skipEmptyLines: true,
                header: true,
                complete: (results) => {
                    this.test = results.data;
                    this.dashboardService.csvData.next(this.test);
                    console.log('Parsed: k', results.data);
                }
            });
        }
    }
    onUploadFile() {
        if (this.fileToUpload != null) {
            console.log('json', this.test);
            this.isManufacturer = true;
            this.isDistributor = false;
            this.isRetailer = false;
            this.isWholesaler = false;
            this.dashboardService.distrubutorData.next(null);
            this.dashboardService.wholeSalerData.next(null);
            this.dashboardService.retailerData.next(null);
            this.manfuacturerData = this.test;
            if (this.manfuacturerData.length) {
                this.manfuacturerData.forEach(ele => {
                    ele['MfgDateTime'] = this.datePipe.transform(new Date(Date.now()), 'dd/MM/yyyy HH:mm:ss.SSS');
                    ele['QRID'] = ele.AssetID + ele.AssetName.substring(0, 4) + ele.BOXID.substring(0, 6) + ele.ConsignmentID.substring(0, 6)
                })
                setTimeout(ele => {
                    localStorage.setItem('Manufacture', JSON.stringify(this.manfuacturerData));
                    // this.dashboardService.manufacturerData.next(this.manfuacturerData);
                    this.manufacturersource.load(this.manfuacturerData);
                }, 400);
            }

        } else {
            this.toasterService.error('Select File to Upload!!');
        }
    }
    onTransfer(role) {
        console.log('this.test', this.test)
        switch (role) {
            case 'Manufacturer': {
                this.isDistributor = true;
                this.distrubatorData = this.test;
                if (this.distrubatorData.length) {
                    this.distrubatorData.forEach(ele => {
                        ele['MfgDateTime'] = this.datePipe.transform(new Date(Date.now()), 'dd/MM/yyyy HH:mm:ss.SSS');
                        ele['QRID'] = ele.AssetID + ele.AssetName.substring(0, 4) + ele.BOXID.substring(0, 6) + ele.ConsignmentID.substring(0, 6)
                    })
                    setTimeout(ele => {
                        localStorage.setItem('Distributor', JSON.stringify(this.distrubatorData));
                        // this.dashboardService.distrubutorData.next(this.distrubatorData);
                        this.distrubatorsource.load(this.distrubatorData);
                    }, 400);
                }

                break;
            }
            case 'Distributor': {
                this.isWholesaler = true;
                this.wholesalerData = this.test;
                if (this.wholesalerData.length) {
                    this.wholesalerData.forEach(ele => {
                        ele['MfgDateTime'] = this.datePipe.transform(new Date(Date.now()), 'dd/MM/yyyy HH:mm:ss.SSS');
                        ele['QRID'] = ele.AssetID + ele.AssetName.substring(0, 4) + ele.BOXID.substring(0, 6) + ele.ConsignmentID.substring(0, 6)
                    })
                    setTimeout(ele => {
                        localStorage.setItem('Wholesaler', JSON.stringify(this.wholesalerData));
                        // this.dashboardService.wholeSalerData.next(this.wholesalerData);
                        this.wholesalersource.load(this.wholesalerData);
                    }, 400);
                }

                break;
            }
            case 'Wholesaler': {
                this.isRetailer = true;
                this.retailerData = this.test;
                if (this.retailerData.length) {
                    this.retailerData.forEach(ele => {
                        ele['MfgDateTime'] = this.datePipe.transform(new Date(Date.now()), 'dd/MM/yyyy HH:mm:ss.SSS');
                        ele['QRID'] = ele.AssetID + ele.AssetName.substring(0, 4) + ele.BOXID.substring(0, 6) + ele.ConsignmentID.substring(0, 6)
                    })
                    setTimeout(ele => {
                        localStorage.setItem('Retailer', JSON.stringify(this.retailerData));
                        // this.dashboardService.retailerData.next(this.retailerData);
                        this.retailersource.load(this.retailerData);
                    }, 400);
                }

                break;
            }
        }
    }
}
@Component({
    selector: 'app-custom-renderer',
    template: `<span class="font-medium-1 mr-2" style="cursor:pointer;color:blue;" (click)="getDescription()">
    {{value}}</span>`
})

export class CustomRendererComponent implements OnInit {
    str;
    @Output() save: EventEmitter<any> = new EventEmitter();
    constructor(private router: Router,
        private toasterService: ToastrService) {
    }
    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;

    ngOnInit() {
    }
    getDescription() {
        this.router.navigate(['/pages/scan/' + this.value]);
    }
}
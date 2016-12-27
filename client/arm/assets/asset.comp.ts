/*
*Author: Pascal Tene
*Created: Sept 2016
*Last Updated: 30 Nov, 2016
*/
import { Component, OnInit, ViewContainerRef, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Asset } from './asset';
import { AssetService } from './asset.service';
import { AuthService } from '../auth.service';
import { Location } from '../locations/location';
import { LocationService } from '../locations/location.service';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { AssetDetailsComponent } from  './details/asset-details.component';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'confirm-delete-dialog',
  template: `
  <h3> Delete this asset ?: {{ assetToDelete.name }} </h3>
  <p>Click yes to permanently delete the asset </p>
  <button class="btn btn-success" (click)="dialogRef.close() " >Cancel</button> <button class="btn btn-danger" (click)="dialogRef.close('Yes')">Yes delete</button>
  `
})

export class ConfirmDeleteAssetComponent implements OnInit {
  assetToDelete = {};

  constructor(
    private assetService: AssetService,
    public dialogRef: MdDialogRef<any>
  ){}

  ngOnInit() : void {
    this.assetToDelete = this.assetService.assetToDelete;
  }
}

//Asset help component

@Component({
  moduleId: module.id,
  selector:'asset-help-dialog',
  templateUrl:'asset-help.comp.html'
})

export class AssetHelpComponent {
  constructor(
    public dialogRef: MdDialogRef<any>
  ){}
}



@Component({
    moduleId: module.id, //this is required for the template and css to load from html or css file
    selector: 'manage-asset',
    animations: [
      trigger(
        'searchAnimation', [
          transition(':enter', [
            style({transform: 'translateX(100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
          ]),
          transition(':leave', [
            style({transform: 'translateX(0)', opacity:1}),
            animate('900ms', style({transform: 'translateX(100%)', opacity: 0}))
          ]),
        ]
      )
    ],
    templateUrl: 'asset.comp.html',
    styleUrls: ['asset.comp.css'],
})

export class AssetComponent implements OnInit {
    @ViewChild('sidenav') sidenav: MdSidenav;
    @ViewChild('leftSidenav') leftSidenav: MdSidenav;
    @ViewChild('createAssetSidenav') createAssetSidenav: MdSidenav;
    assetCreated = false;
    currentAsset = {};
    locations: Location[];
    assets: Asset[];
    dialogRef: MdDialogRef<any>;
    mouseIn = 100;
    mouseOnButton = 100;
    assetIdExist = false;
    defaultStr = 'Select a location';
    private searchTerms = new Subject<string>();
    public assetsFound: Observable<Asset[]>;
    newAsset: Asset = {
        _id: '',
        name: '',
        uniqueIdNumber: '',
        cost: +'',
        currentValue: +'',
        manufacturer: '',
        location: ''
    }

    constructor(
        private locationService: LocationService,
        private assetService: AssetService,
        private authService: AuthService,
        private router: Router,
        public viewContainerRef: ViewContainerRef,
        public dialog: MdDialog

    ) { }



    resetFormErrors() {
      this.assetIdExist = false;
    }

    mover(i) {
        this.mouseIn = i;
    }

    mout() {
        this.mouseIn = 100;
    }

    setMouseOnButton(i) {
      this.mouseOnButton = i;
    }

    unSetMouseOnButton() {
      this.mouseOnButton = 100;
    }

    getLocations(): void {
        this.locationService.getLocations().then((locations) => {
            this.locations = locations;
        })
    }

    getAssets(): void {
        this.assetService.getAssets().then((assets) => {
            this.assets = assets;
        })
    }

    create(asset: Asset): void {
      if(this.contains(this.assets, asset.uniqueIdNumber)){
        this.assetIdExist = true;
        //refresh the local asset list. useful when a user click update asset, then clicks create asset and only changes the asset uniqueId
        this.getAssets();
        return;
      } else {
          this.assetIdExist = false;
          delete asset._id; // the _id will be automatically created by mongoDb. Providing an empty _id will cause a database failure
          this.assetService.create(asset).then((res) => {
              if(res.name !== undefined) {
                  this.getAssets();
                  this.router.navigate(['/assets']);
                  this.assetCreated = true;
                  this.createAssetSidenav.close();
              } else {
                this.assetCreated = false;
              }

          }).catch((err) => {
              //console.log(err);
          });
        }
    }

    //Rturns true if any asset already has the uniqueId supplied.
    contains(assets: Asset[], uniqueId: String): boolean {
      for (var i = 0; i < assets.length; i++) {
        if (assets[i].uniqueIdNumber.trim() === uniqueId.trim()) {
          return true;
        }
      }
      return false;
    }

    delete(asset: Asset): void {
      this.assetService.delete(asset).then(() => {
        this.assets = this.assets.filter(function(arr){
          //return ann array with all values different from asset
          return arr !== asset;
        })
      })
      .catch((err) => {
        //console.log(err);
      })
    }

    showDetails(asset: Asset) {
      this.currentAsset = asset;
      this.leftSidenav.open();
    }

    update(asset: Asset) {
      console.log("Updating asset: ", asset);
      this.assetService.update(asset);
    }

    openConfirmDeleteDialog(exportClass, asset:Asset) {
      const config = new MdDialogConfig();
      config.viewContainerRef = this.viewContainerRef;
      this.assetService.assetToDelete = asset;
      this.dialogRef = this.dialog.open(ConfirmDeleteAssetComponent, config);

      this.dialogRef.afterClosed().subscribe((result) => {
        if(result === 'Yes') {
          this.delete(asset);
        }
      });

      this.dialogRef = null;
    }

    openAssetHelpDialog(exportClass) {
      const config = new MdDialogConfig();
      config.viewContainerRef = this.viewContainerRef;
      this.dialogRef = this.dialog.open(AssetHelpComponent, config);
    }

    ngOnInit(): void {
        this.getLocations();
        this.getAssets();

        this.assetsFound = this.searchTerms
                .debounceTime(300)
                .distinctUntilChanged()
                .switchMap(term => term ? this.assetService.search(term): Observable.of<Asset[]>([]))
                .catch((err) => {
                  return Observable.of<Asset[]>([]);
                });



    }

    search(term: string): void {
      this.searchTerms.next(term);
    }


    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }



}

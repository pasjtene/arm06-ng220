/*
*Author: Pascal Tene
*Created: Sept 2016
*Last Updated: 11 Nov, 2016
*/
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Asset } from './asset';
import { AssetService } from './asset.service';
import { Location } from '../locations/location';
import { LocationService } from '../locations/location.service';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';


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



@Component({
    moduleId: module.id, //this is required for the template and css to load from html or css file
    selector: 'manage-asset',
    templateUrl: 'asset.comp.html',
    styleUrls: ['asset.comp.css']
})

export class AssetComponent implements OnInit {
    @ViewChild('sidenav') sidenav: MdSidenav;
    @ViewChild('createAssetSidenav') createAssetSidenav: MdSidenav;
    assetCreated = false;
    currentAsset = {};
    locations: Location[];
    assets: Asset[];
    dialogRef: MdDialogRef<any>;
    mouseIn = 100;
    mouseOnButton = 100;
    assetIdExist = false;
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
        private router: Router,
        public viewContainerRef: ViewContainerRef,
        public dialog: MdDialog

    ) { }

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

    ngOnInit(): void {
        this.getLocations();
        this.getAssets();
    }


}

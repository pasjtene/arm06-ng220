import { Component, OnInit } from '@angular/core';
import { AssetService } from '../asset.service';
import { Asset } from '../asset';

@Component ({
  moduleId: module.id,
  selector: 'asset-details',
  templateUrl: 'asset-details.component.html'
})

export class AssetDetailsComponent implements OnInit {
  currentAsset = {};

  constructor(
    private assetService: AssetService
  ){
    this.currentAsset = this.assetService.currentAsset;
  }

  setCurrentAsset(asset: Asset) {
    this.currentAsset = asset;
  }

  ngOnInit(): void {
    this.currentAsset = this.assetService.currentAsset;
  }
}

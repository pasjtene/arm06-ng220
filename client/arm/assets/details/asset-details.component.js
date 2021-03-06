"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var asset_service_1 = require("../asset.service");
var AssetDetailsComponent = (function () {
    function AssetDetailsComponent(assetService) {
        this.assetService = assetService;
        this.currentAsset = {};
        this.currentAsset = this.assetService.currentAsset;
    }
    AssetDetailsComponent.prototype.setCurrentAsset = function (asset) {
        this.currentAsset = asset;
    };
    AssetDetailsComponent.prototype.ngOnInit = function () {
        this.currentAsset = this.assetService.currentAsset;
    };
    return AssetDetailsComponent;
}());
AssetDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'asset-details',
        templateUrl: 'asset-details.component.html'
    }),
    __metadata("design:paramtypes", [asset_service_1.AssetService])
], AssetDetailsComponent);
exports.AssetDetailsComponent = AssetDetailsComponent;
//# sourceMappingURL=asset-details.component.js.map
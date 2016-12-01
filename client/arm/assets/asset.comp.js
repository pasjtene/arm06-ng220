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
/*
*Author: Pascal Tene
*Created: Sept 2016
*Last Updated: 30 Nov, 2016
*/
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var asset_service_1 = require("./asset.service");
var auth_service_1 = require("../auth.service");
var location_service_1 = require("../locations/location.service");
var router_1 = require("@angular/router");
var material_2 = require("@angular/material");
var ConfirmDeleteAssetComponent = (function () {
    function ConfirmDeleteAssetComponent(assetService, dialogRef) {
        this.assetService = assetService;
        this.dialogRef = dialogRef;
        this.assetToDelete = {};
    }
    ConfirmDeleteAssetComponent.prototype.ngOnInit = function () {
        this.assetToDelete = this.assetService.assetToDelete;
    };
    return ConfirmDeleteAssetComponent;
}());
ConfirmDeleteAssetComponent = __decorate([
    core_1.Component({
        selector: 'confirm-delete-dialog',
        template: "\n  <h3> Delete this asset ?: {{ assetToDelete.name }} </h3>\n  <p>Click yes to permanently delete the asset </p>\n  <button class=\"btn btn-success\" (click)=\"dialogRef.close() \" >Cancel</button> <button class=\"btn btn-danger\" (click)=\"dialogRef.close('Yes')\">Yes delete</button>\n  "
    }),
    __metadata("design:paramtypes", [asset_service_1.AssetService,
        material_2.MdDialogRef])
], ConfirmDeleteAssetComponent);
exports.ConfirmDeleteAssetComponent = ConfirmDeleteAssetComponent;
//Asset help component
var AssetHelpComponent = (function () {
    function AssetHelpComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return AssetHelpComponent;
}());
AssetHelpComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'asset-help-dialog',
        templateUrl: 'asset-help.comp.html'
    }),
    __metadata("design:paramtypes", [material_2.MdDialogRef])
], AssetHelpComponent);
exports.AssetHelpComponent = AssetHelpComponent;
var AssetComponent = (function () {
    function AssetComponent(locationService, assetService, authService, router, viewContainerRef, dialog) {
        this.locationService = locationService;
        this.assetService = assetService;
        this.authService = authService;
        this.router = router;
        this.viewContainerRef = viewContainerRef;
        this.dialog = dialog;
        this.assetCreated = false;
        this.currentAsset = {};
        this.mouseIn = 100;
        this.mouseOnButton = 100;
        this.assetIdExist = false;
        this.defaultStr = 'Select a location';
        this.newAsset = {
            _id: '',
            name: '',
            uniqueIdNumber: '',
            cost: +'',
            currentValue: +'',
            manufacturer: '',
            location: ''
        };
    }
    AssetComponent.prototype.resetFormErrors = function () {
        this.assetIdExist = false;
    };
    AssetComponent.prototype.mover = function (i) {
        this.mouseIn = i;
    };
    AssetComponent.prototype.mout = function () {
        this.mouseIn = 100;
    };
    AssetComponent.prototype.setMouseOnButton = function (i) {
        this.mouseOnButton = i;
    };
    AssetComponent.prototype.unSetMouseOnButton = function () {
        this.mouseOnButton = 100;
    };
    AssetComponent.prototype.getLocations = function () {
        var _this = this;
        this.locationService.getLocations().then(function (locations) {
            _this.locations = locations;
        });
    };
    AssetComponent.prototype.getAssets = function () {
        var _this = this;
        this.assetService.getAssets().then(function (assets) {
            _this.assets = assets;
        });
    };
    AssetComponent.prototype.create = function (asset) {
        var _this = this;
        if (this.contains(this.assets, asset.uniqueIdNumber)) {
            this.assetIdExist = true;
            //refresh the local asset list. useful when a user click update asset, then clicks create asset and only changes the asset uniqueId
            this.getAssets();
            return;
        }
        else {
            this.assetIdExist = false;
            delete asset._id; // the _id will be automatically created by mongoDb. Providing an empty _id will cause a database failure
            this.assetService.create(asset).then(function (res) {
                if (res.name !== undefined) {
                    _this.getAssets();
                    _this.router.navigate(['/assets']);
                    _this.assetCreated = true;
                    _this.createAssetSidenav.close();
                }
                else {
                    _this.assetCreated = false;
                }
            }).catch(function (err) {
                //console.log(err);
            });
        }
    };
    //Rturns true if any asset already has the uniqueId supplied.
    AssetComponent.prototype.contains = function (assets, uniqueId) {
        for (var i = 0; i < assets.length; i++) {
            if (assets[i].uniqueIdNumber.trim() === uniqueId.trim()) {
                return true;
            }
        }
        return false;
    };
    AssetComponent.prototype.delete = function (asset) {
        var _this = this;
        this.assetService.delete(asset).then(function () {
            _this.assets = _this.assets.filter(function (arr) {
                //return ann array with all values different from asset
                return arr !== asset;
            });
        })
            .catch(function (err) {
            //console.log(err);
        });
    };
    AssetComponent.prototype.showDetails = function (asset) {
        this.currentAsset = asset;
        this.leftSidenav.open();
    };
    AssetComponent.prototype.update = function (asset) {
        console.log("Updating asset: ", asset);
        this.assetService.update(asset);
    };
    AssetComponent.prototype.openConfirmDeleteDialog = function (exportClass, asset) {
        var _this = this;
        var config = new material_2.MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.assetService.assetToDelete = asset;
        this.dialogRef = this.dialog.open(ConfirmDeleteAssetComponent, config);
        this.dialogRef.afterClosed().subscribe(function (result) {
            if (result === 'Yes') {
                _this.delete(asset);
            }
        });
        this.dialogRef = null;
    };
    AssetComponent.prototype.openAssetHelpDialog = function (exportClass) {
        var config = new material_2.MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(AssetHelpComponent, config);
    };
    AssetComponent.prototype.ngOnInit = function () {
        this.getLocations();
        this.getAssets();
    };
    AssetComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/login']);
    };
    return AssetComponent;
}());
__decorate([
    core_1.ViewChild('sidenav'),
    __metadata("design:type", material_1.MdSidenav)
], AssetComponent.prototype, "sidenav", void 0);
__decorate([
    core_1.ViewChild('leftSidenav'),
    __metadata("design:type", material_1.MdSidenav)
], AssetComponent.prototype, "leftSidenav", void 0);
__decorate([
    core_1.ViewChild('createAssetSidenav'),
    __metadata("design:type", material_1.MdSidenav)
], AssetComponent.prototype, "createAssetSidenav", void 0);
AssetComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'manage-asset',
        templateUrl: 'asset.comp.html',
        styleUrls: ['asset.comp.css'],
    }),
    __metadata("design:paramtypes", [location_service_1.LocationService,
        asset_service_1.AssetService,
        auth_service_1.AuthService,
        router_1.Router,
        core_1.ViewContainerRef,
        material_2.MdDialog])
], AssetComponent);
exports.AssetComponent = AssetComponent;
//# sourceMappingURL=asset.comp.js.map
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
*
*/
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var AssetService = (function () {
    function AssetService(http) {
        this.http = http;
        this.assetToDelete = {};
        this.assetUrl = '/api/assets';
        this.headers = new http_1.Headers({ 'Content-Type': 'Application/json', 'arm_auth_token': localStorage.getItem('arm_auth_token') });
    }
    AssetService.prototype.create = function (asset) {
        return this.http.post(this.assetUrl, { asset: asset }, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (err) {
            console.log(err);
        });
    };
    AssetService.prototype.update = function (asset) {
        return this.http.put(this.assetUrl, JSON.stringify(asset), { headers: this.headers })
            .toPromise()
            .then(function (asset) {
            console.log(asset);
        })
            .catch();
    };
    AssetService.prototype.delete = function (asset) {
        var url = this.assetUrl + "/" + asset._id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function (asset) {
            console.log("Asset deleted: ", asset);
            return asset;
        })
            .catch();
    };
    AssetService.prototype.getAssets = function () {
        return this.http.get(this.assetUrl, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (err) {
            console.log(err);
        });
    };
    return AssetService;
}());
AssetService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AssetService);
exports.AssetService = AssetService;
//# sourceMappingURL=asset.service.js.map
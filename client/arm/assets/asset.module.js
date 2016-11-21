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
var common_1 = require("@angular/common");
var asset_routing_module_1 = require("./asset-routing.module");
var asset_comp_1 = require("./asset.comp");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var asset_service_1 = require("./asset.service");
var AssetModule = (function () {
    function AssetModule() {
    }
    return AssetModule;
}());
AssetModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            asset_routing_module_1.AssetRoutingModule,
            forms_1.FormsModule,
            material_1.MaterialModule.forRoot()
        ],
        declarations: [
            asset_comp_1.AssetComponent,
            asset_comp_1.ConfirmDeleteAssetComponent,
            asset_comp_1.AssetHelpComponent
        ],
        entryComponents: [
            asset_comp_1.ConfirmDeleteAssetComponent,
            asset_comp_1.AssetHelpComponent
        ],
        providers: [
            asset_service_1.AssetService
        ]
    }),
    __metadata("design:paramtypes", [])
], AssetModule);
exports.AssetModule = AssetModule;
//# sourceMappingURL=asset.module.js.map
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
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var location_routing_module_1 = require("./location-routing.module");
var location_service_1 = require("./location.service");
//import { ListLocationsComponent, ConfirmLogout, SettingsDialog, ConfirmDeleteDialog } from './list/list-locations.comp';
var location_comp_1 = require("./location.comp");
var LocationModule = (function () {
    function LocationModule() {
    }
    return LocationModule;
}());
LocationModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            location_routing_module_1.LocationRoutingModule,
            material_1.MaterialModule.forRoot()
        ],
        declarations: [
            location_comp_1.LocationsComponent,
            location_comp_1.ConfirmLogout,
            location_comp_1.SettingsDialog,
            location_comp_1.ConfirmDeleteDialog
        ],
        entryComponents: [
            location_comp_1.LocationsComponent,
            location_comp_1.ConfirmLogout,
            location_comp_1.SettingsDialog,
            location_comp_1.ConfirmDeleteDialog
        ],
        providers: [
            location_service_1.LocationService
        ]
    }),
    __metadata("design:paramtypes", [])
], LocationModule);
exports.LocationModule = LocationModule;
//# sourceMappingURL=location.module.js.map
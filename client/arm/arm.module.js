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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
//import { MaterialModule } from '@angular/material';
// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
//import { InMemoryDataService }  from './in-memory-data.service';
var arm_component_1 = require("./arm.component");
//import { UserService } from './users/user.service';
var home_component_1 = require("./home.component");
var login_comp_1 = require("./login/login.comp");
var arm_routing_module_1 = require("./arm-routing.module");
var page_not_found_component_1 = require("./page-not-found.component");
//import { UserModule } from './users/user.module';
var user_module_1 = require("./users/user.module");
//import { CrisisModule } from './crisis-center/crisis.module';
var admin_module_1 = require("./admin/admin.module");
var login_routing_module_1 = require("./login/login-routing.module");
var location_module_1 = require("./locations/location.module");
var asset_module_1 = require("./assets/asset.module");
var material_1 = require("@angular/material");
var dialog_service_1 = require("./dialog.service");
var location_chart_component_1 = require("./d3ng/location-chart.component");
var bar_chart_component_1 = require("./d3ng/bar-chart.component");
var ArmModule = (function () {
    function ArmModule() {
    }
    return ArmModule;
}());
ArmModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            location_module_1.LocationModule,
            asset_module_1.AssetModule,
            user_module_1.UserModule,
            admin_module_1.AdminModule,
            login_routing_module_1.LoginRoutingModule,
            arm_routing_module_1.ArmRoutingModule,
            material_1.MaterialModule.forRoot()
        ],
        declarations: [
            arm_component_1.ArmComponent,
            login_comp_1.LoginComponent,
            home_component_1.HomeComponent,
            location_chart_component_1.LocationChartDirective,
            bar_chart_component_1.ArmStatsBarChartComponent,
            page_not_found_component_1.PageNotFoundComponent
        ],
        providers: [
            dialog_service_1.DialogService
        ],
        bootstrap: [arm_component_1.ArmComponent]
    }),
    __metadata("design:paramtypes", [])
], ArmModule);
exports.ArmModule = ArmModule;
//# sourceMappingURL=arm.module.js.map
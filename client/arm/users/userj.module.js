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
var userj_routing_module_1 = require("./userj-routing.module");
var user_comp_1 = require("./user.comp");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
//import { UserjService } from './userj.service';
var user_service_1 = require("./user.service");
var UserjModule = (function () {
    function UserjModule() {
    }
    return UserjModule;
}());
UserjModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            userj_routing_module_1.UserjRoutingModule,
            forms_1.FormsModule,
            material_1.MaterialModule.forRoot()
        ],
        declarations: [
            user_comp_1.UserComponent,
            user_comp_1.ConfirmDeleteUserComponent
        ],
        entryComponents: [
            user_comp_1.ConfirmDeleteUserComponent
        ],
        providers: [
            user_service_1.UserService, user_service_1.UserService
        ]
    }),
    __metadata("design:paramtypes", [])
], UserjModule);
exports.UserjModule = UserjModule;
//# sourceMappingURL=userj.module.js.map
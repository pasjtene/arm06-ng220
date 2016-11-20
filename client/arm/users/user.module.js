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
var user_routing_module_1 = require("./user-routing.module");
var user_comp_1 = require("./user.comp");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
//import { UserjService } from './userj.service';
var user_service_1 = require("./user.service");
var UserModule = (function () {
    function UserModule() {
    }
    return UserModule;
}());
UserModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            user_routing_module_1.UserRoutingModule,
            forms_1.FormsModule,
            material_1.MaterialModule.forRoot()
        ],
        declarations: [
            user_comp_1.UserComponent,
            user_comp_1.ConfirmDeleteUserComponent,
            user_comp_1.UserHelpComponent
        ],
        entryComponents: [
            user_comp_1.ConfirmDeleteUserComponent,
            user_comp_1.UserHelpComponent
        ],
        providers: [
            user_service_1.UserService, user_service_1.UserService
        ]
    }),
    __metadata("design:paramtypes", [])
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map
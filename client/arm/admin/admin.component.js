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
var core_1 = require('@angular/core');
var auth_guard_service_1 = require('../auth-guard.service');
var AdminComponent = (function () {
    function AdminComponent() {
    }
    AdminComponent = __decorate([
        core_1.Component({
            template: "\n  <h3> ADMIN </h3>\n  <nav>\n  <a routerLink=\"./\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{ exact: true }\">Admin Home</a>\n  <a routerLink=\"./crises\" routerLinkActive=\"active\"> Manage Crises</a>\n  <a routerLink=\"./users\" routerLinkActive=\"active\"> Manage Users</a>\n  </nav>\n  <router-outlet></router-outlet>\n  ",
            providers: [auth_guard_service_1.AuthGuard]
        }), 
        __metadata('design:paramtypes', [])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map
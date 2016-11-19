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
var router_1 = require("@angular/router");
//import { User } from './user';
var auth_service_1 = require("./auth.service");
var ArmComponent = (function () {
    //users : User[];
    //selectedUser: User;
    function ArmComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.title = " Welcome to ARM: Advanced Risk Manager";
        this.isLoggedIn = this.authService.isLoggedIn;
    }
    //getUsers(): void {
    //this.userService.getUsers().then(users => this.users = users);
    //}
    ArmComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.checkAuthToken().then(function () {
            _this.isLoggedIn = _this.authService.isLoggedIn;
            //Uncomment the following to enable loggin for all links.
            //if(!this.isLoggedIn){
            //  this.router.navigate(['/login']);
            //  }
        });
    };
    ArmComponent.prototype.logout = function () {
        var _this = this;
        this.authService.isLoggedIn = false;
        this.authService.logout();
        this.router.navigate(['/login']).then(function () {
            _this.isLoggedIn = false;
        });
        //this.setMessage();
    };
    return ArmComponent;
}());
ArmComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'arm-main',
        templateUrl: 'arm.component.html',
        styleUrls: ['arm.component.css']
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        router_1.Router])
], ArmComponent);
exports.ArmComponent = ArmComponent;
//# sourceMappingURL=arm.component.js.map
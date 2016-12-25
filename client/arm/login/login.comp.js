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
var auth_service_1 = require("../auth.service");
var UserCred = (function () {
    function UserCred() {
    }
    return UserCred;
}());
exports.UserCred = UserCred;
var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.newUserWelcomeMessage = "";
        this.isAnewUser = false;
        this.userCred = {
            id: 0,
            userName: '',
            password: ''
        };
        this.setMessage();
    }
    LoginComponent.prototype.setMessage = function () {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'In' : 'Out');
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.newUserWelcomeMessage = this.authService.newUserWelcomeMessage;
        this.isAnewUser = this.authService.isAnewUser;
    };
    LoginComponent.prototype.login = function (userName, password) {
        var _this = this;
        this.message = 'Trying to log in ...';
        this.authService.login(userName, password).subscribe(function () {
            _this.setMessage();
            if (_this.authService.isLoggedIn) {
                _this.authService.isAnewUser = false;
                _this.authService.authUserName = userName;
                localStorage.setItem('userName', userName);
                console.log("in Login...", _this.authService.authUserName);
                //If no redirect was set, use the defautl
                var redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : '/users';
                //redirect the user to the target URL
                _this.router.navigate([redirect]).then(function () {
                    _this.authService.isLoggedIn = true;
                    _this.authService.authUserName = userName;
                });
            }
            else {
                _this.authService.authFailed = true;
            }
        }, function (err) {
            _this.authService.authFailed = true;
        });
    };
    LoginComponent.prototype.logout = function () {
        this.authService.isLoggedIn = false;
        this.authService.authFailed = false;
        this.authService.isAnewUser = false;
        this.isAnewUser = false;
        this.authService.logout();
        this.setMessage();
    };
    /*When a non authenticated user clicks the create
      your account link / button on login page
    */
    LoginComponent.prototype.createNewUser = function () {
        this.router.navigate(["/users"]);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'arm-login',
        templateUrl: 'login.comp.html',
        styleUrls: ['login.comp.css']
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.comp.js.map
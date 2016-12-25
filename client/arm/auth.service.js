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
var http_1 = require("@angular/http");
require("rxjs/add/observable/of");
require("rxjs/add/operator/do");
require("rxjs/add/operator/delay");
require("rxjs/add/operator/map");
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.isLoggedIn = false;
        this.authFailed = false;
        this.newUserWelcomeMessage = "";
        this.isAnewUser = false;
        this.isAuthenticated = localStorage.getItem('arm_auth_token');
        this.authUserName = "";
        // the user remains logged in untill they click logout
        //isLoggedIn : boolean;
        //isLoggedIn = localStorage.getItem('auth_token') === 'jtp123' ? true : false;
        this.loginUrl = '/auth/login';
        this.authCheckUrl = '/auth/auth_check';
        this.headers = new http_1.Headers({ 'Conten-Type': 'application/json', 'arm_auth_token': localStorage.getItem('arm_auth_token'), 'userName': localStorage.getItem('userName') });
        this.userLoggedIn$ = new core_1.EventEmitter();
    }
    AuthService.prototype.checkAuthToken = function () {
        var _this = this;
        //arm_auth_token is set when the user logs in
        //if the auth token is set, we authenticate the user.
        //We run the request later for server side validation of the token.
        //iF validation failes, the user should be immediately looged out.
        if (localStorage.getItem('arm_auth_token') === null) {
            this.isLoggedIn = false;
        }
        else {
            this.isLoggedIn = true;
            this.authUserName = localStorage.getItem("userName");
        }
        return this.http.post(this.authCheckUrl, { headers: this.headers })
            .toPromise()
            .then(function (res) {
            if (res.json().token !== "false") {
                _this.isLoggedIn = true;
                //this event is subscribed to and used in arm.component.ts to set the loggedin user details.
                _this.userLoggedIn$.emit(res.json().user);
            }
            else {
                _this.isLoggedIn = false;
            }
        })
            .catch(function (error) {
            _this.isLoggedIn = false;
        });
    };
    AuthService.prototype.login = function (userName, password) {
        var _this = this;
        return this.http.post(this.loginUrl, { userName: userName, password: password }, { headers: this.headers })
            .map(function (res) {
            return res.json();
        })
            .map(function (res) {
            if (res) {
                _this.isLoggedIn = true;
                localStorage.setItem('arm_auth_token', res.token);
                localStorage.setItem('userName', userName);
                //an even is emitter on user login with the user object.
                //this event is subscribed to and used in arm.component.ts to set the loggedin user details.
                _this.userLoggedIn$.emit(res.user);
                return res;
            }
            else {
                _this.isLoggedIn = false;
                _this.authFailed = true;
                return res;
            }
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('arm_auth_token');
        localStorage.removeItem('userName');
        this.isLoggedIn = false;
        this.authFailed = false;
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
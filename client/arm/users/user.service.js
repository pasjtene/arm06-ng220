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
require("rxjs/add/operator/toPromise");
var UserService = (function () {
    //private loginUrl = 'arm/login';
    function UserService(http) {
        this.http = http;
        this.userCount = 0;
        this.userToDelete = {
            id: 0,
            _id: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            organization: '',
            location: '',
        };
        this.nnn = "";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'arm_auth_token': localStorage.getItem('arm_auth_token') });
        //private usersUrl = 'arm/users';
        this.usersUrl = '/api/users';
    }
    UserService.prototype.handleError = function (error) {
        console.log('An error has occured while connecting to the server ', error);
        return Promise.reject(error.message || error);
    };
    UserService.prototype.getUsers = function () {
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'arm_auth_token': localStorage.getItem('arm_auth_token') });
        return this.http.get(this.usersUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        }, function () {
            this.router.navigate(['/login']);
            return;
        });
        //.catch(this.handleError);
    };
    UserService.prototype.getUserCount = function () {
        return this.http.get(this.usersUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        }, function () {
            this.router.navigate(['/login']);
            return;
        });
        //.catch(this.handleError);
    };
    UserService.prototype.getUser = function (id) {
        return this.getUsers()
            .then(function (users) { return users.find(function (user) { return user.id === id; }); });
    };
    UserService.prototype.getUser2 = function (id) {
        return this.getUsers()
            .then(function (users) { return users.find(function (user) { return user._id === id; }); });
    };
    UserService.prototype.getUsersSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(resolve, 2000);
        })
            .then(function () { return _this.getUsers(); });
    };
    UserService.prototype.update = function (user) {
        var url = this.usersUrl + "/" + user._id;
        return this.http.put(url, JSON.stringify(user), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(" Still in put: " + response.json()._body);
            return response;
        })
            .catch(this.handleError);
    };
    UserService.prototype.create = function (user) {
        console.log("The user to create is: .." + JSON.stringify(user));
        return this.http
            .post(this.usersUrl, { user: user }, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.create2 = function (firstName, userName, password) {
        return this.http
            .post(this.usersUrl, JSON.stringify({ firstName: firstName, userName: userName, password: password }), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log("Response for create2: " + JSON.stringify(response.json()));
            return response.json();
        })
            .catch(this.handleError);
    };
    UserService.prototype.getUserToDelete = function () {
        console.log("in Get The user to delete is: ", this.userToDelete);
        return this.userToDelete;
    };
    UserService.prototype.setUserToDelete = function (user) {
        console.log("in Set The user is: ", user);
        this.userToDelete = user;
    };
    UserService.prototype.delete = function (_id) {
        console.log("In Service : The user to Delete is:  ", this.userToDelete);
        var url = this.usersUrl + "/" + _id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise().then(function (response) { return null; })
            .catch(this.handleError);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
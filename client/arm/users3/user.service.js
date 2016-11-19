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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var UserService3 = (function () {
    //private loginUrl = 'arm/login';
    function UserService3(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'arm_auth_token': localStorage.getItem('arm_auth_token') });
        //private usersUrl = 'arm/users';
        this.usersUrl = '/api/users';
    }
    UserService3.prototype.handleError = function (error) {
        console.log('An error has occured while connecting to the server ', error);
        return Promise.reject(error.message || error);
    };
    UserService3.prototype.getUsers = function () {
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
    UserService3.prototype.getUser = function (id) {
        return this.getUsers()
            .then(function (users) { return users.find(function (user) { return user.id === id; }); });
    };
    UserService3.prototype.getUser2 = function (id) {
        return this.getUsers()
            .then(function (users) { return users.find(function (user) { return user._id === id; }); });
    };
    UserService3.prototype.getUsersSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(resolve, 2000);
        })
            .then(function () { return _this.getUsers(); });
    };
    UserService3.prototype.update = function (user) {
        var url = this.usersUrl + "/" + user.id;
        return this.http.put(url, JSON.stringify(user), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log(" Still in put: " + response.json().user.userName);
            console.log(" Still in put: " + response.json().user.email);
            console.log(" Still in put: " + response.json().user.location);
            console.log(" Still in put updated ?: " + response.json().updated);
            return user;
        })
            .catch(this.handleError);
    };
    UserService3.prototype.create = function (user) {
        console.log("The user to create is: .." + JSON.stringify(user));
        return this.http
            .post(this.usersUrl, { user: user }, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService3.prototype.create2 = function (firstName, userName, password) {
        return this.http
            .post(this.usersUrl, JSON.stringify({ firstName: firstName, userName: userName, password: password }), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log("Response for create2: " + JSON.stringify(response.json()));
            return response.json();
        })
            .catch(this.handleError);
    };
    UserService3.prototype.delete = function (id) {
        var url = this.usersUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise().then(function (response) { return null; })
            .catch(this.handleError);
    };
    UserService3.prototype.delete2 = function (_id) {
        var url = this.usersUrl + "/" + _id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise().then(function (response) { return null; })
            .catch(this.handleError);
    };
    UserService3 = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService3);
    return UserService3;
}());
exports.UserService3 = UserService3;
//# sourceMappingURL=user.service.js.map
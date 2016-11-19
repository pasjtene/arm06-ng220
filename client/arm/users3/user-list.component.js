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
var router_1 = require('@angular/router');
var user_service_1 = require('./user.service');
var UserListComponent = (function () {
    function UserListComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.usersTitle = " Click a user to view and update details";
    }
    UserListComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) {
            _this.users = users;
            console.log("Users: ", users);
        });
    };
    UserListComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UserListComponent.prototype.onSelect = function (user) {
        this.selectedUser = user;
    };
    UserListComponent.prototype.isSelected = function (user) {
        return user.id === this.selectedId;
    };
    UserListComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/users', this.selectedUser._id]);
    };
    UserListComponent.prototype.add2 = function (firstName, userName, password) {
        var _this = this;
        var firstName = firstName.trim();
        var password = password.trim();
        var userName = userName.trim();
        if (!firstName || !password) {
            return;
        }
        this.userService.create2(firstName, userName, password)
            .then(function (user) {
            console.log("Pushing users: " + user);
            _this.users.push(user);
            _this.selectedUser = null;
        });
    };
    UserListComponent.prototype.delete = function (user) {
        var _this = this;
        this.userService
            .delete(user.id)
            .then(function () {
            _this.users = _this.users.filter(function (h) { return h !== user; });
            if (_this.selectedUser === user) {
                _this.selectedUser = null;
            }
        });
    };
    UserListComponent.prototype.delete2 = function (user) {
        var _this = this;
        console.log("deleting user....: " + JSON.stringify(user));
        this.userService
            .delete2(user._id)
            .then(function () {
            _this.users = _this.users.filter(function (h) { return h !== user; });
            if (_this.selectedUser === user) {
                _this.selectedUser = null;
            }
        });
    };
    UserListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'arm-users',
            templateUrl: 'users.component.html',
            styles: ["\n    .selected {\n      background-color: #CFD8DC !important;\n      color: white;\n    }\n    .users {\n      margin: 0 0 2em 0;\n      list-style-type: none;\n      padding: 0;\n      width: 35em;\n    }\n    .users li {\n      cursor: pointer;\n      position: relative;\n      left: 0;\n      background-color: #EEE;\n      margin: .5em;\n      padding: .3em 0;\n      height: 1.6em;\n      border-radius: 4px;\n    }\n    .users li.selected:hover {\n      background-color: #BBD8DC !important;\n      color: white;\n    }\n    .users li:hover {\n      color: #607D8B;\n      background-color: #DDD;\n      left: .1em;\n    }\n    .users .text {\n      position: relative;\n      top: -3px;\n    }\n    .users .badge {\n      display: inline-block;\n      font-size: small;\n      color: white;\n      padding: 0.8em 0.7em 0 0.7em;\n      background-color: #607D8B;\n      line-height: 1em;\n      position: relative;\n      left: -1px;\n      top: -4px;\n      height: 1.8em;\n      margin-right: .8em;\n      border-radius: 4px 0 0 4px;\n    }\n  "],
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, (typeof (_a = typeof user_service_1.UserService !== 'undefined' && user_service_1.UserService) === 'function' && _a) || Object])
    ], UserListComponent);
    return UserListComponent;
    var _a;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map
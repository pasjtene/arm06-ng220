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
var user_service_1 = require('./user.service');
var userRegisterComponent = (function () {
    function userRegisterComponent(userService) {
        this.userService = userService;
        //@Input()
        //user: User;
        this.user = {
            id: 0,
            _id: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            organization: '',
            location: ''
        };
        this.confirmPassword = '';
        this.passwordMissMatch = '';
    }
    userRegisterComponent.prototype.save = function (user, confirmPassword) {
        if (confirmPassword.trim() === user.password.trim()) {
            this.passwordMissMatch = "";
        }
        else {
            this.passwordMissMatch = "Passwords don't match";
            return;
        }
        // the _id property is added be the mongo db and should not be send when creating an object.
        delete user._id;
        this.userService.create(user).then(function (res) {
            console.log("User created successfully...");
        }, function (err) {
            console.log("Could not save the user...");
        });
    };
    userRegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user-register.comp.html',
            styleUrls: ['user-register.comp.css']
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof user_service_1.UserService !== 'undefined' && user_service_1.UserService) === 'function' && _a) || Object])
    ], userRegisterComponent);
    return userRegisterComponent;
    var _a;
}());
exports.userRegisterComponent = userRegisterComponent;
//# sourceMappingURL=user-register.comp.js.map
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
var material_1 = require("@angular/material");
var user_service_1 = require('./user.service');
var ConfirmDeleteUserComponent = (function () {
    function ConfirmDeleteUserComponent(userService, dialogRef) {
        this.userService = userService;
        this.dialogRef = dialogRef;
        this.n = "";
    }
    ConfirmDeleteUserComponent.prototype.ngOnInit = function () {
        this.userToDelete = this.userService.getUserToDelete();
        this.n = this.userService.nnn;
        console.log("Init2 confirm delete: ", this.userService.userToDelete);
    };
    ConfirmDeleteUserComponent = __decorate([
        core_1.Component({
            selector: 'confirm-delete-user-dialog',
            template: "\n  <h3> Delete this user ?: 2 {{n}} {{ userToDelete | json }}</h3>\n  <p>Click yes to permanently delete this user </p>\n  <button class=\"btn btn-success\" (click)=\"dialogRef.close() \" >Cancel</button> <button class=\"btn btn-danger\" (click)=\"dialogRef.close('Yes')\">Yes delete</button>\n  "
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, material_1.MdDialogRef])
    ], ConfirmDeleteUserComponent);
    return ConfirmDeleteUserComponent;
}());
exports.ConfirmDeleteUserComponent = ConfirmDeleteUserComponent;
var UserComponent = (function () {
    function UserComponent(router, userService, viewContainerRef, dialog) {
        this.router = router;
        this.userService = userService;
        this.viewContainerRef = viewContainerRef;
        this.dialog = dialog;
        this.usersTitle = " Click a user to view and update details";
        this.newUser = {
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
        this.confirmPassword = '';
        this.passwordMissMatch = '';
        this.mouseIn = 100;
        this.mouseOnButton = 100;
    }
    UserComponent.prototype.mover = function (i) {
        this.mouseIn = i;
    };
    UserComponent.prototype.mout = function () {
        this.mouseIn = 100;
    };
    UserComponent.prototype.setMouseOnButton = function (i) {
        this.mouseOnButton = i;
    };
    UserComponent.prototype.unSetMouseOnButton = function () {
        this.mouseOnButton = 100;
    };
    UserComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) {
            _this.users = users;
            console.log("Users: ", users);
        });
    };
    UserComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UserComponent.prototype.onSelect = function (user) {
        this.selectedUser = user;
    };
    UserComponent.prototype.isSelected = function (user) {
        return user.id === this.selectedId;
    };
    UserComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/users', this.selectedUser._id]);
    };
    UserComponent.prototype.add2 = function (firstName, userName, password) {
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
    UserComponent.prototype.delete = function (user) {
        var _this = this;
        this.userService
            .delete(user._id)
            .then(function () {
            _this.users = _this.users.filter(function (h) { return h !== user; });
            if (_this.selectedUser === user) {
                _this.selectedUser = null;
            }
        });
    };
    UserComponent.prototype.save = function (user, confirmPassword) {
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
    UserComponent.prototype.openConfirmDeleteDialog = function (exportClass, user) {
        var _this = this;
        var config = new material_1.MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.userService.setUserToDelete(user);
        //this.userService.userToDelete = user;
        this.dialogRef = this.dialog.open(ConfirmDeleteUserComponent, config);
        this.dialogRef.afterClosed().subscribe(function (result) {
            if (result === 'Yes') {
                _this.delete(user);
            }
        });
        this.dialogRef = null;
        this.userService.getUserToDelete();
    };
    UserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'arm-users',
            templateUrl: 'user.comp.html',
            styleUrls: ['user.comp.css'],
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService, core_1.ViewContainerRef, material_1.MdDialog])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.comp.js.map
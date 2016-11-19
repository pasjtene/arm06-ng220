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
/*
*Author: Pascal Tene
*Created: Sept 2016
*last Updated: Nov 06, 2016
*/
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var user_service_1 = require("./user.service");
var location_service_1 = require("../locations/location.service");
var router_1 = require("@angular/router");
var material_2 = require("@angular/material");
var ConfirmDeleteUserComponent = (function () {
    function ConfirmDeleteUserComponent(userService, dialogRef) {
        this.userService = userService;
        this.dialogRef = dialogRef;
        this.userToDelete = {};
    }
    ConfirmDeleteUserComponent.prototype.ngOnInit = function () {
        this.userToDelete = this.userService.userToDelete;
        console.log("Init confirm delete: ", this.userToDelete);
    };
    return ConfirmDeleteUserComponent;
}());
ConfirmDeleteUserComponent = __decorate([
    core_1.Component({
        selector: 'confirm-delete-dialog',
        template: "\n  <h3> Delete this user ?: {{ userToDelete.firstName }} {{ userToDelete.lastName }} </h3>\n  <p>Click yes to permanently delete the asset </p>\n  <button class=\"btn btn-success\" (click)=\"dialogRef.close() \" >Cancel</button> <button class=\"btn btn-danger\" (click)=\"dialogRef.close('Yes')\">Yes delete</button>\n  "
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        material_2.MdDialogRef])
], ConfirmDeleteUserComponent);
exports.ConfirmDeleteUserComponent = ConfirmDeleteUserComponent;
var UserComponent = (function () {
    function UserComponent(locationService, 
        //private assetService: UserjService,
        userService, router, viewContainerRef, dialog) {
        this.locationService = locationService;
        this.userService = userService;
        this.router = router;
        this.viewContainerRef = viewContainerRef;
        this.dialog = dialog;
        this.currentUser = {};
        this.mouseIn = 100;
        this.mouseOnButton = 100;
        this.confirmPassword = '';
        this.passwordMissMatch = '';
        //userExist = false;
        this.userNameExist = '';
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
    UserComponent.prototype.getLocations = function () {
        var _this = this;
        this.locationService.getLocations().then(function (locations) {
            _this.locations = locations;
        });
    };
    UserComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) {
            _this.users = users;
            console.log("Users: ", users);
        });
    };
    //  getAssets(): void {
    //this.assetService.getAssets().then((assets) => {
    //  console.log("Assets from server: ", assets)
    //  this.assets = assets;
    //  })
    //  }
    UserComponent.prototype.delete = function (user) {
        var _this = this;
        this.userService
            .delete(user._id)
            .then(function () {
            _this.users = _this.users.filter(function (h) { return h !== user; });
            _this.getUsers();
        });
    };
    UserComponent.prototype.save = function (user, confirmPassword) {
        var _this = this;
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
            console.log("Response after post user: ", res);
            if (res.username === 'ex') {
                _this.userNameExist = 'A user with this username already exist';
                return;
            }
            else {
                _this.getUsers();
                _this.createUserSidenav.close();
            }
        }, function (err) {
            console.log("Could not save the user...");
        });
    };
    UserComponent.prototype.showDetails = function (user) {
        this.currentUser = user;
    };
    UserComponent.prototype.openConfirmDeleteDialog = function (exportClass, user) {
        var _this = this;
        var config = new material_2.MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.userService.userToDelete = user;
        this.dialogRef = this.dialog.open(ConfirmDeleteUserComponent, config);
        this.dialogRef.afterClosed().subscribe(function (result) {
            if (result === 'Yes') {
                _this.delete(user);
                console.log(user);
            }
        });
        this.dialogRef = null;
    };
    UserComponent.prototype.ngOnInit = function () {
        this.getLocations();
        //this.getAssets();
        this.getUsers();
    };
    return UserComponent;
}());
__decorate([
    core_1.ViewChild('sidenav'),
    __metadata("design:type", material_1.MdSidenav)
], UserComponent.prototype, "sidenav", void 0);
__decorate([
    core_1.ViewChild('createUserSidenav'),
    __metadata("design:type", material_1.MdSidenav)
], UserComponent.prototype, "createUserSidenav", void 0);
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'manage-asset',
        templateUrl: 'user.comp.html',
        styleUrls: ['user.comp.css']
    }),
    __metadata("design:paramtypes", [location_service_1.LocationService,
        user_service_1.UserService,
        router_1.Router,
        core_1.ViewContainerRef,
        material_2.MdDialog])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.comp.js.map
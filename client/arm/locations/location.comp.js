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
var location_service_1 = require("./location.service");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var user_service_1 = require("../users/user.service");
var auth_service_1 = require("../auth.service");
var SettingsDialog = (function () {
    function SettingsDialog(dialogRef) {
        this.dialogRef = dialogRef;
    }
    return SettingsDialog;
}());
SettingsDialog = __decorate([
    core_1.Component({
        selector: 'settings-dialog',
        template: "\n  <h2>Hi! I am the first dialog!</h2>\n<p>I'm working on a POC app, and I'm trying get the MdDialog component working. Does any one have a working example of what to pass to the MdDialog open method?</p>\n<button md-raised-button (click)=\"dialogRef.close()\">Close dialog</button>\n  "
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef])
], SettingsDialog);
exports.SettingsDialog = SettingsDialog;
var ConfirmDeleteDialog = (function () {
    function ConfirmDeleteDialog(dialogRef, locationService) {
        this.dialogRef = dialogRef;
        this.locationService = locationService;
        this.dlocation = {
            _id: '',
            name: '',
            city: '',
            state: '',
            country: '',
            contacts: []
        };
    }
    ConfirmDeleteDialog.prototype.ngOnInit = function () {
        console.log("Started ");
        //the location to delete is set in openConfirmDeleteDialog via locationService
        this.dlocation = this.locationService.locationToDelete;
    };
    return ConfirmDeleteDialog;
}());
ConfirmDeleteDialog = __decorate([
    core_1.Component({
        selector: 'confirm-delete-dialog',
        template: "\n  <h2>Are you sure you want to delete this location? {{ dlocation.name}}</h2>\n<p>Click yes to permanently delete the location </p>\n<button class=\"btn btn-success\" (click)=\"dialogRef.close() \" >Cancel</button> <button class=\"btn btn-danger\" (click)=\"dialogRef.close('Yes')\">Yes delete</button>\n  "
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef,
        location_service_1.LocationService])
], ConfirmDeleteDialog);
exports.ConfirmDeleteDialog = ConfirmDeleteDialog;
var ConfirmLogout = (function () {
    function ConfirmLogout() {
    }
    return ConfirmLogout;
}());
ConfirmLogout = __decorate([
    core_1.Component({
        selector: 'confirm-logout',
        template: "\n  <label>You will be logget out of the application ok ?<label>\n  <md-slide-toggle>Yes </md-slide-toggle>\n  "
    }),
    __metadata("design:paramtypes", [])
], ConfirmLogout);
exports.ConfirmLogout = ConfirmLogout;
var LocationsComponent = (function () {
    function LocationsComponent(locationService, userService, authService, confirmLogoutDialog, vcr, dialog, formBuilder, 
        //public locationService : LocationService,
        router) {
        this.locationService = locationService;
        this.userService = userService;
        this.authService = authService;
        this.confirmLogoutDialog = confirmLogoutDialog;
        this.vcr = vcr;
        this.dialog = dialog;
        this.formBuilder = formBuilder;
        this.router = router;
        this.isLocationCreated = false;
        this.mouseIn = 10000;
        this.mouseOnButton = 10000;
        this.isLocationNotCreated = false;
        this.createdLocationName = '';
        this.currentLocation = {};
        this.newLocation = {
            _id: '',
            name: '',
            city: '',
            state: '',
            country: '',
            contacts: []
        };
        this.location1 = this.formBuilder.group({
            name: ['', forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50), forms_1.Validators.required])],
            city: ['', forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(40)])],
            state: ['', forms_1.Validators.compose([forms_1.Validators.maxLength(30), forms_1.Validators.minLength(2)])],
            country: ['', forms_1.Validators.compose([forms_1.Validators.minLength(2), forms_1.Validators.maxLength(30)])]
        });
    }
    LocationsComponent.prototype.mover = function (i) {
        this.mouseIn = i;
    };
    LocationsComponent.prototype.mouseOut = function () {
        this.mouseIn = 10000;
    };
    LocationsComponent.prototype.setMouseOnRow = function (i) {
        this.mouseOnButton = i;
    };
    LocationsComponent.prototype.unSetMouseOnRow = function () {
        this.mouseOnButton = 100;
    };
    LocationsComponent.prototype.getLocations = function () {
        var _this = this;
        this.locationService.getLocations().then(function (locations) {
            _this.locations = locations;
        });
    };
    LocationsComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) {
            _this.users = users;
        });
    };
    LocationsComponent.prototype.ngOnInit = function () {
        this.getLocations();
        this.getUsers();
    };
    LocationsComponent.prototype.confirmLogout = function () {
        var config = new material_1.MdDialogConfig();
        config.viewContainerRef = this.vcr;
        this.dialogRef = this.confirmLogoutDialog.open(ConfirmLogout, config);
    };
    LocationsComponent.prototype.showDetails = function (location) {
        this.currentLocation = location;
        this.sidenav.open();
    };
    LocationsComponent.prototype.openDialog = function (d) {
        var _this = this;
        var config = new material_1.MdDialogConfig();
        config.viewContainerRef = this.vcr;
        this.dialogRef = this.dialog.open(SettingsDialog, config);
        this.dialogRef.afterClosed().subscribe(function (result) {
            _this.dialogRef = null;
        });
    };
    LocationsComponent.prototype.openConfirmDeleteDialog = function (d, location) {
        var _this = this;
        var config = new material_1.MdDialogConfig();
        config.viewContainerRef = this.vcr;
        //set the location to delete so we can show it it the dialog
        this.locationService.locationToDelete = location;
        this.dialogRef = this.dialog.open(ConfirmDeleteDialog, config);
        this.dialogRef.afterClosed().subscribe(function (result) {
            if (result === "Yes") {
                _this.delete(location);
            }
            _this.dialogRef = null;
        });
    };
    LocationsComponent.prototype.createLocation = function (location) {
        var _this = this;
        delete location._id; // the _id will be automatically created by mongoDb. Providing an empty _id will cause a database failure
        this.locationService.create(location).then(function (res) {
            //When location creation fails, the returned location values are undefined
            if (res.name !== undefined) {
                _this.isLocationCreated = true;
                _this.isLocationNotCreated = false;
                _this.createdLocationName = location.name;
                _this.getLocations();
                _this.resetView();
            }
            else {
                _this.isLocationCreated = false;
                _this.createdLocationName = location.name;
                _this.isLocationNotCreated = true;
                _this.resetView();
            }
        });
        this.router.navigate(['/locations']);
    };
    LocationsComponent.prototype.delete = function (loc) {
        var _this = this;
        this.locationService
            .delete(loc._id)
            .then(function (res) {
            _this.locations = _this.locations.filter(function (h) { return h !== loc; });
        });
    };
    LocationsComponent.prototype.resetView = function () {
        var _this = this;
        setTimeout(function () {
            _this.isLocationCreated = false;
            _this.isLocationNotCreated = false;
        }, 3000);
    };
    LocationsComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/login']);
    };
    return LocationsComponent;
}());
__decorate([
    core_1.ViewChild('sidenav'),
    __metadata("design:type", material_1.MdSidenav)
], LocationsComponent.prototype, "sidenav", void 0);
LocationsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'locations',
        templateUrl: 'location.comp.html',
        styleUrls: ['location.comp.css']
    }),
    __metadata("design:paramtypes", [location_service_1.LocationService,
        user_service_1.UserService,
        auth_service_1.AuthService,
        material_1.MdDialog,
        core_1.ViewContainerRef,
        material_1.MdDialog,
        forms_1.FormBuilder,
        router_1.Router])
], LocationsComponent);
exports.LocationsComponent = LocationsComponent;
//# sourceMappingURL=location.comp.js.map
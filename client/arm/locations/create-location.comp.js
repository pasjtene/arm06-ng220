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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var location_service_1 = require('./location.service');
var CreateLocationComponent = (function () {
    function CreateLocationComponent(formBuilder, locationService, router) {
        this.formBuilder = formBuilder;
        this.locationService = locationService;
        this.router = router;
        this.location = this.formBuilder.group({
            name: ['', forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50), forms_1.Validators.required])],
            city: ['', forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(40)])],
            state: ['', forms_1.Validators.compose([forms_1.Validators.maxLength(30), forms_1.Validators.minLength(2)])],
            country: ['', forms_1.Validators.compose([forms_1.Validators.minLength(2), forms_1.Validators.maxLength(30)])]
        });
    }
    CreateLocationComponent.prototype.createLocation = function () {
        console.log(this.location.value);
        console.log(JSON.stringify(this.location.value));
        this.locationService.create(this.location.value);
        this.router.navigate(['/locations']);
    };
    CreateLocationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'create-location',
            templateUrl: 'create-location.comp.html',
            styleUrls: ['create-location.comp.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, location_service_1.LocationService, router_1.Router])
    ], CreateLocationComponent);
    return CreateLocationComponent;
}());
exports.CreateLocationComponent = CreateLocationComponent;
//# sourceMappingURL=create-location.comp.js.map
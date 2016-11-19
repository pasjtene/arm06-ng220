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
var router_1 = require('@angular/router');
var LocationService = (function () {
    function LocationService(http, router) {
        this.http = http;
        this.router = router;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'arm_auth_token': localStorage.getItem('arm_auth_token') });
        this.locationUrl = '/api/locations';
    }
    LocationService.prototype.handleError = function (error) {
        console.log('An error has occured while connecting to the server ', error);
        return Promise.reject(error.message || error);
    };
    LocationService.prototype.create2 = function (location) {
        console.log("location created");
        console.log(location);
        console.log(JSON.stringify(location));
        this.http.post(this.locationUrl, { location: location }, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log("response for location: ", response);
        })
            .catch(function () {
            console.log("Errors while creating Location");
        });
        return;
    };
    LocationService.prototype.create = function (location) {
        var _this = this;
        console.log("location created");
        console.log(location);
        var loc = this.http.post(this.locationUrl, { location: location }, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log("response for location: ", response);
            _this.router.navigate(['/locations']);
            return response.json();
        })
            .catch(function () {
            console.log("Errors while creating Location");
        });
        return loc;
    };
    LocationService.prototype.deleteLocation = function (id) {
        var _this = this;
        var url = this.locationUrl + "/" + id;
        console.log(location);
        console.log(JSON.stringify(location));
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            console.log("response for location: ", response);
            _this.router.navigate(['/locations']);
            return response.json();
        })
            .catch(function (err) {
            console.log("Errors while creating Location");
            return err;
        });
    };
    LocationService.prototype.delete = function (id) {
        var url = this.locationUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise().then(function (response) { return response; })
            .catch(this.handleError);
    };
    LocationService.prototype.getLocations = function () {
        return this.http.get(this.locationUrl, { headers: this.headers })
            .toPromise()
            .then(function (locations) {
            console.log("Locations from server: ", locations.json());
            return locations.json();
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    LocationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], LocationService);
    return LocationService;
}());
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map
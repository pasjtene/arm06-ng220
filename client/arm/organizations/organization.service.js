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
var OrganizationService = (function () {
    function OrganizationService(http) {
        this.http = http;
        this.organizationToDelete = {};
        this.organizationUrl = 'api/organizations';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'arm_auth_token': localStorage.getItem('arm_auth_token') });
    }
    OrganizationService.prototype.create = function (organization) {
        console.log("The organiza...is: ", organization);
        this.http.post(this.organizationUrl, { organization: organization }, { headers: this.headers })
            .toPromise()
            .then(function (organization) {
            console.log(organization);
        });
    };
    OrganizationService.prototype.getOrganizations = function () {
        return this.http.get(this.organizationUrl, { headers: this.headers })
            .toPromise()
            .then(function (organizations) {
            console.log("db organization: ", organizations);
            return organizations.json();
        })
            .catch();
    };
    OrganizationService.prototype.delete = function (id) {
        console.log("deleting..");
        var url = this.organizationUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response; })
            .catch(function (err) {
            console.log(err);
        });
    };
    return OrganizationService;
}());
OrganizationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], OrganizationService);
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=organization.service.js.map
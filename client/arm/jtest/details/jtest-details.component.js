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
var organization_1 = require("../../organizations/organization");
var JtestDetailsComponent = (function () {
    function JtestDetailsComponent() {
    }
    return JtestDetailsComponent;
}());
__decorate([
    core_1.Input('details'),
    __metadata("design:type", organization_1.Organization)
], JtestDetailsComponent.prototype, "organizationDetails", void 0);
JtestDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'organization-details',
        templateUrl: 'jtest-details.component.html'
    }),
    __metadata("design:paramtypes", [])
], JtestDetailsComponent);
exports.JtestDetailsComponent = JtestDetailsComponent;
//# sourceMappingURL=jtest-details.component.js.map
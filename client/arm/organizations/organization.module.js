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
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var organization_component_1 = require("./organization.component");
var organization_service_1 = require("./organization.service");
var organization_details_component_1 = require("./details/organization-details.component");
var organization_routing_module_1 = require("./organization-routing.module");
var material_1 = require("@angular/material");
var OrganizationModule = (function () {
    function OrganizationModule() {
    }
    return OrganizationModule;
}());
OrganizationModule = __decorate([
    core_1.NgModule({
        declarations: [
            organization_details_component_1.OrganizationDetailsComponent,
            organization_component_1.OrganizationComponent,
            organization_component_1.ConfirmDeleteDialog
        ],
        entryComponents: [
            organization_component_1.ConfirmDeleteDialog
        ],
        imports: [
            forms_1.FormsModule,
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            organization_routing_module_1.OrganizationRoutingModule,
            material_1.MaterialModule.forRoot()
        ],
        providers: [
            organization_service_1.OrganizationService
        ]
    }),
    __metadata("design:paramtypes", [])
], OrganizationModule);
exports.OrganizationModule = OrganizationModule;
//# sourceMappingURL=organization.module.js.map
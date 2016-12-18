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
var jtest_component_1 = require("./jtest.component");
var jtest_details_component_1 = require("./details/jtest-details.component");
var jtest_routing_module_1 = require("./jtest-routing.module");
var material_1 = require("@angular/material");
var JtestModule = (function () {
    function JtestModule() {
    }
    return JtestModule;
}());
JtestModule = __decorate([
    core_1.NgModule({
        declarations: [
            jtest_details_component_1.JtestDetailsComponent,
            jtest_component_1.JtestComponent
        ],
        imports: [
            forms_1.FormsModule,
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
            jtest_routing_module_1.JtestRoutingModule,
            material_1.MaterialModule.forRoot()
        ]
    }),
    __metadata("design:paramtypes", [])
], JtestModule);
exports.JtestModule = JtestModule;
//# sourceMappingURL=jtest.module.js.map
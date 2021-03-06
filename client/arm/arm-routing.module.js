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
var router_1 = require("@angular/router");
var home_component_1 = require("./home.component");
var page_not_found_component_1 = require("./page-not-found.component");
var can_deactivate_guard_service_1 = require("./can-deactivate-guard.service");
var auth_guard_service_1 = require("./auth-guard.service");
var routes = [
    {
        path: '',
        redirectTo: '/assets',
        pathMatch: 'full'
    },
    {
        path: 'admin2',
        loadChildren: 'arm/admin/admin.module#AdminModule',
        canLoad: [auth_guard_service_1.AuthGuard]
    },
    //{
    //path: 'login',
    //component: LoginComponent
    //  },
    {
        path: 'home',
        component: home_component_1.HomeComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: '**',
        component: page_not_found_component_1.PageNotFoundComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    }
];
var ArmRoutingModule = (function () {
    function ArmRoutingModule() {
    }
    return ArmRoutingModule;
}());
ArmRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(routes)
        ],
        exports: [
            router_1.RouterModule
        ],
        providers: [
            can_deactivate_guard_service_1.CanDeactivateGuard
        ]
    }),
    __metadata("design:paramtypes", [])
], ArmRoutingModule);
exports.ArmRoutingModule = ArmRoutingModule;
//# sourceMappingURL=arm-routing.module.js.map
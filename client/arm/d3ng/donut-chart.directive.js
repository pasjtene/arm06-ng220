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
/// <reference path="../../typings/modules/d3/index.d.ts"/>
var core_1 = require("@angular/core");
var user_service_1 = require("../users/user.service");
var location_service_1 = require("../locations/location.service");
var asset_service_1 = require("../assets/asset.service");
//npm install d3 --save
//npm install typings --save
//typings install d3 --save
//npm install @types/d3 --save-dev
var d3 = require("d3");
var DonutChartDirective = (function () {
    function DonutChartDirective(elementRef, userService, assetService, locationService) {
        this.elementRef = elementRef;
        this.userService = userService;
        this.assetService = assetService;
        this.locationService = locationService;
        this.vm = this;
        this.userCount = 0;
        this.tau = 2 * Math.PI; // http://tauday.com/tau-manifesto
        this.data = d3.range(10).map(function () {
            return Math.random();
        });
        this.arc = d3.arc()
            .innerRadius(100)
            .outerRadius(130)
            .startAngle(0);
        var el = this.elementRef.nativeElement;
        var svg = d3.select(el).append("svg").attr("width", 1200).attr("height", 400), width = 200, x1 = 140, height = 200, y1 = 150, x2 = 420, x3 = 700, viewBox = "0 0 1 1", g = svg.append("g").attr("transform", "translate(" + x1 + "," + y1 + ")")
            .attr("viewBox", viewBox), g2 = svg.append("g").attr("transform", "translate(" + x2 + "," + y1 + ")")
            .attr("viewBox", viewBox), g3 = svg.append("g").attr("transform", "translate(" + x3 + "," + y1 + ")")
            .attr("viewBox", viewBox);
        this.background = g.append("path")
            .datum({ endAngle: this.tau })
            .style("fill", "rgba(255, 165, 0, 0.3)")
            .attr("d", this.arc);
        this.background2 = g2.append("path")
            .datum({ endAngle: this.tau })
            .style("fill", "rgba(70, 130, 180, 0.3)")
            .attr("d", this.arc);
        this.background3 = g3.append("path")
            .datum({ endAngle: this.tau })
            .style("fill", "rgba(120, 200, 180, 0.3)")
            .attr("d", this.arc);
        // Add the foreground arc in orange, currently showing 12.7%.
        this.fg = g.append("path")
            .datum({ endAngle: 0.55 * this.tau })
            .style("fill", "rgba(255, 165, 0, 1)")
            .attr("d", this.arc);
        this.fg2 = g2.append("path")
            .datum({ endAngle: 0.72 * this.tau })
            .style("fill", "rgba(70, 130, 180, 1)")
            .attr("d", this.arc);
        this.fg3 = g3.append("path")
            .datum({ endAngle: 0.25 * this.tau })
            .style("fill", "rgba(120, 200, 180, 1)")
            .attr("d", this.arc);
        this.textEl = g.append("text")
            .attr("text-anchor", "middle");
        this.textEl2 = g2.append("text")
            .attr("text-anchor", "middle");
        this.textEl3 = g3.append("text")
            .attr("text-anchor", "middle");
    }
    DonutChartDirective.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) {
            _this.userCount = users.length;
        });
    };
    DonutChartDirective.prototype.ngOnInit = function () {
        var _this = this;
        var vm = this;
        this.getUsers();
        this.userService.getUsers().then(function (users) {
            _this.userCount = users.length;
            var uc = users.length;
            _this.locationService.getLocations().then(function (locations) {
                var lc = locations.length;
                _this.assetService.getAssets().then(function (assets) {
                    var ac = assets.length, t = uc + lc + ac;
                    _this.textEl = _this.textEl
                        .text(ac + " Assets: " + d3.format(".2%")(((+assets.length * 100) / t) / 100));
                    setTimeout(function () {
                        vm.fg.transition()
                            .attrTween("d", vm.arcTween(((+assets.length * 100) / t) / 100 * vm.tau));
                    }, 3000);
                    _this.textEl2 = _this.textEl2
                        .text(lc + " Locations: " + d3.format(".2%")(((+locations.length * 100) / t) / 100));
                    setTimeout(function () {
                        vm.fg2.transition()
                            .attrTween("d", vm.arcTween(((+locations.length * 100) / t) / 100 * vm.tau));
                    }, 1000);
                    _this.userService.userCount = users.length;
                    _this.textEl3 = _this.textEl3
                        .text(uc + " Users: " + d3.format(".2%")(((+users.length * 100) / t) / 100));
                    setTimeout(function () {
                        vm.fg3.transition()
                            .attrTween("d", vm.arcTween(((+users.length * 100) / t) / 100 * vm.tau));
                    }, 2000);
                });
            });
        });
    };
    DonutChartDirective.prototype.arcTween = function (newAngle) {
        var vm = this;
        return function (d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function (t) {
                d.endAngle = interpolate(t);
                return vm.arc(d);
            };
        };
    };
    return DonutChartDirective;
}());
DonutChartDirective = __decorate([
    core_1.Directive({
        selector: 'donut-chart'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        user_service_1.UserService,
        asset_service_1.AssetService,
        location_service_1.LocationService])
], DonutChartDirective);
exports.DonutChartDirective = DonutChartDirective;
//# sourceMappingURL=donut-chart.directive.js.map
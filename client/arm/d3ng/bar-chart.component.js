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
var d3 = require("d3");
var core_1 = require("@angular/core");
var ArmStatsBarChartComponent = (function () {
    function ArmStatsBarChartComponent(elementRef) {
        this.elementRef = elementRef;
        var el = this.elementRef.nativeElement;
        var width = 960, height = 500, barPadding = 2, data = [
            {
                key: "ASSETS",
                value: 0.53,
                color: "rgba(255,165,0,0.8)"
            },
            {
                key: "LOCATIONS",
                value: 0.11,
                color: "rgba(70,130,180,0.8)"
            },
            {
                key: "USERS",
                value: 0.36,
                color: "rgba(120,200,180,0.9)"
            }
        ], barWdth = (width / data.length) - barPadding, margin = { top: 10, right: 20, bottom: 30, left: 40 }, 
        //x = d3.scaleBand().range([0, width]).padding(0.1),
        y = d3.scaleLinear().range([height, 0]), 
        //xScale = d3.scaleBand().domain(d3.range(0, data.length)).range([0, width]),
        svg = d3.select(el).append("svg").attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom), 
        //xScale = d3.scaleBand().domain(data).range([width, 0]).padding(0.1);
        x = d3.scaleBand().domain(data).range([width, 0]).padding(0.1);
        //yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);
        //map data to the x axis
        x.domain(data.map(function (d) { return d.key; }));
        y.domain([0, d3.max(data, function (d) { return d.value; })]);
        var g = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        g.selectAll("text").data(data).enter().append("text")
            .text(function (d) {
            return d.key;
        })
            .attr("text-anchor", "middle")
            .attr("x", function (d, i) {
            return x(i);
        })
            .attr("y", function (d) {
            return y(d.value) + 14;
        })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", function (d) { return d.color; });
        g.append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.key); })
            .attr("width", x.bandwidth())
            .attr("fill", function (d) { return d.color; })
            .attr("y", function (d) { return y(d.value); })
            .attr("height", function (d) { return height - y(d.value); });
        //Add label to each rectangle
        g.append("text")
            .attr("class", "bar-label")
            .attr("x", function (d) { return x(d.key) + (x.bandwidth() / 2) - 15; })
            .attr("y", function (d) { return y(d.value) + 15; })
            .text(function (d) { return d.key; })
            .attr("text-anchor", "middle");
        // add the x Axis into the g container
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        // add the y Axis within the g container
        g.append("g")
            .attr("class", "axix axix--y")
            .call(d3.axisLeft(y).ticks(10, "%"))
            .append("text")
            .attr("y", 16)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end");
    }
    ArmStatsBarChartComponent.prototype.ngOnInit = function () {
        console.log("Bart chart directive loaded");
    };
    return ArmStatsBarChartComponent;
}());
ArmStatsBarChartComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'bar-chart3',
        styleUrls: ['bar-chart.directive.css'],
        template: '',
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ArmStatsBarChartComponent);
exports.ArmStatsBarChartComponent = ArmStatsBarChartComponent;
//# sourceMappingURL=bar-chart.component.js.map
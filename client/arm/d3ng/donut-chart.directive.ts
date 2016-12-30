/// <reference path="../../typings/modules/d3/index.d.ts"/>
import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import { UserService } from "../users/user.service";
import { LocationService } from '../locations/location.service';
import { AssetService } from '../assets/asset.service';
//npm install d3 --save
//npm install typings --save
//typings install d3 --save
//npm install @types/d3 --save-dev

import * as d3 from 'd3';

@Directive({
    selector: 'donut-chart'    
})


export class DonutChartDirective implements OnInit {
    vm = this;
    userCount = 0;
    tau = 2 * Math.PI; // http://tauday.com/tau-manifesto
    background: any;
    background2: any;
    background3: any;
    textEl: any;
    textEl2: any;
    textEl3: any;
    fg: any;
    fg2: any;
    fg3: any;
    data = d3.range(10).map(function () {
         return Math.random();
      });

    arc = d3.arc()
        .innerRadius(100)
        .outerRadius(130)
        .startAngle(0);

    constructor(private elementRef: ElementRef,
        private userService: UserService,
        private assetService: AssetService,
        private locationService: LocationService
    ) {
        let el = this.elementRef.nativeElement;

        var svg = d3.select(el).append("svg").attr("width", 1200).attr("height", 400),
            width = 200,
            x1 = 140,
            height = 200,
            y1 = 150,
            x2 = 420,
            x3 = 700,
            viewBox = "0 0 1 1",
            g = svg.append("g").attr("transform", "translate(" + x1 + "," + y1 + ")")
                .attr("viewBox", viewBox),
            g2 = svg.append("g").attr("transform", "translate(" + x2 + "," + y1 + ")")
                .attr("viewBox", viewBox),
            g3 = svg.append("g").attr("transform", "translate(" + x3 + "," + y1 + ")")
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

    getUsers(): void {
        this.userService.getUsers().then(users => {
            this.userCount = users.length;
        });

    }

    ngOnInit() {

        var vm = this;
        this.getUsers();
        this.userService.getUsers().then(users => {
            this.userCount = users.length;
            var uc = users.length;

            this.locationService.getLocations().then((locations) => {
                var lc = locations.length;
                this.assetService.getAssets().then((assets) => {
                    var ac = assets.length,
                        t = uc + lc + ac;
                    this.textEl = this.textEl
                        .text(ac + " Assets: " + d3.format(".2%")(((+assets.length * 100) / t) / 100));
                    setTimeout(() => {
                        vm.fg.transition()
                            .attrTween("d", vm.arcTween(((+assets.length * 100) / t) / 100 * vm.tau));
                    }, 3000);


                    this.textEl2 = this.textEl2
                        .text(lc + " Locations: " + d3.format(".2%")(((+locations.length * 100) / t) / 100));
                    setTimeout(() => {
                        vm.fg2.transition()
                            .attrTween("d", vm.arcTween(((+locations.length * 100) / t) / 100 * vm.tau));
                    }, 1000);

                    this.userService.userCount = users.length;
                    this.textEl3 = this.textEl3
                        .text(uc + " Users: " + d3.format(".2%")(((+users.length * 100) / t) / 100));
                    setTimeout(() => {
                        vm.fg3.transition()
                            .attrTween("d", vm.arcTween(((+users.length * 100) / t) / 100 * vm.tau));
                    }, 2000);
                });
            });
        })
    }


    arcTween(newAngle) {
        var vm = this;
        return function(d) {

            var interpolate = d3.interpolate(d.endAngle, newAngle);

            return function(t) {

                d.endAngle = interpolate(t);
                return vm.arc(d);
            };
        };
    }
}

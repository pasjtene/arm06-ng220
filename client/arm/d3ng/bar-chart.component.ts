/// <reference path="../../typings/modules/d3/index.d.ts"/>
import * as d3 from 'd3';

import { Component, Directive, ElementRef, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'bar-chart3',
    styleUrls: ['bar-chart.directive.css'],
    template: '',
    encapsulation: ViewEncapsulation.None
})

export class ArmStatsBarChartComponent implements OnInit {
    constructor(
        private elementRef: ElementRef
    ) {
        let el = this.elementRef.nativeElement;
        var width = 960,
            height = 500,
            barPadding = 2,

          data = [
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
],

            barWdth = (width / data.length) - barPadding,
            margin = { top: 10, right: 20, bottom: 30, left: 40 },

            //x = d3.scaleBand().range([0, width]).padding(0.1),
            y = d3.scaleLinear().range([height, 0]),


            //xScale = d3.scaleBand().domain(d3.range(0, data.length)).range([0, width]),
            svg = d3.select(el).append("svg").attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom),

            //xScale = d3.scaleBand().domain(data).range([width, 0]).padding(0.1);
            x = d3.scaleBand().domain(data).range([width, 0]).padding(0.1);
            //yScale = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);

            //map data to the x axis
            x.domain(data.map(function(d) { return d.key; }));
            y.domain([0, d3.max(data, function(d) { return d.value; })]);
            var g = svg.selectAll("g")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("class", "bar")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    g.selectAll("text").data(data).enter().append("text")
                    .text(function(d) {
                     return d.key;
                    })
                    .attr("text-anchor", "middle")
                    .attr("x", function(d, i) {
                     return x(i) ;
                    })
                    .attr("y", function(d) {
                     return y(d.value) + 14;
                    })
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "11px")
                    .attr("fill", (d) => d.color);

            g.append("rect")
          .attr("class", "bar")
            .attr("x", function(d) { return x(d.key); })
            .attr("width", x.bandwidth())
            .attr("fill", (d) => d.color)
            .attr("y", function(d) { return y(d.value); })
            .attr("height", (d) =>  height - y(d.value));

            //Add label to each rectangle
            g.append("text")
              .attr("class", "bar-label")
              .attr("x", (d) => x(d.key) + (x.bandwidth() / 2) - 15)
              .attr("y", (d) => y(d.value) + 15 )
              .text((d) => d.key)
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

    ngOnInit() {
        console.log("Bart chart directive loaded");
    }
}

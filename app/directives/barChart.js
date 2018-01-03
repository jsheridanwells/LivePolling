'use strict';

module.exports = function() {
  const link = (scope, el, attr) => {

    let barChartBox = $('#bar-chart-box');

    let margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = barChartBox.width() - margin.left - margin.right,
      height = barChartBox.height() - margin.top - margin.bottom;

    let svg = d3.select(el[0]).append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom);

    scope.$watch('data', function() {

      let data = scope.data;

      let x = d3.scale.linear()
              .range([0, width])
              .domain([0, d3.max(data, d => d)]);

      let y = d3.scale.ordinal()
              .rangeRoundBands([height, 0], 0.1)
              .domain(data.map(d => d));

      let yAxis = d3.svg.axis()
                  .scale(y)
                  .tickSize(1)
                  .orient('left');

      let gy = svg.append('g')
                .attr('class', 'y-axis')
                .call(yAxis);

      let bars = svg.selectAll('.bar')
                  .data(data)
                  .enter()
                  .append('g');

      bars.append('rect')
            .attr('class', 'bar')
            .attr('y', d => y(d))
            .attr('height', y.rangeBand())
            .attr('x', 0)
            .attr('width', d => x(d));


    });

  };

  return {
    link: link,
    restrict: 'A',
    scope: {data: '='}
  };
};

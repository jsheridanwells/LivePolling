'use strict';

module.exports = function() {
  const link = (scope, el, attr) => {

    let barChartBox = $('#bar-chart-box');

    let margin = {top: 0, right: 50, bottom: 50, left: 250},
      width = barChartBox.width() - margin.left - margin.right,
      height = barChartBox.height() - margin.top - margin.bottom;


    scope.$watch('data', () => {

    d3.select('#bar-chart-box').selectAll('svg').remove();

    let svg = d3.select('#bar-chart-box').append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

      let data = scope.data;

      let x = d3.scale.linear()
              .range([0, width])
              .domain([0, d3.max(data, d => d.percentage)]);

      let y = d3.scale.ordinal()
              .rangeRoundBands([height, 0], 0.1)
              .domain(data.map(d => d.itemContent));

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
            .attr('class', d => d.correct ? 'correct' : 'bar')
            .attr('y', d => y(d.itemContent))
            .attr('height', y.rangeBand())
            .attr('x', 0)
            .attr('width', d => x(d.percentage));

      bars.append('text')
            .attr('class', 'label')
            .attr('y', d => (y(d.itemContent) + y.rangeBand() /2) + 4)
            .attr('x', d => x(d.percentage) + 3)
            .text(d => d.percentage + '%');

    });

  };

  return {
    link: link,
    restrict: 'A',
    scope: {data: '='}
  };
};

'use strict';

module.exports = function() {
  const link = (scope, el, attr) => {

    let margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = el[0].clientWidth() - margin.left - margin.right,
      height = el[0].clientHeight() - margin.top - margin.bottom;

    let svg = d3.select(el[0]).append('svg')
      .attr('width', width)
      .attr('height', height);

  };

  return {
    link: link,
    restrict: 'A',
    scope: {data: '='}
  };
};

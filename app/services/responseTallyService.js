'use strict';

module.exports = function() {

  // called by showPresentationCtrl
  // parses array of responses per poll item
  // totals number of responses, total is used to divide, then maps percentages to percentageArr
  const tallyResponses = (itemsArr) => {
    let responseTotal = 0;
    let percentageArr = [];
    itemsArr.forEach(item => responseTotal += item.responses.length);
    itemsArr.forEach(item => {
      let currentPercentage = (item.responses.length / responseTotal * 100).toFixed(0);
      if (!isNaN(currentPercentage)) {
        percentageArr.push(`${currentPercentage}%`);
      } else {
        percentageArr.push('');
      }
    });
    return percentageArr;
  };

  // called by showPresentationsCtrl
  // takes array of total responses per poll item
  // reduces number to one total total is used to divide, then maps percentages to percentageArr
  const tallySocketResponses = (dataArr) => {
    let total = dataArr.reduce((a,b) => a + b);
      return dataArr.map(count => (((count / total) * 100).toFixed()).toString() + '%');
  };

  return {
    tallyResponses,
    tallySocketResponses
  };
};

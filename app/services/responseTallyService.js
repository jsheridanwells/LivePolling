'use strict';

module.exports = function() {

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

  return {tallyResponses};
};

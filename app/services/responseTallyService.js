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

  const tallySocketResponses = (dataArr, currentItems) => {
    let responseTotal = 0;
    let percentageArr = [];
    let cutArray = dataArr.slice((currentItems[0].id - 1), currentItems[currentItems.length - 1].id);
    cutArray.forEach(item => responseTotal += item.length);
    cutArray.forEach(item => {
      let currentPercentage = (item.length / responseTotal * 100).toFixed(0);
      if (!isNaN(currentPercentage)) {
        percentageArr.push(`${currentPercentage}%`);
      } else {
        percentageArr.push('');
      }
    });
    return percentageArr;

  };

  return {
    tallyResponses,
    tallySocketResponses
  };
};

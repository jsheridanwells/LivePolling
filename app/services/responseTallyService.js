'use strict';

module.exports = function() {

  // called by showPresentationCtrl when presentation is loaded
  // creates array of objects with item content, percentage of responses, and correct
  // passed into function that renders D3 bar graph

  const tallyResponses = (itemsArr) => {
    let responseTotal = 0;
    itemsArr.forEach(item => responseTotal += item.responses.length);
    return itemsArr.map(item => {
      let percentage = parseInt((item.responses.length / responseTotal * 100).toFixed(0));
      if (!isNaN(percentage)) {
        return {itemContent: item.content, percentage: percentage, correct: item.correct};
      } else {
        return {itemContent: item.content, percentage: 0, correct: item.correct};
      }
    }).reverse();
  };

  // called by showPresentationCtrl websockets when data comes through connection
  // creates array of objects with item content, percentage of responses, and correct
  // passed into function that renders D3 bar graph

  const tallySocketResponses = (itemsArr) => {
    let responseTotal = 0;
    itemsArr.forEach(item => responseTotal += item.responseCount);
    return itemsArr.map(item => {
      return {
        itemContent: item.itemContent,
        percentage: parseInt((item.responseCount / responseTotal * 100).toFixed(0)),
        correct: item.correct
      };
    }).reverse();
  };

  return {
    tallyResponses,
    tallySocketResponses
  };
};

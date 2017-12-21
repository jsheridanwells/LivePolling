'use strict';

module.exports = function () {

  // takes string
  // replaces any underscores with a space
  // returns string w/o underscores
  const removeUnderscores = (string) => {
    let cleanString = string.split('').map(char => {
      if (char === '_') {
        return ' ';
      } else {
        return char;
      }
    });
    return cleanString.join('');
  };

  return {removeUnderscores};
};

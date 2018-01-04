'use strict';

module.exports = function (
    stringService
  ) {

  // takes data from sign up errors
  // creates errorType and errorValues arrays, removes underscores in names
  const renderErrors = (errorData) => {
    let errorObject = {types: [], values: []};
    errorObject.types = Object.keys(errorData).map(string => stringService.removeUnderscores(string));
    errorObject.values = Object.values(errorData);
    return errorObject;
  };

  return {renderErrors};

};

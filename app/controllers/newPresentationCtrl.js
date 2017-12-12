'use strict';

app.controller('newPresentationCtrl', function(
  $scope,
  $window,
  presentationFactory
){

  $scope.presentation = {title: ''};

  $scope.createPresentation = () => {
    console.log('working');
  };


});

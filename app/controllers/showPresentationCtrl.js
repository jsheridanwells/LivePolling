'use strict';

app.controller('showPresentationCtrl', function(
  $scope,
  $routeParams,
  $window,
  presentationFactory,
  userFactory
) {

  let currentUserToken = userFactory.getCurrentUserToken();

  $scope.currentPresentation = {};

  const showPresentation = () => {
    console.log('i am getting called');
    presentationFactory.getPresentation($routeParams.presentationId, currentUserToken)
    .then(data => {
      console.log('data in show presentation', data);
      $scope.currentPresentation = data;
    })
    .catch(error => console.log(error));
  };

  $scope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
    showPresentation();
  });


});

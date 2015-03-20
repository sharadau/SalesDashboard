'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProspectViewCtrl
 * @description
 * # ProspectViewCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ProspectViewCtrl', function ($scope, $stateParams, ProspectService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     console.log($stateParams.prospectId);
    $stateParams.prospectId = 2;
    ProspectService.getProspect($stateParams.prospectId)
      .success (function (data){
      $scope.prospect = data;
     console.log(data);
    })
      .error (function (error){
      console.log (error.msg);});

    $scope.deleteProspect = function(prospectId) {
      ProspectService.deleteProspect(prospectId);
    }
    $scope.oneAtATime = true;

       $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  });

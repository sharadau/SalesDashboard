'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProspectEditCtrl
 * @description
 * # ProspectEditCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ProspectEditCtrl', function ($scope, $state, $stateParams, ProspectService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    /*ProspectService.getProspect($stateParams.prospectId)
      .success (function (data){
      $scope.prospect = data;
      $scope.newProspect = JSON.parse(JSON.stringify($scope.prospect));
    })
      .error (function (error){
      console.log (error.msg);});*/

    $scope.updateProspect = function (newProspect) {
      newProspect = newProspect || {};

      $scope.newProspect = {};

      ProspectService.updateProspect(newProspect);
     // $state.transitionTo('prospect.view', {prospectId: newProspect._id});
      $state.transitionTo('prospect.view', {prospectId: 1});
    };

    $scope.cancelUpdate = function() {
      $scope.newProspect = JSON.parse(JSON.stringify($scope.prospect));

    };
    $scope.addUniqueItem = function (collection, item) {
      collection = collection || [];
      if (-1 === collection.indexOf(item)) {
        collection.push(item);
      }
    };
  });

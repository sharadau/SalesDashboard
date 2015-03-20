'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ParticipantListCtrl
 * @description
 * # ParticipantListCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ParticipantListCtrl', function ($scope,$http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.participants = [
      {name: "Subu Sankara",_id:"1"},
      {name: "Rohit Ghatol",_id:"2"},
      {name: "Ashish Shanker",_id:"3"},
      {name: "Ashutosh Kumar",_id:"4"} 
    ];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(response){
        return response.data.results.map(function(item){
          return item.formatted_address;
        });
      });
    };

  });

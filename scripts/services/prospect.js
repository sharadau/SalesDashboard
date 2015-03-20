'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.prospect
 * @description
 * # prospect
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('ProspectService', function ($http) {
    var prospects = [];

    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getAllProspects = function () {
      //console.log("getAllprojects");
      var successCallback, errorCallback;
      var response = {
        success: function (callback) {successCallback = callback; return response;},
        error: function (callback) {errorCallback = callback; return response;}
      };


      $http.get('http://localhost:3000/api/projects')
      //$http.get('http://localhost:8080/SalesDashBoard/rest/prospect/fetchProspects/1')
        .success(function(items){
          prospects = items;
          successCallback(prospects);
        })
        .error(function(error){
          if (error) {
            errorCallback(error);
          }
        });

      return response;
    };

    this.getProspect = function (prospectId) {
      var successCallback, errorCallback;
      var response = {
        success: function (callback) {successCallback = callback; return response;},
        error: function (callback) {errorCallback = callback; return response;}
      };

      $http.get('http://localhost:3000/api/projects/'+prospectId)
        .success(function(item){
                successCallback(item);
        })
        .error(function(error){
          if (error) {
            errorCallback({msg: 'No prospect with: ' + prospectId + ' id'});
          }
        });

      return response;
    };

    this.addProspect = function(newProject) {
      $http.post('http://localhost:3000/api/projects', newProject)
        .success(function (item) {
          prospects.push(item);
        })
        .error(function (error) {
          if (error) {
            errorCallback(error);
          }
        });
    };

    this.deleteProspect = function(projId) {
      $http.delete('http://localhost:3000/api/projects/'+projId)
        .success(function (item) {var idx = getProspectIndex (prospects, '' + projId);
          if (idx !== -1) {
            prospects.splice(idx, 1);
          }
        })
        .error(function (error) {
          if (error) {
            errorCallback(error);
          }
        });
    };

    this.updateProspect = function(newProj) {
      console.log("inputs:");
      console.log(newProj);
      if(newProj._id) {
        $http.put('http://localhost:3000/api/projects/' + newProj._id, newProj)
          .success(function (item) {
            var idx = getProspectIndex(prospects, '' + newProj._id);
            if (idx !== -1) {
              prospects[idx] = item;
            }
          })
          .error(function (error) {
            if (error) {
              console.log(error);
            }
          });
      }else
      this.addProspect(newProj);
    };

    this.getProspectByName = function (prospects, name) {
      if (!prospects) {
        return undefined;
      }
      var len = prospects.length;
      for (var idx = 0; idx < len; idx++) {
        if (prospects[idx].name === name) {
          return prospects[idx];
        }
      }
      if (len > 0) {
        return prospects[0];
      }
      return undefined;
    };

    var getProspectIndex = function (prospects, prospectId) {
      var len = prospects.length;
      for (var idx = 0; idx < len; idx++) {
        if ('' + prospects[idx]._id === prospectId) {
          return idx;
        }
      }
      return -1;
    };
  });

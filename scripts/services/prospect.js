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
        success: function (callback) {
          successCallback = callback;
          return response;
        },
        error: function (callback) {
          errorCallback = callback;
          return response;
        }
      };


       $http.get('http://localhost:3000/api/projects')
      // $http.setRequestHeader("Access-Control-Allow-Origin", "*");
      /*$http.defaults.useXDomain = true;
      delete $http.defaults.headers.common['X-Requested-With'];
      $http.get('http://localhost:8080/SalesDashBoard/rest/prospect/fetchProspects/1')*/
        .success(function (items) {
          prospects = items;
          successCallback(prospects);
        })
        .error(function (error) {
          if (error) {
            errorCallback(error);
          }
        });


      //$.ajax({
      //  type: "POST",
      //  dataType: 'jsonp',
      //  url: 'http://localhost:8080/SalesDashBoard/rest/prospect/fetchProspects/1',
      //  crossDomain : true,
      //  headers: {
      //    'Content-Type': 'application/json'
      //  }
      //})
      //  .done(function( data ) {
      //    console.log("done");
      //  })
      //  .fail( function(xhr, textStatus, errorThrown) {
      //    alert(xhr.responseText);
      //    alert(textStatus);
      //    alert(errorThrown);
      //  });

     /* var baseRestUrl = 'http://localhost:8080';
      var req = {
        method: 'POST',
        url: 'http://localhost:8080//SalesDashBoard//rest//prospect//fetchProspects//1',
        headers: {
          'Content-Type': 'application/json'
        },
        datatype: 'jsonp'
      }
      $http(req).success(function (items) {
        success(items);
        console.log(items);
      });
*/
      return response;

      /*var promise = $http({
        url: 'http://localhost:8080/SalesDashBoard/rest/prospect/fetchProspects/1',
        method: 'POST',
        params: {
          contacts: "+123",
          text: "Testing"
        },
        headers: {
          'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
        }
      })*/
     /* $http({
        method : 'POST',
        url : 'http://localhost:8080/SalesDashBoard/rest/prospect/fetchProspects/1'
        //data : $.param($scope.formData), // pass in data as strings
        //headers : { 'Content-Type': 'application/json' } // set the headers so angular passing info as form data (not request payload)
      }).success(function (items) {
        prospects = items;
        successCallback(prospects);
      }).error(function (error) {
        if (error) {
          errorCallback(error);
        };
      });
      return response;*/


    };
    this.getProspect = function (prospectId) {
      var successCallback, errorCallback;
      var response = {
        success: function (callback) {successCallback = callback; return response;},
        error: function (callback) {errorCallback = callback; return response;}
      };
      console.log("prospect id: " + prospectId);
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

    this.addProspect = function(newProspect) {
      //var newProject={};
      newProspect.state = "New";
      newProspect.name = newProspect.name;
      newProspect.organization = newProspect.company;
      newProspect.employees = ['Ram','Raghu'];
      newProspect.owner = 'Ram';
      newProspect.openpositions = 2;
      newProspect.reddays = 0;
    //  newProspect._id = getUniqueTime();
      $http.post('http://localhost:3000/api/projects', newProspect)
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

    this.updateProspect = function(newProspect) {
      console.log("inputs:");
      console.log(newProspect);

        $http.put('http://localhost:3000/api/projects/' + newProspect._id, newProspect)
          .success(function (item) {
            var idx = getProspectIndex(prospects, '' + newProspect._id);
            if (idx !== -1) {
              prospects[idx] = item;
            }
          })
          .error(function (error) {
            if (error) {
              console.log(error);
            }
          });

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

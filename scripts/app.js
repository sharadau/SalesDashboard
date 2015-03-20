'use strict';

/**
 * @ngdoc overview
 * @name dashboardApp
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */
angular
  .module('dashboardApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap'
  ]).config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "views/home.html",
        controller: "HomeCtrl"
      })
      .state("prospect", {
        url: "/prospect",
        templateUrl: "views/prospect.html",
        controller: "ProspectCtrl"
      })
      .state("prospect.edit", {
        url: "/edit",
        templateUrl: "views/prospect.edit.html",
        controller: "ProspectEditCtrl"
      })
      .state("prospect.view", {
        url: "/view",
        templateUrl: "views/prospect.view.html",
        controller: "ProspectViewCtrl"
      })
      .state("participant", {
        url: "/participant",
        templateUrl: "views/participant.html",
        controller: "ParticipantCtrl"
      })
      .state("participant.list", {
        url: "/list",
        templateUrl: "views/participant.list.html",
        controller: "ParticipantListCtrl"
      })
  });

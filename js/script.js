// Creates the module.
var module = angular.module('mainApp', ['ngRoute', 'ngAnimate']);

// Configures the routes.
module.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', { // Route for the home page.
    templateUrl : 'about.html',
    controller  : 'aboutController'
  }).when('/about', { // Route for the about page.
    templateUrl : 'about.html',
    controller  : 'aboutController'
  }).when('/projects', { // Route for the projects page.
    templateUrl : 'projects.html',
    controller  : 'projectsController'
  }).when('/resume', { // Route for the resume page.
    templateUrl : 'resume.html',
    controller  : 'resumeController'
  }).when('/contact', { // Route for the contact page.
    templateUrl : 'contact.html',
    controller  : 'contactController'
  }).otherwise({
    redirectTo: '/'
  });
}]);

// Sets the controllers.
module.controller('aboutController', function($scope, $routeParams) {
  $scope.param = $routeParams.param;
  $scope.pageClass = 'page-about';
  loadStyles();
});

module.controller('projectsController', function($scope, $routeParams) {
  $scope.param = $routeParams.param;
  $scope.pageClass = 'page-projects';
  loadStyles();
});

module.controller('resumeController', function($scope, $routeParams) {
  $scope.param = $routeParams.param;
  $scope.pageClass = 'page-resume';
  loadStyles();
});

module.controller('contactController', function($scope, $routeParams) {
  $scope.param = $routeParams.param;
  $scope.pageClass = 'page-contact';
  loadStyles();
});

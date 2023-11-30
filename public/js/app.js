// public/js/app.js

var app = angular.module('kisanSuvidhaApp', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })
    .when('/schemes', {
        templateUrl: 'views/schemes.html',
        controller: 'SchemeController'
    })
    .when('/equipment', {
        templateUrl: 'views/equipment.html',
        controller: 'EquipmentController'
    })
    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainController'
    })
    .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'MainController'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'UserController'
    })
    .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'UserController'
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event) {

        if (!AuthService.isLoggedIn() && ($location.path() === '/equipment')) {
            console.log('DENY : Redirecting to Login');
            event.preventDefault();
            $location.path('/login');
        }
        else {
            console.log('ALLOW');
        }
    });
}]);

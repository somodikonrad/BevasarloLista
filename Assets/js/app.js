var app = angular.module('listApp', ['ngRoute', 'ngNotify']);

app.run(function($rootScope, $location){
    $rootScope.appTitle = 'Bevásárlólista';
    $rootScope.author = '12.A szoftverfejlesztő';
    $rootScope.company = 'Bajai SZC Türr István Technikum';
    $rootScope.serverUrl = 'http://localhost:5000';
   // $rootScope.serverUrl = 'http://weatherforecastapp.com';

    if (JSON.parse(sessionStorage.getItem('listApp'))){
        $rootScope.isLoggedIn = true;
    }else{
        $rootScope.isLoggedIn = false;
        $location.path('/login');
    }
});

app.config(function($routeProvider){
    $routeProvider
    .when('/home', {
        templateUrl: '/Views/home.html'
    })
    .when('/login', {
        templateUrl: '/Views/login.html',
        controller: 'userCtrl'
    })
    .when('/register', {
        templateUrl: '/Views/register.html',
        controller: 'userCtrl'
    })
    .when('/newdata', {
        templateUrl: '/Views/list.html',
        controller: 'ListCtrl'
    })
    .otherwise({redirectTo:'/home'});
});
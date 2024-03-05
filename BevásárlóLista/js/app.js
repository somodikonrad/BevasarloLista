app.config(function($routeProvider){

    $routeProvider
    .when('/login', {
        templateUrl: 'Views/login.html',
        controller: 'userCtrl'
    })
    .when('/registration', {
        templateUrl: 'Views/registration.html',
        controller: 'userCtrl'
    })
    .when('/list', {
        templateUrl: 'Views/list.html',
        controller: ''
    })
    .otherwise(
        {redirectTo: '/login'}
    )
});
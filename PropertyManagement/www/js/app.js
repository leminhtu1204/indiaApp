angular.module('App', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home/home.html'
            })
            .state('register', {
                url: '/register',
                controller: 'registerController',
                templateUrl: 'views/register/register.html'
            })
            .state('login', {
                url: '/login',
                controller: "loginController",
                templateUrl: 'views/login/login.html'
            });

  $urlRouterProvider.otherwise('/login');

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

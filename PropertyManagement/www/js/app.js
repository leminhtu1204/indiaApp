angular.module('Belowval', ['ionic', 'Belowval.Bootstrap', 'Belowval.Login', 'Belowval.Home', 'Belowval.Register', 'Belowval.GroupProperty',
    'Belowval.PropertyDetail', 'Belowval.Profile','Belowval.SearchResult', 'Belowval.Search', 'Belowval.Settings', 'ngCordova'])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('belowval', {
                url: '/belowval',
                abstract: true,
                controller: 'BootstrapController',
                templateUrl: 'views/bootstrap/profile-menu.html'
            })
            .state('belowval.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        controller: 'HomeController',
                        templateUrl: 'views/home/home.html'
                    }
                }
            })
            .state('belowval.groupProperty', {
                url: '/group/:id',
                views: {
                    'menuContent': {
                        controller: 'GroupPropertyController',
                        templateUrl: 'views/groupProperty/groupProperty.html'
                    }
                }
            })
            .state('belowval.searhResult', {
                url: '/search-detail',
                params: {obj: null},
                views: {
                    'menuContent': {
                        controller: 'SearchResultController',
                        templateUrl: 'views/searchResult/searchResult.html'
                    }
                }
            })
            .state('belowval.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        controller: 'SearchController',
                        templateUrl: 'views/search/search.html'
                    }
                }
            })
            .state('belowval.my-profile', {
                url: '/my-profile',
                views: {
                    'menuContent': {
                        controller: 'MyProfileController',
                        templateUrl: 'views/profile/my-profile.html'
                    }
                }
            })
            .state('belowval.detail', {
                url: '/detail/:id',
                views: {
                    'menuContent': {
                        controller: 'PropertyDetailController',
                        templateUrl: 'views/property/propertyDetail.html'
                    }
                }
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
            })
            .state('settings', {
                url: '/settings',
                controller: "SettingsController",
                templateUrl: 'views/settings/settings.html'
            });
        $urlRouterProvider.otherwise('/login');
    })

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

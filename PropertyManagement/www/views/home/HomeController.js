angular.module('Belowval.Home', [])

    .controller('HomeController', function ($scope, $state) {
        console.log("Home Controller is loading..")

        /*$scope.logout = function () {
            window.localStorage.removeItem('profile')
            console.log("Logout - Remove profile")
            $state.go('login');
        }*/
    });

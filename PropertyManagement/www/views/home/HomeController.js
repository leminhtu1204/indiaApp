angular.module('Belowval.Home', [])

    .controller('HomeController', function ($scope, $state) {
        console.log("Load HomeController")

        if (window.localStorage.getItem('profile') != undefined) {
            console.log(window.localStorage.getItem('profile'))
        } else {
            $state.go('login');
        }

        $scope.logout = function () {
            window.localStorage.removeItem('profile')
            console.log("Logout - Remove profile")
            $state.go('login');
        }
    });

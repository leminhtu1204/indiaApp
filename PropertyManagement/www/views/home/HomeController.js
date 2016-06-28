angular.module('Belowval.Home', [])

    .controller('HomeController', function ($scope, $state, $http) {

        ws_end_point = "http://underval.com/underval.com/engineermaster/api/api.php";

        $scope.init = function() {
            $http.post(ws_end_point, { "method": 3 }).success(function(data) {
                $scope.homeData = data.data;
            }).error(function() {
                
            });

        }

        if (window.localStorage.getItem('profile') != undefined) {
            $scope.init();
        } else {
            $state.go('login');
        }

        $scope.logout = function () {
            window.localStorage.removeItem('profile');
            $state.go('login');
        }
    });

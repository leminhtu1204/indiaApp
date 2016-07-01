angular.module('Belowval.Home', []).controller('HomeController', function ($scope, $state, $http) {

    ws_end_point = "http://underval.com/underval.com/engineermaster/api/api.php";
    $scope.homeData = [];
    $scope.init = function () {
        $http.post(ws_end_point, { "method": "3a" }).success(function (data) {
            $scope.homeData = data;

        }).error(function () {

        });
    };

    $scope.countPercent = function (a, b) {
        if (!!a && !!b) {
            return Math.round((a - b) / a * 100);
        }
        return 0;
    };

    $scope.formatNumber = function (x) {
        if (!!x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }

        return 0;
    };

    if (window.localStorage.getItem('profile') != undefined) {
        $scope.init();
    } else {
        $state.go('login');
    }
});

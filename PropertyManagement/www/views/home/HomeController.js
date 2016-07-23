angular.module('Belowval.Home', []).controller('HomeController', function (UserLogin, $scope, $state, $http) {

    ws_end_point = UserLogin.getWsEndPoint();
    $scope.homeData = [];
    $scope.init = function () {
        $http.post(ws_end_point, { "method": "3a" }).success(function (data) {
            $scope.homeData = data;

        }).error(function () {

        });
    };

    $scope.getOnlyNumber = function (string) {
        if (!!string) {
            return string.split(" ")[0];
        }
        return 0;
    };

    $scope.redirect = function(id, page) {
        $state.go('belowval.' + page, {"id":id});
    };

    $scope.countPercent = function (a, b) {
        if (a && b) {
            return Math.round((a - b) / a * 100);
        }
        return 0;
    };

    $scope.formatNumber = function (x) {
        if (!!x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        return 0;
    };

    if (window.localStorage.getItem('profile') != undefined) {
        $scope.init();
    } else {
        $state.go('login');
    }
});

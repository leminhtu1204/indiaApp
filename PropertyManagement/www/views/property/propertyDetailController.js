angular.module('Belowval.PropertyDetail', []).controller('PropertyDetailController', function ($scope, $state, $http) {

    ws_end_point = "http://underval.com/underval.com/engineermaster/api/api.php";
    $scope.homeData = [];
    $scope.init = function () {
        $http.post(ws_end_point, { "method": 3 }).success(function (data) {
            for (var item in data) {
                $scope.homeData.push(data[item]);
            }

        }).error(function () {

        });
    };

    $scope.countPercent = function(a, b) {
        return Math.round((a - b) / a * 100);
    };

    $scope.formatNumber = function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    if (window.localStorage.getItem('profile') != undefined) {
        $scope.init();
    } else {
        $state.go('login');
    }
});

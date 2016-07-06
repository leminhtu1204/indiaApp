angular.module('Belowval.GroupProperty', []).controller('GroupPropertyController', function ($stateParams, UserLogin, $scope, $state, $http) {

    ws_end_point = UserLogin.getWsEndPoint();
    $scope.groupData = [];
    $scope.init = function () {
        if ($stateParams.obj) {
            $stateParams.obj.method = "9";
            $http.post(ws_end_point, JSON.stringify($stateParams.obj)).success(function (data) {
                $scope.groupData = data;

            }).error(function () {

            });
        } else {
            $http.post(ws_end_point, { "method": "7", "group_id": $stateParams.id }).success(function (data) {
                $scope.groupData = data;

            }).error(function () {

            });
        }
       
    };

    $scope.backToPrevious = function () {
        $state.go('belowval.home');
    };

    $scope.getOnlyNumber = function (string) {
        if (!!string) {
            return string.split(" ")[0];
        }
        return 0;
    };

    $scope.redirect = function (id, page) {
        $state.go('belowval.' + page, { "id": id });
    };

    $scope.countPercent = function (a, b) {
        if (a && b) {
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

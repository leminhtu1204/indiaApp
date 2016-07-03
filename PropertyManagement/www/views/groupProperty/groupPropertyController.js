angular.module('Belowval.GroupProperty', []).controller('GroupPropertyController', function ($stateParams, UserLogin, $scope, $state, $http) {

    ws_end_point = UserLogin.getWsEndPoint();
    $scope.groupData = [];
    $scope.init = function () {
        $http.post(ws_end_point, { "method": "7", "group_id": $stateParams.id }).success(function (data) {
            $scope.groupData = data;

        }).error(function () {

        });
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

    $scope.redirectToDetail = function(id) {
        $state.go('belowval.detail', {"id":id});
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

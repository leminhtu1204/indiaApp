angular.module('Belowval.PropertyDetail', []).controller('PropertyDetailController', function (UserLogin, $scope, $state, $http, $stateParams, $ionicSlideBoxDelegate) {

    ws_end_point = UserLogin.getWsEndPoint();

    $scope.init = function () {
        $http.post(ws_end_point, { "method": 5, "propertyid": $stateParams.id }).success(function (data) {
            $scope.property = data;
            setTimeout(function () {
                $ionicSlideBoxDelegate.slide(0);
                $ionicSlideBoxDelegate.update();
                $scope.$apply();
            });
        }).error(function () {

        });
    };

    $scope.backToPrevious = function() {
        $state.go('belowval.home');
    };

    if (window.localStorage.getItem('profile') != undefined) {
        $scope.init();
    } else {
        $state.go('login');
    }
});

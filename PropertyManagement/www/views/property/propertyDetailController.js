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

    $scope.formatNumber = function (x) {
        if (!!x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        return 0;
    };

    $scope.countBelow = function(valuation, price) {
        if (!valuation) {
            return 0;
        }

        return $scope.formatNumber(Math.round(valuation - price));
    };

    $scope.getPricePerSqrt = function(price, sqrt) {
        return $scope.formatNumber(Math.round(price / sqrt));
    }

    $scope.backToPrevious = function() {
        $state.go('belowval.home');
    };

    if (window.localStorage.getItem('profile') != undefined) {
        $scope.init();
    } else {
        $state.go('login');
    }
});

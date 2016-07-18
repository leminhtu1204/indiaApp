angular.module('Belowval.PropertyDetail', []).controller('PropertyDetailController', function (UserLogin, $scope, $state, $http, $stateParams, $ionicSlideBoxDelegate) {

    ws_end_point = UserLogin.getWsEndPoint();

    var userInfo = JSON.parse(window.localStorage.getItem('profile')).data.user_data;
    var favourites = JSON.parse(window.localStorage.getItem('listFavourites'));
    $scope.favoriteStatus = true;

    $scope.init = function () {
        $http.post(ws_end_point, { "method": 5, "propertyid": $stateParams.id }).success(function (data) {
            $scope.property = data;
            getFavouriteStatus($stateParams.id);
            setTimeout(function () {
                $ionicSlideBoxDelegate.slide(0);
                $ionicSlideBoxDelegate.update();
                $scope.$apply();
            });
        }).error(function () {

        });
    };

    var getFavouriteStatus = function (propertyId) {
        for (var i = 0; i < favourites.length; i++) {
            if (favourites[i].id == propertyId ) {
                $scope.favoriteStatus = true;
                return;
            }
        }
       
        $scope.favoriteStatus = false;
    }

    $scope.addFavorite = function () {
        var favoriteItem = { "method": "11a", "user_id": userInfo.ID, "propertyid": $stateParams.id };
        $http.post(ws_end_point, JSON.stringify(favoriteItem)).success(function (data) {
            $scope.favoriteResult = data;

            if (data.results == 3) {
                favourites.push($scope.property);
                window.localStorage.setItem('listFavourites', JSON.stringify(favourites));
                $scope.favoriteStatus = true;
            }
        }).error(function () {

        });
    }

    $scope.removeFavorite = function () {
        var favoriteItem = { "method": "11b", "user_id": userInfo.ID, "propertyid": $stateParams.id }
        $http.post(ws_end_point, JSON.stringify(favoriteItem)).success(function (data) {
            $scope.favoriteResult = data;

            if (data.results == 3) {
                var newFavourites = favourites.filter(function (value) { return value.id != $stateParams.id; });
               
                window.localStorage.setItem('listFavourites', JSON.stringify(newFavourites));
                $scope.favoriteStatus = false;
            }
        }).error(function () {

        });
    }

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

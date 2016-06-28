angular.module('Belowval.Home', [])

    .controller('HomeController', function($scope, $state, $http) {

    ws_end_point = "http://underval.com/underval.com/engineermaster/api/api.php";
    $scope.homeData = [];
    $scope.init = function () {
        var temKey = [];
        $http.post(ws_end_point, { "method": 3 }).success(function (data) {
            for (var item in data) {
                temKey.push(item);
            }

            for (var i = 0; i < temKey.length; i++) {
                $scope.homeData.push(data[temKey[i]]);
            }

        }).error(function() {

        });

    }

    if (window.localStorage.getItem('profile') != undefined) {
        $scope.init();
    } else {
        $state.go('login');
    }
});

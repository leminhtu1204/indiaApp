angular.module('Belowval.Register', [])
.controller('registerController', function ($scope, $state, $http) {
    var url = 'http://underval.com/underval.com/engineermaster/api/api.php';
    var header = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    $scope.registerData = { method: '2' };
    $scope.register = function () {
        $http.post(url, JSON.stringify($scope.registerData), header)
        .success(function (data) {
            if (data.results === "3") {
                $state.go('home');
            } else {
                //$state.go('login');
            }
        }).error(function (err) {
        });
    }
});

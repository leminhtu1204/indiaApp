angular.module('Belowval.Login', ['Belowval.LoginService'])

    .controller('loginController', function ($scope, $http, $state, UserLogin) {
        var url = 'http://underval.com/underval.com/engineermaster/api/api.php';
        var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        $scope.data = {method: '1'};
        $scope.login = function () {
            $http.post(url, JSON.stringify($scope.data), header)
                .success(function (data) {
                    if (data.results === "3") {
                        $state.go('home');
                    } else {
                        //$state.go('login');
                    }
                }).error(function (err) {
            });
        }

        // Test login-service
        // UserLogin.login();
        // UserLogin.register();

    });

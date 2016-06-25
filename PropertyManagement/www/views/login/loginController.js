angular.module('Belowval.Login', ['Belowval.LoginService'])

    .controller('loginController', function ($scope, $state, UserLogin) {
        $scope.login = function (data) {
            data.method = 1;
            console.log(data);

            UserLogin.login(data).then(function (response) {
                $scope.profile = response;
                console.log(response.status);

                if (response.status == '200') {
                    console.log("Login: Successfully!");
                    $state.go("home");
                } else {
                    console.log(response.data.msg)
                    $state.go("login");
                }
            });

        }

        // Test login-service
        // UserLogin.login();
        // UserLogin.register();

    });

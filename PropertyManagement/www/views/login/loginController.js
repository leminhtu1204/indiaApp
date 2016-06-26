angular.module('Belowval.Login', ['Belowval.LoginService'])

    .controller('loginController', function ($scope, $state, UserLogin, $ionicPopup, $timeout) {
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

                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: response.data.msg
                    });

                    $timeout(function () {
                        alertPopup.close();
                    }, 3000)

                    alertPopup.then(function(res) {
                        $state.go("login");
                    });
                }
            });

        }

        // Test login-service
        // UserLogin.login();
        // UserLogin.register();

    });

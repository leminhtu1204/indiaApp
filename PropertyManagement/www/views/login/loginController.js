angular.module('Belowval.Login', ['Belowval.LoginService'])

    .controller('loginController', function ($scope, $state, UserLogin, $ionicPopup, $timeout, $ionicLoading) {
        $scope.login = function (data) {
            if (data != null) {
                data.method = 1;
            }
            console.log(data);

            $scope.show($ionicLoading);

            UserLogin.login(data).then(function (response) {
                $scope.profile = response;
                console.log(response.status);

                if (response.status == '200') {
                    console.log("Login: Successfully!");

                    window.localStorage.setItem("profile", JSON.stringify(response))
                    console.log("Save profile to local storage")

                    $scope.hide($ionicLoading);

                    $state.go("home");
                } else {
                    console.log(response.data.msg)

                    $scope.hide($ionicLoading);

                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: response.data.msg
                    });

                    $timeout(function () {
                        alertPopup.close();
                    }, 3000)

                    alertPopup.then(function() {
                        $state.go("login");
                    });
                }
            });

        }

        $scope.show = function() {
            $ionicLoading.show({
                template: 'Checking...'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };

        // Test login-service
        // UserLogin.login();
        // UserLogin.register();

    });

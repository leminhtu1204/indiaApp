angular.module('Belowval.Register', ['Belowval.LoginService'])

    .controller('registerController', function ($scope, $state, UserLogin, $ionicPopup, $timeout, $ionicLoading) {

        $scope.register = function (data) {
            if (data != null) {
                data.method = 2;
            }
            console.log(data);

            $scope.show($ionicLoading);

            UserLogin.register(data).then(function (response) {
                $scope.profile = response;
                console.log(response.status);

                if (response.status == '200') {
                    console.log("Register: Successfully!");

                    window.localStorage.setItem("profile", JSON.stringify(response))
                    console.log("Save profile to local storage")

                    $scope.hide($ionicLoading);

                    $state.go("home");
                } else {
                    console.log(response.data.msg)

                    $scope.hide($ionicLoading);

                    var alertPopup = $ionicPopup.alert({
                        title: 'Register failed!',
                        template: response.data.msg
                    });

                    $timeout(function () {
                        alertPopup.close();
                    }, 3000)

                    alertPopup.then(function () {
                        $state.go("login");
                    });
                }
            });
        };

        $scope.show = function () {
            $ionicLoading.show({
                template: 'Register...'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };
    });

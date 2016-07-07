angular.module('Belowval.Login', ['Belowval.LoginService'])
    .run(function() {
        console.log("Login module is loading ..")
    })

    .controller('loginController', function ($ionicHistory, $scope, $state, UserLogin, $ionicPopup, $timeout, $ionicLoading) {
        console.log("Login controller is loading..");

        if (window.localStorage.getItem('profile') != undefined) {
             console.log("Has been login")
             $state.go('belowval.home');
        }

        $scope.$on("$ionicView.enter", function (scopes, states) {
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
        });

        $scope.login = function (data) {
            var message = "";
            if (data != null) {
                data.method = 1;
            } else {
                console.log("Missing data");
                message = "Please type your user & pass!"
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

                    $state.go('belowval.home');
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
            }, function(){
                console.log('Unable to connect service!');

                $scope.hide($ionicLoading);
                if (data != null) {
                    message = "Unable to connect service!";
                }

                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: message
                });

                $timeout(function () {
                    alertPopup.close();
                }, 3000)

                alertPopup.then(function() {
                    $state.go("login");
                });
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

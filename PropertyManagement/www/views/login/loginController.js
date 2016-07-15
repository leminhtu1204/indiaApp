﻿angular.module('Belowval.Login', ['Belowval.LoginService'])
    .run(function () {
        console.log("Login module is loading ..")
    })

    .controller('loginController', function ($ionicHistory, $scope, $state, UserLogin, $ionicPopup, $timeout
        , $ionicLoading, $ionicModal) {
        console.log("Login controller is loading..");

        if (window.localStorage.getItem('profile') != undefined) {
            console.log("Has been login")
            $state.go('belowval.home');
        }


        // TODO: Test notification
        var data1 = {"method": 12, "user_id": 123};
        var data2 = {"method": 13, "user_id": 123};
        UserLogin.checkNotifications(data1);
        UserLogin.getAllNotifications(data2);


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

                    alertPopup.then(function () {
                        $state.go("login");
                    });
                }
            }, function () {
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

                alertPopup.then(function () {
                    $state.go("login");
                });
            });

        }

        $scope.show = function () {
            $ionicLoading.show({
                template: 'Checking...'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        // Create the forgot pass modal
        $ionicModal.fromTemplateUrl('views/login/forgot-password.html', {
            scope: $scope
        }).then(function (modal) {
            console.log("init forgot password modal");
            $scope.modal = modal;
        });

        $scope.showForgotPasswordModal = function () {
            console.log("show forgot pass modal");
            $scope.modal.show();
        }

        $scope.closeForgotPasswordModal = function () {
            console.log("Close forgot pass modal");
            $scope.modal.hide();
        }

        $scope.submitForgotPasswordModal = function () {
            // $scope.showWithTemplate("Sending..", 3000);
            $scope.showWithTemplate("Successful! Please check your email to get it!", 3000);

            $timeout(function () {
                $scope.closeForgotPasswordModal()
            }, 4000)
        }

        $scope.showWithTemplate = function (template, duration) {
            $ionicLoading.show({
                template: template,
                duration: duration
            });
        };
    });

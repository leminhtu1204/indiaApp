﻿angular.module('Belowval.Register', ['Belowval.LoginService'])
    .run(function () {
        console.log("Register module is loading..");
    })

    .controller('registerController', function ($scope, $state, UserLogin, $ionicPopup, $timeout, $ionicLoading) {
        console.log("Register controller is loading ..");

        $scope.register = function (data) {
            var message = "";

            if (data != null) {
                data.method = 2;
            } else {
                console.log("Missing data");
                message = "Missing data! - Please input your info!";
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

                    $state.go('belowval.home');
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
            }, function (error) {
                console.log("Unable to connect service!");

                $scope.hide($ionicLoading);

                if (data != null) {
                    message = "Unable to connect service!";
                }

                var alertPopup = $ionicPopup.alert({
                    title: 'Register failed!',
                    template: message
                });

                $timeout(function () {
                    alertPopup.close();
                }, 3000)

                alertPopup.then(function () {
                    $state.go("login");
                });
            });
        };

        $scope.show = function () {
            $ionicLoading.show({
                template: 'Registering...'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

    })

    .directive("passwordVerify", function () {
        return {
            require: "ngModel",
            scope: {
                passwordVerify: '='
            },
            link: function (scope, element, attrs, ctrl) {
                scope.$watch(function () {
                    var combined;

                    if (scope.passwordVerify || ctrl.$viewValue) {
                        combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                    }
                    return combined;
                }, function (value) {
                    if (value) {
                        ctrl.$parsers.unshift(function (viewValue) {
                            var origin = scope.passwordVerify;
                            if (origin !== viewValue) {
                                ctrl.$setValidity("passwordVerify", false);
                                return undefined;
                            } else {
                                ctrl.$setValidity("passwordVerify", true);
                                return viewValue;
                            }
                        });
                    }
                });
            }
        };
    })



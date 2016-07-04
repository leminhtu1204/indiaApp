/**
 * Created by TrungTrinh on 7/2/16.
 */

angular.module('Belowval.Profile', ['Belowval.LoginService'])

    .run(function () {
        console.log('Profile module is loading ..');
    })

    .controller('MyProfileController', function ($scope, $state, UserLogin, $ionicLoading, $ionicPopup, $timeout) {
        console.log('My Profile controller is loading ..');

        $scope.myProfile = JSON.parse(window.localStorage.getItem('profile')).data.user_data;

        $scope.goBack = function () {
            console.log("Go Back")
            $state.go('belowval.home');
        }

        $scope.updateMyProfile = function () {
            $scope.show("Loading..", 10000);

            console.log("Update my profile");
            var request = {};
            request.method = 6;
            request.user_data = $scope.myProfile;

            UserLogin.updateMyProfile(request).then(function (response) {
                $scope.hide();

                if (response.status == '200') {
                    $scope.show(response.data.msg, 3000);
                } else {
                    $scope.showAlert(response.data.msg);
                }
            }, function (response) {
                $scope.hide($ionicLoading);
                $scope.showAlert(response.data.msg);
            })
        }

        $scope.show = function (template, duration) {
            $ionicLoading.show({
                template: template,
                duration: duration
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.showAlert = function(msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Alert!!!',
                template: msg
            });

            alertPopup.then(function(res) {
                console.log(res);
            });
        };
    })
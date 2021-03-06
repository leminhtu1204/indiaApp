angular.module('Belowval.Bootstrap', ['Belowval.LoginService'])
    .run(function () {
        console.log("Bootstrap module is loading..")
    })

    .controller('BootstrapController', function ($scope, $state, $ionicModal, UserLogin, $timeout
        , $rootScope, $ionicPlatform, $ionicLoading, $ionicPopup) {
        console.log("Loading bootstrap controller");

        $scope.changePassFormData = {};
        $scope.myProfile = JSON.parse(window.localStorage.getItem('profile')).data.user_data;

        $scope.logout = function () {
            console.log("Logout - Remove profile - " + $scope.myProfile.ID);
            window.localStorage.removeItem('profile');
            $state.go('login');
        }

        // Create the change password modal
        $ionicModal.fromTemplateUrl('views/profile/change-password.html', {
            scope: $scope
        }).then(function (modal) {
            console.log("init change pass modal");
            $scope.modal = modal;
        });

        $scope.showChangePasswordModal = function () {
            console.log("show change pass modal");
            $scope.modal.show();
        }

        $scope.goToSearch = function () {
            $state.go('belowval.search');
        }

        $scope.closeChangePasswordModal = function () {
            console.log("Close change pass modal");
            $scope.modal.hide();
        }

        $scope.goToFavourite = function() {
            $state.go('belowval.favourite');
        };

        $scope.submitChangePasswordModal = function () {
            var profile = window.localStorage.getItem('profile');
            var userID = JSON.parse(window.localStorage.getItem('profile')).data.user_data.ID;
            console.log("Send request \"Change password\" for user id: ", userID);

            var data = {};
            data.method = '4a';
            data.id = userID;
            data.oldpassword = $scope.changePassFormData.oldPassword;
            data.newpassword = $scope.changePassFormData.newPassword;

            $scope.showLoading("Submitting..", 60000);

            UserLogin.changePassword(data).then(function (success) {
                if (success.status == '200') {
                    console.log("Submitting: Successfully!");
                    $scope.showLoading("Submitting successfully!", 3000);

                    $timeout(function () {
                        $scope.closeChangePasswordModal();
                    }, 4000);
                } else {
                    console.log(success.statusText)
                    $scope.hideLoading();
                    $scope.showAlert("Change password failed!", success.statusText);
                }
            }, function (error) {
                console.log('Unable to connect service!', error);
                $scope.showAlert("Change password failed!", "Unable to connect service!");
            });
        }

        $ionicPlatform.ready(function () {
            console.log("Load ionic platform");
        })

        $scope.showLoading = function (template, duration) {
            $ionicLoading.show({
                template: template,
                duration: duration
            });
        }

        $scope.hideLoading = function () {
            $ionicLoading.hide();
        }

        $scope.showAlert = function (title, template) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: template
            });

            $timeout(function () {
                alertPopup.close();
            }, 3000)
        }
    });

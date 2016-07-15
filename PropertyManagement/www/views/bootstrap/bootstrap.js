angular.module('Belowval.Bootstrap', ['Belowval.LoginService'])
    .run(function () {
        console.log("Bootstrap module is loading..")
    })

    .controller('BootstrapController', function ($scope, $state, $ionicModal, UserLogin, $timeout
        , $rootScope, $ionicPlatform, $cordovaLocalNotification, $ionicLoading, $ionicPopup) {
        console.log("Loading bootstrap controller");

        $scope.changePassFormData = {};
        $scope.myProfile = JSON.parse(window.localStorage.getItem('profile')).data.user_data;

        $scope.logout = function () {
            /* if (ionic.Platform.isWebView()) {
             $scope.scheduleSingleNotification();
             } else {
             }*/

            window.localStorage.removeItem('profile');
            console.log("Logout - Remove profile");
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

            /*            $scope.scheduleSingleNotification = function () {
             console.log("Scheduler notification");

             $cordovaLocalNotification.schedule({
             id: 1,
             title: 'Title here',
             text: 'Text here',
             every: 'minute',
             data: {
             customProperty: 'custom value'
             }
             }).then(function (result) {
             // ...
             });
             };

             $rootScope.$on('$cordovaLocalNotification:click',
             function (event, notification, state) {
             // ...
             });*/

            $rootScope.$on('$cordovaLocalNotification:schedule',
                function (event, notification, state) {
                    console.log("Scheduler event");
                });

            $rootScope.$on('$cordovaLocalNotification:trigger',
                function (event, notification, state) {
                    // ...
                    console.log("Notification trigger event")
                });

            $rootScope.$on('$cordovaLocalNotification:cancel',
                function (event, notification, state) {
                    // ...
                    console.log("Notification cancel event");
                });
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

angular.module('Belowval.Bootstrap', ['Belowval.LoginService'])
    .run(function () {
        console.log("Bootstrap module is loading..")
    })

    .controller('BootstrapController', function ($scope, $state, $ionicModal, UserLogin) {
        console.log("Loading bootstrap controller");

        $scope.changePassFormData = {};

        $scope.logout = function () {
            window.localStorage.removeItem('profile');
            console.log("Logout - Remove profile");
            $state.go('login');
        }

        // Create the change password modal
        $ionicModal.fromTemplateUrl('views/profile/change-password.html', {
            scope: $scope
        }).then(function (modal) {
            console.log("init chane pass modal");
            $scope.modal = modal;
        });

        $scope.showChangePasswordModal = function () {
            console.log("show change pass modal");
            $scope.modal.show();
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

            UserLogin.changePassword(data).then(function (response) {
                $scope.closeChangePasswordModal();
            }, function (response) {

            });
        }

    });

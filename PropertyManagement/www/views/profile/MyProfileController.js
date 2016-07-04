/**
 * Created by TrungTrinh on 7/2/16.
 */

angular.module('Belowval.Profile', ['Belowval.LoginService'])

    .run(function () {
        console.log('Profile module is loading ..');
    })

    .controller('MyProfileController', function ($scope, $state, UserLogin, $ionicLoading, $ionicPopup, $cordovaCamera
        , $cordovaFileTransfer) {
        console.log('My Profile controller is loading ..');

        $scope.myProfile = JSON.parse(window.localStorage.getItem('profile')).data.user_data;

        $scope.goBack = function () {
            console.log("Go Back")
            $state.go('belowval.home');
        }

        $scope.updateMyProfile = function () {
            $scope.show("Updating..", 10000);

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

        $scope.showAlert = function (msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Alert!!!',
                template: msg
            });

            alertPopup.then(function (res) {
                console.log(res);
            });
        };

        $scope.getPicture = function () {
            var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE
            };

            $cordovaCamera.getPicture(options).then(function (imageURL) {
                $scope.myProfile.wp_user_avatar = imageURL;

                var server = 'http://underval.com/underval.com/engineermaster/api/testingupload.php';
                var uploadOptions = new FileUploadOptions();
                uploadOptions.fileName = $scope.myProfile.ID + ".jpg";
                uploadOptions.fileKey = 'file';
                uploadOptions.mimeType = 'image/jpeg';

                $scope.show("Uploading avatar.. ", 10000);

                $cordovaFileTransfer.upload(server, imageURL, uploadOptions, true)
                    .then(function (result) {
                        // Success!
                        $scope.hide();
                    }, function (err) {
                        // Error
                        $scope.showAlert(err);
                    }, function (progress) {
                        // constant progress updates
                        $timeout(function () {
                            $scope.show("Uploading avatar.." + (progress.loaded / progress.total) * 100, 10000);
                        })
                    });

            }, function (err) {
                // error
                $scope.showAlert(err);
            });
        };
    })


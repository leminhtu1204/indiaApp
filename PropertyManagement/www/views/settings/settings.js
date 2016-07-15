/**
 * Created by TrungTrinh on 7/14/16.
 */
angular.module('Belowval.Settings', ['Belowval.NotificationModule'])
    .run(function () {
        console.log("Setting module run")
    })

    .controller('SettingsController', function ($scope, $state, NotificationService) {
        console.log("Setting controller load");

        var userID = JSON.parse(window.localStorage.getItem('profile')).data.user_data.ID;
        $scope.settings = {userID: userID};


        // Reload settings from local storage
        if (window.localStorage.getItem("settings") != undefined) {
            if (userID === JSON.parse(window.localStorage.getItem("settings")).userID) {
                console.log("Load local setting");
                $scope.settings = JSON.parse(window.localStorage.getItem("settings"));
                console.log($scope.settings);
            }
        } else {
            console.log("Load new setting");
            // default notitication is ON
            $scope.settings.notifications = {
                checked: true
            }
        }

        $scope.goBack = function () {
            console.log("Go Back")
            $state.go('belowval.home');
        }

        $scope.saveSettings = function () {
            console.log("Save settings")
            window.localStorage.setItem("settings", JSON.stringify($scope.settings));

            if ($scope.settings.notifications.checked) {
                // scheduler local notifications
                if (ionic.Platform.isWebView()) {
                    console.log("Create notification")
                    if (!NotificationService.isSchedulerSingleNotification(userID)) {
                        NotificationService.scheduleSingleNotification(userID);
                    }
                }
            } else {
                if (ionic.Platform.isWebView()) {
                    console.log("Cancel notification")
                    NotificationService.cancelSingleNotification(userID);
                }
            }

            $scope.goBack();
        }
    })
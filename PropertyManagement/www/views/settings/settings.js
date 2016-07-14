/**
 * Created by TrungTrinh on 7/14/16.
 */
angular.module('Belowval.Settings', ['Belowval.NotificationModule'])
    .run(function () {
        console.log("Setting module run")
    })

    .controller('SettingsController', function ($scope, $state, NotificationService) {
        console.log("Setting controller load");

        $scope.settings = {};

        // Reload settings from local storage
        if (window.localStorage.getItem("settings") != undefined) {
            console.log("Load local setting");
            $scope.settings = JSON.parse(window.localStorage.getItem("settings"));
            console.log($scope.settings);
        } else {
            console.log("Load new setting");
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
            }

            $scope.goBack();
        }
    })
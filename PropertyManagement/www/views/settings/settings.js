/**
 * Created by TrungTrinh on 7/14/16.
 */
angular.module('Belowval.Settings', [])
    .run(function () {
        console.log("Setting module run")
    })

    .controller('SettingsController', function ($scope, $state) {
        console.log("Setting controller load");

        $scope.notifications = {
            checked: false
        }

        $scope.goBack = function () {
            console.log("Go Back")
            $state.go('belowval.home');
        }
        
        $scope.saveSettings = function () {
            console.log("Save settings")
            var settings = {
                notifications: {checked: $scope.notifications.checked}
            }
            window.localStorage.setItem("settings", JSON.stringify(settings));
            
            if ($scope.notifications.checked) {
                // scheduler local notifications
            }
        }
    })
/**
 * Created by TrungTrinh on 7/14/16.
 */
angular.module('Belowval.Settings', [])

    .run(function () {
        console.log("Setting module run")
    })

    .controller('SettingsController', function ($scope, $state) {
        console.log("Setting controller load");

        $scope.goBack = function () {
            console.log("Go Back")
            $state.go('belowval.home');
        }
    })
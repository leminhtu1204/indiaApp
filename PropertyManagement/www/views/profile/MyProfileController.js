/**
 * Created by TrungTrinh on 7/2/16.
 */

angular.module('Belowval.Profile', [])

    .run(function () {
        console.log('Profile module is loading ..');
    })

    .controller('MyProfileController', function ($scope, $state) {
        console.log('My Profile controller is loading ..');
        $scope.goBack = function(){
            console.log("Go Back")
            $state.go('belowval.home');
        }
    })

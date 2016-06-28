angular.module('Belowval.Bootstrap', [])
    .run(function(){
        console.log("Bootstrap module is loading..")
    })

    .controller('BootstrapController', function ($scope, $state) {
        console.log("Loading bootstrap controller");

        $scope.logout = function () {
                    window.localStorage.removeItem('profile')
                    console.log("Logout - Remove profile")
                    $state.go('login');
                }
    });

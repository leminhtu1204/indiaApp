angular.module('Belowval.Search', []).controller('SearchController', function ($stateParams, UserLogin, $scope, $state, $http) {

    ws_end_point = UserLogin.getWsEndPoint();
    $scope.groupData = [];
    $scope.init = function () {
        $http.post(ws_end_point, { "method": "8"}).success(function (data) {
            $scope.allsub = data.all_sub;
            $scope.hdb = data.hbd_sub;
            $scope.commercial_sub = data.commercial_sub;
            $scope.district = data.district;
            $scope.private_sub = data.private_sub;
        }).error(function () {

        });
    };

    $scope.backToPrevious = function () {
        $state.go('belowval.home');
    };

    $scope.searchFilter = { "searchtype": "sale", "propertyType": "all", "sub1": "ang-mo-kio" };

    $scope.typeSearch = [{ "searchtype": "sale", "name": "Urgent Sale", "checked":true }, { "searchtype": "rent", "name": "Urgent Rent" , "checked": false}];

    $scope.propertyTypeList = [{ "propertyType": "all", "name": "All", "checked": true }, { "propertyType": "hdb", "name": "HDB", "checked": false }, { "propertyType": "private-residential", "name": "Private", "checked": false }, { "propertyType": "commercial", "name": "Commercial", "checked": false }];
    
    $scope.redirect = function (id, page) {
        $state.go('belowval.' + page, { "id": id });
    };

    if (window.localStorage.getItem('profile') != undefined) {
        $scope.init();
    } else {
        $state.go('login');
    }
});

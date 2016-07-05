angular.module('Belowval.Search', []).controller('SearchController', function ($stateParams, UserLogin, $scope, $state, $http) {

    ws_end_point = UserLogin.getWsEndPoint();
    $scope.groupData = [];
    $scope.defaultItem = "All Districts";
    $scope.defaultSub1Item = "All Sub-Types";

    $scope.doSearch = function () {
        $scope.redirect($scope.searchFilter, "searhResult");
    };

    $scope.init = function () {
        $http.post(ws_end_point, { "method": "8" }).success(function (data) {
            $scope.estate = [];
            data.all_sub.childs.forEach(function(item) {
                $scope.estate.push(item);
            });
            data.district.childs.forEach(function(item) {
                data.all_sub.childs.push(item);
            });
            $scope.allsub = data.all_sub.childs;
            $scope.hdb = data.hbd_sub.childs;
            $scope.commercial_sub = data.commercial_sub.childs;
            $scope.district = data.district.childs;
            $scope.private_sub = data.private_sub.childs;
            $scope.setSubList(0);
        }).error(function () {

        });
    };

    $scope.backToPrevious = function () {
        $state.go('belowval.home');
    };

    $scope.setSubList = function (index) {
        $scope.showSub1 = true;
        switch (index) {
        case 0:
//all
            $scope.sub2List = $scope.allsub;
            $scope.showSub1 = false;
            $scope.defaultItem = "All Estates / Districts";
            break;
        case 1:
//hdb
            $scope.sub1List = $scope.hdb;
            $scope.sub2List = $scope.estate;
            $scope.defaultItem = "All Estates";
            break;
        case 2:
// private
            $scope.sub2List = $scope.district;
            $scope.sub1List = $scope.private_sub;
            $scope.defaultItem = "All Districts";
            break;
        case 3:
            $scope.sub2List = $scope.district;
            $scope.sub1List = $scope.commercial_sub;
            $scope.defaultItem = "All Districts";
            break;
        default:
        }
    };

    $scope.searchFilter = {
        "searchtype": "sale"
        , "propertyType": "all"
        , "sub2": "All Estates / Districts"
        , "sub1": "All Sub-Types"
        , "bed": "all"
        , "maxprice": "0"
        , "minsize": "Min. Built-In Size"
    };

    $scope.typeSearch = [{ "searchtype": "sale", "name": "Urgent Sale", "checked": true }
        , { "searchtype": "rent", "name": "Urgent Rent", "checked": false }];

    $scope.propertyTypeList = [{ "propertyType": "all", "name": "All", "checked": true }
        , { "propertyType": "hdb", "name": "HDB", "checked": false }
        , { "propertyType": "private-residential", "name": "Private", "checked": false }
        , { "propertyType": "commercial", "name": "Commercial", "checked": false }];
    
    $scope.bedType =
        [{ "bed": "all", "name": "Any" }
        , { "bed": "1 Bedroom/Studio", "name": "1+" }
        , { "bed": "2 Bedroom", "name": "2+" }
        , { "bed": "3 Bedroom", "name": "3+" }
        , { "bed": "4 Bedroom", "name": "4+" }
        , { "bed": "5 Bedroom", "name": "5+" }];

    $scope.minSizeList =
        [{ "minsize": "Min. Built-In Size", "name": "Min. Built-In Size" }
            , { "minsize": "500", "name": "500 sqft (46 sqm)" }
            , { "minsize": "750", "name": "750 sqft (70 sqm)" }
            , { "minsize": "1000", "name": "1,000 sqft (93 sqm)" }
            , { "minsize": "1200", "name": "1,200 sqft (112 sqm)" }
            , { "minsize": "1500", "name": "1,500 sqft (139 sqm)" }
            , { "minsize": "2000", "name": "2,000 sqft (186 sqm)" }
            , { "minsize": "2500", "name": "2,500 sqft (232 sqm)" }
            , { "minsize": "3000", "name": "3,000 sqft (279 sqm)" }
            , { "minsize": "4000", "name": "4,000 sqft (372 sqm)" }
            , { "minsize": "5000", "name": "5,000 sqft (465 sqm)" }
            , { "minsize": "7500", "name": "7,500 sqft (697 sqm)" }
            , { "minsize": "10000", "name": "10,000 sqft (929 sqm)" }];
    
    $scope.maxPriceList =
       [{ "maxprice": "0", "name": "Max. Sale Price" }
           , { "maxprice": "400000", "name": "S$ 400,000" }
           , { "maxprice": "500000", "name": "S$ 500,000" }
           , { "maxprice": "600000", "name": "S$ 600,000" }
           , { "maxprice": "800000", "name": "S$ 800,000" }
           , { "maxprice": "1000000", "name": "S$ 1,000,000" }
           , { "maxprice": "1250000", "name": "S$ 1,250,000" }
           , { "maxprice": "1500000", "name": "S$ 1,500,000" }
           , { "maxprice": "2000000", "name": "S$ 2,000,000" }
           , { "maxprice": "2500000", "name": "S$ 2,500,000" }
           , { "maxprice": "3000000", "name": "S$ 3,000,000" }
           , { "maxprice": "4000000", "name": "S$ 4,000,000" }
           , { "maxprice": "5000000", "name": "S$ 5,000,000" }
           , { "maxprice": "6000000", "name": "S$ 6,000,000" }
           , { "maxprice": "8000000", "name": "S$ 8,000,000" }
           , { "maxprice": "10000000", "name": "S$ 10,000,000" }
           , { "maxprice": "15000000", "name": "S$ 15,000,000" }
           , { "maxprice": "20000000", "name": "S$ 20,000,000" }
           , { "maxprice": "30000000", "name": "S$ 30,000,000" }
           , { "maxprice": "50000000", "name": "S$ 50,000,000" }];
    
    $scope.bedType =
        [{ "bed": "all", "name": "Any" }
        , { "bed": "1 Bedroom/Studio", "name": "1+" }
        , { "bed": "2 Bedroom", "name": "2+" }
        , { "bed": "3 Bedroom", "name": "3+" }
        , { "bed": "4 Bedroom", "name": "4+" }
        , { "bed": "5 Bedroom", "name": "5+" }];
    
    $scope.redirect = function (object, page) {
        $state.go('belowval.' + page, { obj:object});
    };

    if (window.localStorage.getItem('profile') != undefined) {
        $scope.init();
    } else {
        $state.go('login');
    }
});

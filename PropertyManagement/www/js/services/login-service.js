angular.module('Belowval.LoginService', [])

    .factory('UserLogin', function ($http) {
        console.log("Load Belowval.LoginService - UserLogin factory");

        //            var ws_end_point = "api_test.php";
        var ws_end_point = "http://underval.com/underval.com/engineermaster/api/api.php";

        console.log("Web service end point: " + ws_end_point);

        return {
            login: function (user) {

                /*                    var user_sample = {
                 "method": "1",
                 "user_login": "ttt@gmail.com",
                 "password": "123456"
                 };*/

                console.log("login - request - " + user.user_login);

                return $http.post(ws_end_point, user).then(function (response) {
                    return response;
                });
            },

            register: function (user) {
                console.log("register - request - " + user.user_login);

                /*
                 var user_sample = {
                 "method": "2",
                 "user_login": "t3@gmail.com",
                 "password": "123456",
                 "email": "t3@gmail.com"};
                 */

                return $http.post(ws_end_point, user).then(function (response) {
                    return response;
                });
            },

            changePassword: function (data) {
                /*
                 var data_sample = {
                 "method": "4a",
                 "id": "1234",
                 "oldpassword": "123456",
                 "newpassword": "65312"};
                 */

                console.log("change password - request - " + data.id)
                return $http.post(ws_end_point, data).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                });
            },

            updateMyProfile: function (data) {
                // data = {method:6, user_data: {..}}
                console.log("update profile - request - " + data.user_data.ID);

                return $http.post(ws_end_point, data).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                })
            },

            getWsEndPoint: function () {
                return ws_end_point;
            },

            getFavourites: function (userId) {
                return $http.post(ws_end_point, { "method": "10", "user_id": userId }).then(function (response) {
                    window.localStorage.setItem("listFavourites", JSON.stringify(response.data));
                });
            }
        }
    }
    )




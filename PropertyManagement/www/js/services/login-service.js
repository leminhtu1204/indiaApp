angular.module('Belowval.LoginService', [])

    .factory('UserLogin', function ($http) {
            console.log("Load Belowval.LoginService - UserLogin factory");

//            var ws_end_point = "api_test.php";
            var ws_end_point = "http://underval.com/underval.com/engineermaster/api/api_test.php";

            console.log("Web service end point: " + ws_end_point);

            return {
                login: function (user) {

/*                    var user_sample = {
                        "method": "1",
                        "user_login": "ttt@gmail.com",
                        "password": "123456"
                    };*/

                    console.log("login");

                    return $http.post(ws_end_point, user).then(function (response) {
                        console.log(response);
                        return response;
                    });
                },

                register: function (user) {
                    console.log("register");

/*
                    var user_sample = {
                        "method": "2",
                        "user_login": "t3@gmail.com",
                        "password": "123456",
                        "email": "t3@gmail.com"};
*/

                    return $http.post(ws_end_point, user).then(function (response) {
                        console.log(response);
                        return response;
                    });
                },


            }
        }
    )




/**
 * Created by TrungTrinh on 7/15/16.
 */

angular.module("Belowval.NotificationModule", [])

    .run(function () {
        console.log("Load notification module");
    })

    .service('NotificationService', function ($cordovaLocalNotification) {
        console.log("Notification service load")

        this.scheduleSingleNotification = function (id, title, msg) {
            console.log("Scheduler notification - " + id);

            $cordovaLocalNotification.schedule({
                id: id,
                title: 'Belowval!',
                text: "You have new notifications",
                every: 3,
            }).then(function (result) {
                // ...
                console.log("Scheduler notification: " + result);
            }, function (result) {
                // ...
                console.log("Scheduler notfication: " + result);
            });
        };

        this.isSchedulerSingleNotification = function (id) {
            console.log("IsScheduler func of " + id);
            $cordovaLocalNotification.isPresent(id, function (present) {
                console.log("Is notification scheduler: " +  present)
                return present;
            })
        };

        this.cancelSingleNotification = function (id) {
            console.log("Cancel notification: " + id);
            $cordovaLocalNotification.cancel(id, function() {
            });
        }
    })


    .factory('NotificationFactory', function ($http) {
        console.log("Notification Factory load");
        var ws_end_point = "http://underval.com/underval.com/engineermaster/api/api.php";
        console.log("Web service end point: " + ws_end_point);

        return {
            checkNotifications: function (data) {
                // data = {"method": 12, "user_id": 123}
                console.log("check notification - request - " + data.user_id);

                return $http.post(ws_end_point, data).then(function (response) {
                    // ..
                    return response;
                }, function (response) {
                    // ..
                    return response;
                })
            },

            getAllNotifications: function (data) {
                // data = {"method": 13, "user_id": 123}
                console.log("getAllNotification - request - ", data.user_id);

                return $http.post(ws_end_point, data).then(function (response) {
                    // ..
                    return response;
                }, function (response) {
                    // ..
                    return response;
                })
            }
        }
    })
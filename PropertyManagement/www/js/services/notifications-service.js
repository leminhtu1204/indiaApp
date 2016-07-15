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
            console.log("Scheduler notification");

            $cordovaLocalNotification.schedule({
                id: id,
                title: title,
                text: msg,
                every: 'minute',
            }).then(function () {
                // ...
            }, function () {
                // ...
            });
        };

        this.isSchedulerSingleNotification = function (id) {
            console.log("IsScheduler func")
            $cordovaLocalNotification.isPresent(id, function (present) {
                if(present) {

                } else {

                }
            })
        }
    })

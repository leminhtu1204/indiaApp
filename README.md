# indiaApp

# Add the necessary components
1. cordova plugin add cordova-plugin-camera <br/>
http://ngcordova.com/docs/plugins/camera/
<br/>
<br/>
2. ionic add ionic-platform-web-client <br/>
3. ionic plugin add phonegap-plugin-push --variable SENDER_ID="245790069630" <br/>
http://docs.ionic.io/v1.0/docs/push-from-scratch

# Disable limitted pushes
ionic config set dev_push false 

# Send a push notification
curl -X POST -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmZTIwYWMxZi1kMGZkLTRkMzMtODZjYS05ZGEzOWI4MTI0NDgifQ.Gp6GzfNartXzeAym0XW_8q5ruUykHMKqWMY8xHFZyrg" -H "Content-Type: application/json" -d '{ "tokens": ["DEV_DEVICE_TOKEN"], "profile": "test_profile", "notification": { "message": "Hello World!" } }' "https://api.ionic.io/push/notifications"

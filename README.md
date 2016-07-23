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
curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNmYwYjA1Ny04NmVhLTQyMjgtOTk5MS1hNGViZWQ2ZjlhOWIifQ.UrM0BQ47D_lWJeYLXKuINUuhpqUsgv2dnaG3dRzH46s" -H "Content-Type: application/json" -d '{ "tokens": ["DEV_DEVICE_TOKEN"], "profile": "belowval_profile_dev", "notification": { "message": "Hello World!" } }' "https://api.ionic.io/push/notifications"

# Cordova plugins
1. cordova plugin list

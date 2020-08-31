# NeoWs-API
 Using data from the NASA JPL Asteroid team the NeoWs api lets us search for near earth objects.

# Summary:
This app takes in POST commands via curl to use as the inputs for the NeoWs API from NASA. When given two dates and a distance in miles, the user will receive back the asteroids that are within that distance from Earth within those dates. (note: if the dates are further than 7 days apart, it will change it to be 7, the max the api can take)

# Installation:

Once you are in the directory run:

npm install

You will also need to create a .env file to store your API key. Inside the .env file create a variable named NEOWS_API_KEY and put your NASA API key in here.

Example (do not include the brackets in your .env file):

NEOWS_API_KEY={YOUR API KEY HERE}

# How to use:
run:
npm start server

then from a terminal use curl (must be content-type:application/json) from a terminal, or similar tool, to see if there are any asteroids in your parameters. 

#### Example of proper Curl command:

curl -d '{   "dateStart": "2015-04-28",   "dateEnd": "2015-04-30",   "within": {     "value": 15000000,     "units": "miles"   } }' -H 'content-type: application/json' localhost:3000/api

returns different results to user and server:
##### What the user will see: 
{"asteroids":["(2015 GB14)","(2015 HM1)","(2015 HD10)","(2017 JB)","(2015 HC1)","(2015 JJ)","(2019 HS2)","(2015 JB1)","(2015 DP155)","(2015 HA177)","(2011 EX4)"]}

##### What the server will see:
There are 11 asteroids under 15000000
They are: 
{
  asteroids: [
    '(2015 GB14)',  '(2015 HM1)',
    '(2015 HD10)',  '(2017 JB)',
    '(2015 HC1)',   '(2015 JJ)',
    '(2019 HS2)',   '(2015 JB1)',
    '(2015 DP155)', '(2015 HA177)',
    '(2011 EX4)'
  ]
}

##### By changing $value to 2000000 our results will change:

##### What the user will see: 

{"asteroids":["(2015 HD10)","(2015 HA177)"]} 

##### What the server will see:

There are 2 asteroids under 2000000
They are: 
{ asteroids: [ '(2015 HD10)', '(2015 HA177)' ] }



## For dev testing: 
If you'd like to test changes to server consider using nodemon

To use run:

npm start devStart

devStart runs "nodemon server.js" to allow for instant restarting of the server to allow for better testing of changes.

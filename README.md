# NeoWs-API
 Using data from the NASA JPL Asteroid team the NeoWs api lets us search for near earth objects.

# Summary:
This app takes in POST commands via curl to use as the inputs for the NeoWs API from NASA. When given two dates and a distance in miles, the user will receive back the asteroids that are within that distance from Earth within those dates. (note: if the dates are further than 7 days apart, it will change it to be 7, the max the api can take)

# Installation:

Once you are in the directory run:

npm install

You will also need to create a .env file to store your API key. Inside the .env file create a variable named NEOWS_API_KEY set it to your own NASA API key.

#### Example (do not include the brackets in your .env file):

NEOWS_API_KEY={YOUR API KEY HERE}

# How to use:
Run:

npm start server

Then, from a terminal use a curl command, or similar tool, to see if there are any asteroids within your parameters (must be content-type:application/json). 

### Variables needed to run:

1. dateStart: This is be the first day in the range that you want to look for near earth objects.
2. dateEnd: This is end date in the range that you want to look for near earth objects. (Note: if dateEnd is more than 7 days further than dateStart, it will be changed to 7 days, as that is the limit of the NeoWs API).
3. within: There are two variables needed inside of within
   - value: Distance of the near earth objects from earth
   - units: Unit of length. Currently only "miles" is accepted.

#### Example of proper Curl command:

curl -d '{   "dateStart": "2015-04-28",   "dateEnd": "2015-04-30",   "within": {     "value": 15000000,     "units": "miles"   } }' -H 'content-type: application/json' localhost:3000/api

This returns different results to user and server:
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

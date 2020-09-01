if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const axios = require('axios');
const getByDates = require('./src/getbydates');

//We need to accept JSON, so use json middleware. 
app.use(express.json());
app.use(express.static('public'));

app.post('/api', async (req, res) => {
    let test = req.body;
    if(req.is("application/json")){
        
        //Input Json variable to be used in NeoWs api call
        let jsonInput;
        //See if JSON is already parsed, if not parse it
        try{
            jsonInput = JSON.parse(req.body);
        }catch(e){
            console.log('Input is in proper JSON format');
        }
        if(jsonInput === undefined){
            jsonInput = req.body;
        }

        //create variables needed to find asteroids by the date
        let firstDate = new Date(jsonInput.dateStart);
        let endDate = new Date(jsonInput.dateEnd);
        let distance = jsonInput.within.value;

        //Use await otherwise res.send(asteroids) will run before asteroids is filled
        const finalAsteroidArray = await getByDates.findByDate(firstDate, endDate, distance);

        //Send response
        res.send(finalAsteroidArray);
        
    }
    else{
        //Log to the server and send the response to the user
        console.log('content-type: application/json expected in curl call');
        res.send('content-type: application/json expected in curl call\n')   
    }
});


//Start server on localhost:3000
app.listen(3000, () => {
    console.log('Server Started');
});
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const axios = require('axios');

/**
 * Summary. Checks if the range of submitted dates are 7 or less (the NeoWs api can handle 7 days max)
 * 
 * @param {Date} firstDate 
 * @param {Date} endDate 
 * 
 * @returns Array of dates we are looking up with the NeoWs api. If the difference is greater than 7, make it 7.
 */
const getRangeOfDates = (firstDate, endDate) => {

    //temp date to avoid modifying the original date
    const tempDate = new Date(firstDate);

    let dates = [];

    //determine the difference in days between the two dates
    let differenceInDays = (endDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24);
    
    //Create array of dates to be used
    if(differenceInDays <= 7){

        while (tempDate <= endDate) {

            dates = [...dates, new Date(tempDate).toISOString().split('T')[0]];
            tempDate.setDate(tempDate.getDate() + 1);
        }
        return dates;
    }
    else{
        console.log("Date range is greater than 7. Changing to 7 instead")
        for(let i = 0; i < 7; i++){
            dates = [...dates, new Date(tempDate).toISOString().split('T')[0]];
            tempDate.setDate(tempDate.getDate() + 1);
        }
        return dates;
    }
}


/**
 * Summary. Function designed to connect to api. 
 * If any asteroids are within the distance it will return them as a JSON array
 * @param {Date} firstDate 
 * @param {Date} endDate 
 * @param {miles} distance 
 * @returns{array}
 */
const findByDate = async (firstDate, endDate, distance) =>{

    //Create variables we will need 
    const apiKey = process.env.NEOWS_API_KEY;
    if('NEOWS_API_KEY' in process.env){
        const apiKey = process.env.NEOWS_API_KEY;
    }
    else{
        const apiKey = 'DEMO_KEY';
    }
    let apiUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=';
    let apiData = new Array();
    //create asteroids array so when we can call it even if it's empty
    let asteroids = {
        "asteroids": []
    };
    try{
        //build the array of dates and use it to finish building the apiURL
        let datesOfLookup = getRangeOfDates(firstDate, endDate);

        apiUrl = apiUrl + datesOfLookup[0] + '&end_date=' + datesOfLookup[datesOfLookup.length-1] + '&detailed=false&api_key=' + apiKey;

        //Use GET /rest/v1/feed from NeoWs
        const response = await axios.get(apiUrl).then(function(response){
            apiData.push(response.data.near_earth_objects);
        });
        apiData = apiData[0];

        //loop through the data and store any asteroid less than our distance in asteroids array
        for(let i = 0; i < datesOfLookup.length; i++){
            for(let j = 0; j < apiData[datesOfLookup[i]].length; j++){
                if(apiData[datesOfLookup[i]][j].close_approach_data[0].miss_distance.miles < distance){
                    asteroids.asteroids.push(apiData[datesOfLookup[i]][j].name);
                }

            }
        }
        console.log('There are ' + asteroids.asteroids.length + ' asteroids under ' + distance);
    }catch(e){
        console.error(e);
    }

    console.log('They are: ');
    console.log(asteroids);
    return asteroids;
}
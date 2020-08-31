if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const axios = require('axios');


app.post('/api', (req, res) => {
    
})


//Start server on localhost:3000
app.listen(3000, () => {
    console.log('Server Started');
});
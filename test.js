if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
if('NEOWS_API_KEY' in process.env){
    console.log('we got it');
}
else{
    console.log('nah');
}
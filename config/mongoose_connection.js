const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/studentdb');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'ERROR IN CONNECTION'));
db.once('open',function(){
    console.log("DB connection was successful");
})
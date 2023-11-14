const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema(
    {
        description:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        duedate:{
            type:String,
        }
    }
);
const tasklist = mongoose.model('tasklist',studentSchema);
module.exports = tasklist;
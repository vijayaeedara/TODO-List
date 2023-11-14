const path = require('path');
const { name } = require('ejs');
const express = require('express');
const PORT = 8082;
const mongoose = require('./config/mongoose_connection');
const tasklist= require('./models/todoschema');
const app = express();
app.use(express.urlencoded({ extended: true }))
app.set('view engine','ejs');
app.use(express.static('effects'));
app.set('views',path.join(__dirname,'views'));
app.get('/',function(req,res){
    const temp=tasklist.find({}).exec();
    temp.then(data =>{
        res.render('todo',{'data':data});
    })
    .catch(err=>{
        console.log("Error in fetching");
      });
});
app.get('/delete-list',function(req,res){
    var id=req.query;
    var len=Object.keys(id).length;
    var deletePromises=[];
    for (let i=0;i<len;i++)
    {
        deletePromises.push(tasklist.findByIdAndDelete(Object.keys(id)[i]));
    }
    Promise.all(deletePromises).then(()=>{
        return res.redirect('back');
    }).catch((err)=>{
        console.log("Error in deleting...",err);
        return res.redirect('back');
    });
});
app.post('/add-data',function(req,res){
    const studata = new Promise((resolve,reject) =>{
        tasklist.create({
            description:req.body.description,
            category:req.body.category,
            duedate:req.body.duedate
        }).then(newdata =>{
            console.log("*******   newdata  ******");
            resolve(newdata);
        }).catch(err => {
            console.log("error in creating data");
            reject(err);
        });
    });
        studata.then(data =>{
            res.redirect('back');
        })
        .catch((err) =>{
            console.log("Error in creation");
        });
    
});
app.listen(PORT,function(err){
    if(err){
        console.log("Error");
        return;
    }
    console.log("Server is up and running on ",PORT);
});

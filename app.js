//server side

var express = require('express');
var app = express();
var cors = require('cors');
var mysql = require("mysql");
var bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var id = 1;

//Defined the database and created it.
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"saliha",
    database:"quiz"
});

//This is where it connects to mysql.If it fails to connect, it generates an error.
con.connect(function(er){
    if (er) 
    console.log(err);
    console.log("connected");
});



//bring question
app.get('/question',function(req,res){
    query = "SELECT * FROM question  WHERE questionID="+id;
    con.query(query,function(err,result){
        console.log(result);
        id=id+1;
        res.json(result);
});

});

//Sorted by user score
app.get("/sortuser",function(req,res){
    query = "SELECT username,score FROM score ORDER BY score DESC";
    con.query(query,function(err,result){
        console.log(result);
        res.json(result);
    });
});

//add user score
app.post("/adduserscore",function(req,res){
    query = "INSERT INTO score(username,score) VALUES(?,?)";
    values=[
        req.body.usernameserver,
        req.body.userscoreserver,
    ];
    con.query(query,values,function(err,result){
        console.log(result);
    res.end("ok");
});
});



app.post('/question',function(req,res){
    var question = req.body.question;
    var answer1 = req.body.answ1;
    var answer2 = req.body.answ2;
    var answer3 = req.body.answ3;
    var answer4 = req.body.answ4;
    var rightanswer = req.body.answers;

    console.log(question+" "+answer1+" "+answer2+" "+answer3+" "+answer4+" "+rightanswer);
    query = "INSERT INTO question(questiontext,answer1,answer2,answer3,answer4,rightanswer) VALUES(?,?,?,?,?,?)";
    values = [soru,cevap1,cevap2,cevap3,cevap4,ranswer];
    con.query(query,values,function(err,result){
        console.log(result);
    res.end("okey");
});
});

//user controlled.
app.post('/user',function(req,res){
    var name =req.body.usernameserver;
    var pass =req.body.passwordserver;
    var parameters = [name,pass];
   
//checked the request if the data exists in the database and returned Success.
    query = "SELECT * FROM users WHERE username=? AND userpassword=?";
    con.query(query,parameters,function(err,result){
        if (result.length != 0)
        {
            console.log("User exists");
            res.end("Success");
        }
        else
        {
            console.log("No User");
            res.end("no users");
        }
    });
});

//server from which port we are listening
var server = app.listen(3000,function(){
    console.log('Node server is running');
});

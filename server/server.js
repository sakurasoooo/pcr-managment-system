// optional: allow environment to specify port
const port = process.env.PORT || 2333

// wire up the module
const express = require('express')
var mysql = require('./dbcon.js');
var path = require('path');
var serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const cors = require('cors');
// create server instance
const app = express();
app.use(bodyParser.json());
// bind the request to an absolute path or relative to the CWD
app.use(express.static('dist'))
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.set('mysql', mysql);

app.get('/events', (req, res) => {
    mysql.pool.query("SELECT * from Users", function(error, results, fields){
        if(error){
            console,log(JSON.stringify(error));
        }
        res.send(results)
    });
});

app.get('/events/:id', (req, res) => {
    const id = Number(req.params.id);
    const event = events.find(event => event.id === id);
    res.send(event);
  });

app.get('/login/:username', (req, res) => {

const username = req.params.username;
console.log("login: "+username);
mysql.pool.query(`SELECT * from Users WHERE userName = "${username}"`, function(error, results, fields){
    if(error){
        console,log(JSON.stringify(error));
    }
    console.log("length: "+results.length);
    console.log("result: "+JSON.stringify(results));
    res.send(results)
});
});

app.get('/clanlist', (req, res) => {
    mysql.pool.query("SELECT * from Clans", function(error, results, fields){
        if(error){
            console,log(JSON.stringify(error));
        }
        console.log("result: "+JSON.stringify(results));
        res.send(results)
    });
});
app.post('/clan/newclan', (req, res) => {
    console.log(req.body);
    var clanname = req.body.clanname;
    var sql = "INSERT INTO `Clans` (`clanName`) VALUES (?)"
    var inserts = [clanname];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            //TODO: add clan master a the ame time!

            res.write(JSON.stringify(error));
            res.end();
            
            console.log(error)
        }
        else res.status(200).json({status:"ok"})
    });
});

app.post('/clan/removeclan', (req, res) => {
    console.log(req.body);
    var clanId = req.body.clanId;
    var sql = "DELETE FROM Clans WHERE clanId = ?"
    var inserts = [clanId];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){

            res.write(JSON.stringify(error));
            res.status(400);
            res.end();

            console.log(error)
        }
        else res.status(200).json({status:"ok"})
    });
});

app.post('/clan/isinclan', (req, res) => {
    console.log(req.body);
    var userName = req.body.userName
    var clanId = req.body.clanId;
    var sql = "SELECT * FROM Users a INNER JOIN Clan_members b ON a.userId = b.userId WHERE a.userName = ? AND b.clanId = ?";
    var inserts = [userName,clanId];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){

            res.write(JSON.stringify(error));
            res.status(400);
            res.end();

            console.log(error)
        }
        if(results.length!=0){
            res.send({result:true});
        }
        else res.send({result:false});
    });
});

app.post('/clan/clanmembers', (req, res) => {
    console.log(req.body);
    //var userName = req.body.userName
    var clanId = req.body.clanId;
    var sql = "SELECT userName FROM Users a INNER JOIN Clan_members b ON a.userId = b.userId WHERE b.clanId = ?";
    var inserts = [clanId];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){

            res.write(JSON.stringify(error));
            res.status(400);
            res.end();

            console.log(error)
        }
        else{
            console.log(JSON.stringify(results))
            res.send(results);
        }
    });
});

app.post('/clan/joinclan', (req, res) => {
    console.log(req.body);
    var userName = req.body.userName
    var clanId = req.body.clanId;
    var authority = 0;
    var sql = "INSERT INTO Clan_members  (`userId`,`clanId`, `authority`) SELECT userId ,?,0 FROM Users WHERE userName = ?";
    var inserts = [clanId,userName];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){

            res.write(JSON.stringify(error));
            res.status(400);
            res.end();

            console.log(error)
        }
        else res.status(200).json({status:"ok"})
    });
});


app.post('/signup', (req, res) => {
    console.log(req.body);
    var nickname = req.body.nickname;
    var username = req.body.username;
    var password = req.body.password;
    var sql = "INSERT INTO `Users` (`nickName`,`userName`,`password`) VALUES (?,?,?)"
    var inserts = [nickname,username,password];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            //TODO: send error messages to frontend as the following doesn't work
            /* 
            res.write(JSON.stringify(error));
            res.end();
            */
            console.log(error)
        }
        else res.status(200).json({status:"ok"})
    });
});

app.post('/update/user', (req, res) => {
    console.log(req.body);
    var nickname = req.body.nickname;
    var username = req.body.username;
    var password = req.body.password;
    var sql = "UPDATE Users SET nickName = ? , password = ? WHERE userName = ?"
    var inserts = [nickname,password,username];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            //TODO: send error messages to frontend as the following doesn't work

            res.write(JSON.stringify(error));
            res.end();

            console.log(error)
        }
        else res.status(200).json({status:"ok"})
    });
});
// start the server
app.listen(port, () => console.log(`Listening on port ${port}`))

let events = [
    {
        name:'roger',
    },
    {
        name:'nax'
    }
]
var express=require('express');
var app = express();
var sqlite = require('sqlite3');
app.set('view engine', 'ejs');
var db = new sqlite.Database('mydb.sqlite');

app.get('/', function(req, res){
    db.all('SELECT * FROM content_data', function (error,data){
        res.render('lab2.ejs', {
            data:data
        });
    });
});

app.post('/add', function(req, res){
    db.run("INSERT INTO content_data (text) VALUES (?)", req.query.text, function (){
        res.send('ok');
    });
});


app.get('/getLastKey', function(req, res) {
    var execquery = 'SELECT id FROM content_data ORDER BY id DESC LIMIT 0,1';
    db.get(execquery, [] ,
        function(err, row) {
            res.end(JSON.stringify({ id: row.id }));
        }
    );
});

app.post('/delete', function(req, res){
    db.run("DELETE FROM content_data WHERE id ="+req.query.id, function (){
        res.send('ok');
    })
});

app.listen(3000, function() {
    console.log('Starting app');
});

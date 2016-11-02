var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;

var todoItems = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('Todo API Root');
});

app.get('/todos', function(req, res){
    res.json(todoItems);
});
app.get('/todos/nextid', function(req, res) {
    res.json(todoNextId);
});
app.get('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var matchedItem;

    console.log('Requesting id: '+todoId+'.');

    todoItems.forEach(function(todo){
        if (todo.id === todoId) {
            matchedItem = todo;
        }
    });

    if (matchedItem) {
        res.json(matchedItem);
    }
    else {
        res.status(404).send();
    }
});

// POST /todos

app.post('/todos', function (req, res) {
    var body = req.body;

    body.id = todoNextId++;
    todoItems.push (body);
   
    res.json(body);
});

app.listen(PORT, function() {
    console.log('Express listening on '+PORT+'.');
});
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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

// refactor with underscore
app.get('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var matchedItem = _.findWhere(todoItems, {id: todoId});

    if (matchedItem) {
        res.json(matchedItem);
    }
    else {
        res.status(404).send();
    }
});

app.post('/todos', function (req, res) {
    var body = _.pick(req.body, 'description', 'completed');
    body.description = body.description.trim();

    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.length === 0) {
        return res.status(400).send();
    }

    body = _.pick(body, 'description', 'completed');

    body.id = todoNextId++;
    todoItems.push (body);
   
    res.json(body);
});

app.delete('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedItem = _.findWhere(todoItems, {id: todoId});

    if (matchedItem) {
        todoItems = _.without(todoItems, matchedItem);
        res.json(matchedItem);

        // res.status(200).send('Item deleted. ('+JSON.stringify(matchedItem)+')');
    } else {
        res.status(404).json({"error": "No valid item ID"});
    }
});

app.listen(PORT, function() {
    console.log('Express listening on '+PORT+'.');
});
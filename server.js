var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todoItems = [
    {
        id: 1,
        description: "Meet mom for lunch",
        completed: false
    },
    {
        id: 2,
        description: "Wash the cat",
        completed: false
    },
    {
        id: 3,
        description: "Eat breakfast",
        completed: true
    }
];

app.get('/', function(req, res){
    res.send('Todo API Root');
});

app.get('/todos', function(req, res){
    res.json(todoItems);
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


app.listen(PORT, function() {
    console.log('Express listening on '+PORT+'.');
});
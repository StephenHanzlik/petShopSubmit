'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');

var petsPath = path.join(__dirname, 'pets.json');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('short'));


app.get('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) return next(err);
        var pets = JSON.parse(data);
        res.send(pets);
    });
});

app.get('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) return next(err);
        var id = Number.parseInt(req.params.id);
        var pets = JSON.parse(data);

        if (id > pets.length - 1 || id < 0) {
            return res.sendStatus(404);
        } else {
            res.send(pets[id]);
        }

    });
});

app.get('/boom', function(req, res, next) {
    Item.find(function(err, items) {
        if (err) return next(err);
    });
});

app.post('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) return next(err);
        var age = Number.parseInt(req.body.age);
        var kind = req.body.kind;
        var name = req.body.name;

        if (Number.isInteger(age) && kind && name) {

            var pet = {
                "age": age,
                "kind": kind,
                "name": name
            };

            if (!pet) {
                return res.sendStatus(400);
            }
            var pets = JSON.parse(data);
            pets.push(pet);
            var petsString = JSON.stringify(pets);

            fs.writeFile(petsPath, petsString, function(err) {
                if (err) {
                    return res.sendStatus(500);
                }
                res.send(pets);
            });
        } else {
            res.sendStatus(400);

        }
    });
});

app.get('*', function(req, res) {
    res.sendStatus(404);
});

app.put('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, data) {
      if(err) return next(err);
        var id = Number.parseInt(req.params.id);
        var pets = JSON.parse(data);
        if (id > pets.length - 1 || id < 0) {
          return res.sendStatus(404);
        }
        pets[id] = {
          age: Number.parseInt(req.body.age),
          kind: req.body.kind,
          name: req.body.name,
        };
      var petsString = JSON.stringify(pets);

      //you can add error checking from line 53 here


      fs.writeFile(petsPath, petsString, function (err) {
        if (err) return next(err);
        res.send(pets[id]);

      });
    });
});
app.delete('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) return next(err);
        var pets = JSON.parse(data);
        var id = Number.parseInt(req.params.id);
        if (id > pets.length - 1 || id < 0) {
            return res.sendStatus(404);
        }
        var pet = pets.splice(id, 1);
        var petsString = JSON.stringify(pets);

        fs.writeFile(petsPath, petsString, function(err) {
          if (err) return next(err);
          res.send(petsString);
        });
    });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    return res.status(500).send({
        message: err.message
    })
});

app.listen(8000, function() {
    console.log('Listening on port 8000');
});


module.exports = app;

const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);
const exphbs = require('express-handlebars');
const express = require('express');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => res.render('index'));

app.get('/create', (req, res) => res.render('create'));

app.get('/about', (req, res) => res.render('about'));

app.get('/details/:id', function (req, res) {
  console.log(req.params.id);

  res.render(`details/${req.params.id}`);
});

app.get('*', (req, res) => res.render('404'));

app.listen(
  config.port,
  console.log(`Listening on port ${config.port}! Now its up to you...`)
);

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


  


const ATMs = [
            {
                name: 'Bankomat1',
                id: 'atm-1'
            },
            {
                name: 'Bankomat2',
                id: 'atm-2'
            }
];
app.get('/atmnearyou', (req, res) => {
    res.json({
        name: 'GRSU',
        ATMs:ATMs,
    });
});
app.get('/ATMs/:id', (req, res) => {
    const id = req.params.id;
    const ATM = ATMs.find((r) =>r.id === id);

    res.json(Object.assign(
    {},
    ATM,
    { path: 'to-be-designed' }
    ));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

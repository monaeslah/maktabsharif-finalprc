var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var bodyParser= require('body-parser');
var app = express();
var mongoose = require ('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = process.env.PORT || 4000
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/Users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'front/build'),{index:false,extensions:['html']}));

app.set('view engine', 'ejs');



app.use(bodyParser.json());
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const mongoURL =("mongodb://localhost:27017/userinfo")
console.log (mongoURL)
mongoose.connect(mongoURL,
  { useNewUrlParser: true })
  
.then(()=>console.log("mongoDB connected"))
.catch(err => console.log(err))
mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
var Users = require('./routes/Users')
 
app.listen(port,()=>{
  console.log("server is running on port:"+ port)
})

app.use('/users', Users)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var ejs = require('ejs');
var userApi = require('./controller/user');
var systemApi = require('./controller/system');

var args = process.argv.splice(2)
var useMock = args.includes('mock') //使用mock数据

var app = express();

// view engine setup  
app.set('views', path.join(__dirname, 'views'));
app.engine('.html' , ejs.__express);
app.set('view engine', 'html');


app.use(logger('dev'));  
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//post请求参数解析 参数内容可通过 req.body来调用
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


//设置返回的http请求头
app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
  res.header("Access-Control-Allow-Origin","*"  );  //允许跨域
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", 'Express');
  if(useMock){  //mock数据
    let thePath = 'mockdata'+req.path
    res.sendFile(path.join(__dirname, './'+ thePath + '.json'))
  }else{
    if (req.method == 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  }

});

//接口处理
app.use('/user', userApi);
app.use('/system', systemApi);



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

var express 		= require('express');
var app 			= express();
var port 			= process.env.PORT || 3000;
var mongoose 		= require('mongoose');
var morgan 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var session 		= require('express-session');
var methodOverride 	= require('method-override');
var multipart 		= require('connect-multiparty');
var mongoStore 		= require('connect-mongodb');	// 用于会话的持久化
var fs 				= require('fs');

// configuration ===========================================
app.use(express.static(__dirname + '/client/public'));

app.set('views', './client/views');
app.set('view engine', 'jade');
app.locals.pretty = true;

// config files
var db = require('./server/config/database');

// connect to our mongoDB database
mongoose.connect(db.url);

// models loading
// 这里设置完就可以在控制器中通过mongoose.model()来调用数据模型了
var models_path = __dirname + '/server/models';
// 生成一个遍历这个目录的方法
var walk = function(path) {
	fs
		.readdirSync(path)
		.forEach(function(file) {
			var newPath = path + '/' + file;
			var stat = fs.statSync(newPath);

			if (stat.isFile()) {
				// 正则判断是否是js或coffee文件
				if (/(.*)\.(js|coffee)/.test(file)) {
					require(newPath);
				}
			} else if (stat.isDirectory()) {
				walk(newPath);
			}
		});
};
walk(models_path);

app.use(morgan('dev'));
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multipart());

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// session
app.use(cookieParser());	// 引入这个后session才可以正常使用
app.use(session({
	secret: 'fanfiction',
	store: new mongoStore({
		url: db.url,
		collection: 'sessions'
	})
}));

app.locals.moment = require('moment');

if ('development' === app.get('env')) {
	app.set('showStackError', true);
	app.use(morgan(':method :url :status'));
	mongoose.set('debug', true);
}

// routes ==================================================
require('./server/config/routes')(app);


// start app ===============================================
app.listen(port);

console.log('Magin happens on port ' + port);

exports = module.exports = app;

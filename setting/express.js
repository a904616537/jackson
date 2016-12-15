let express,
    glob,
    favicon,
    logger,
    cookieParser,
    bodyParser,
    compress,
    methodOverride,
    zlib,
    async,
    controllers,
    i18n,
    ejs,
    session,
    mongoStore,
    env;

express        = require('express');
glob           = require('glob');
favicon        = require('serve-favicon');
logger         = require('morgan');
cookieParser   = require('cookie-parser');
bodyParser     = require('body-parser');
compress       = require('compression');
methodOverride = require('method-override');
zlib           = require('zlib');
async          = require('async');
ejs            = require('ejs');
session        = require('express-session');
mongoStore     = require('connect-mongo')(session);
env            = process.env.NODE_ENV || 'development';


module.exports = function (app, config) {

    i18n                       = require(config.root + '/app/services/i18n.service');
    app.locals.ENV             = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';
    app.use(express.static(config.root + '/public/'));
    app.engine('html', ejs.__express);
    app.set('views', config.root + '/public/');
    app.set('view engine', 'html');

    app.use(logger('dev'));
    app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({
        extended: false,
        limit   : 2000000
      })
    );

    app.use(cookieParser());
    app.use(compress({
        level   : zlib.Z_BEST_COMPRESSION,
        memLevel: 1
    }));
    app.use(express.static(config.root + '/public/'));
    app.use(methodOverride());
    app.use(i18n);

    app.use(session({
      name             : config.cookie.sessionName,
      secret           : config.cookie.secret,
      store            : new mongoStore({url: config.mongo.db, autoRemove: 'native', ttl: 0.5 * 60 * 60 }),
      saveUninitialized: true,
      resave           : true,
      cookie           : { httpOnly: true }
    }));

    routes = glob.sync(config.root + '/app/route/*.js');
    async.each(routes, (route, callback) => {
        console.log('Loading Router：', route);
        require(route)(app);
        callback();
    }, err => {
        if (err) console.log('A file failed to process.');
    });

    app.use((req, res, next) => {
        var err = new Error('Not Found');
        err.status = 404;
        res.render('404', {
            message: '您访问的页面不存在',
            error  : err,
            title  : '404'
        });
    });

    if (app.get('env') === 'development') {
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.render('500', {
                message: err.message,
                error  : err,
                title  : 'error'
            });
        });
    }

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('500', {
            message: err.message,
            error  : {},
            title  : 'error'
        });
    });

};

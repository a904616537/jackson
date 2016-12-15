let express,
    config,
    glob,
    mongoose,
    mongo,
    models,
    app,
    MongoClient,
    mongodb;

express  	= require('express');
config   	= require('./setting/config');
glob     	= require('glob');
mongoose 	= require('mongoose');
mongodb 	= require('mongodb');
MongoClient = mongodb.MongoClient;


// Mongodb 预加载
models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  console.log('Loading Mongodb model：' + model);
  require(model);
});

require('./app/services/mongodb.client');
app       = express();

// 应用程序加载
require('./setting/express')(app, config);

app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});

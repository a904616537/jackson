/*
 * Author: Kain·Altion <kain@foowala.com>
 * Module description: mongoose 加载器
 */

var db,
	mongoose      = require('mongoose'),
    path          = require('path'),
    config        = require('../../setting/config'),
    mongodb_cfg   = config.mongo,
    connectError  = err => {
        throw new Error('unable to connect to database at ' + mongodb_cfg.db);
    },
    connectOpen =  (err, database) => {
        console.log('Connected to mongo server.');
        if(err) console.error('ERROR: Unable to connect to MongoDB on startup at: ' + new Date());
         else db = database;
    };

mongoose.connect(mongodb_cfg.db, connectOpen);

module.exports = db;

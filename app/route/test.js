let express        = require('express'),
    router         = express.Router(),
    config         = require('../../setting/config'),
    _media_service = require('../services/media.service'),
    mongoose       = require('mongoose');

router.route('/')
    .get((req, res, next) => {
        const greeting = __('Hello');
        const serverResponse = {
        	status: 1,
        	message: greeting
        };
        res.send(serverResponse);
    });

router.route('/media/:filename')
    .get(function(req, res) {
        _media_service(req, res);
    });

router.route('/play')
    .get(function(req, res) {
        res.render('play');
    });

module.exports = app => {
  app.use('/', router);
};

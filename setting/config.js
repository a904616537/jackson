var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  //开发者环境配置
    development: {
        root        : rootPath,
        companyUr   : "test.jackson.com",
        port        : 8001,
        app      : {
            name: 'jackson-test'
        },
        mongo    : {
            db: 'mongodb://localhost:27017/jackson-mongo'
        },
        main     : {
            languagePath: rootPath + '/language/',
            media_path: rootPath + '/public/media/'
        },
        filemime: {
            '.swf': 'application/x-shockwave-flash',
            '.flv': 'video/x-flv',
            '.f4v': 'video/mp4',
            '.f4p': 'video/mp4',
            '.mp4': 'video/mp4',
            '.asf': 'video/x-ms-asf',
            '.asr': 'video/x-ms-asf',
            '.asx': 'video/x-ms-asf',
            '.avi': 'video/x-msvideo',
            '.mpa': 'video/mpeg',
            '.mpe': 'video/mpeg',
            '.mpeg': 'video/mpeg',
            '.mpg': 'video/mpeg',
            '.mpv2': 'video/mpeg',
            '.mov': 'video/quicktime',
            '.movie': 'video/x-sgi-movie',
            '.mp2': 'video/mpeg',
            '.qt': 'video/quicktime',
            '.mp3': 'audio/mpeg',
            '.wav': 'audio/x-wav',
            '.aif': 'audio/x-aiff',
            '.aifc': 'audio/x-aiff',
            '.aiff': 'audio/x-aiff',
            '.jpe': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.jpg': 'image/jpeg',
            '.png' : 'image/png',
            '.svg': 'image/svg+xml',
            '.tif': 'image/tiff',
            '.tiff': 'image/tiff',
            '.gif': 'image/gif',
            '.txt': 'text/plain',
            '.xml': 'text/xml',
            '.css': 'text/css',
            '.htm': 'text/html',
            '.html': 'text/html',
            '.pdf': 'application/pdf',
            '.doc': 'application/msword',
            '.vcf': 'text/x-vcard',
            '.vrml': 'x-world/x-vrml',
            '.zip': 'application/zip',
            '.webm': 'video/webm',
            '.m3u8': 'application/x-mpegurl',
            '.ts': 'video/mp2t',
            '.ogg': 'video/ogg'
        },
        cookie   : {
            secret     : 'jackson',
            sessionName: 'session'
        },
    },
    // 线上产品配置
    production: {
        root        : rootPath,
        companyUrl  : "www.jackson.com",
        port        : 8001,
        app       : {
            name: 'jackson'
        },
        mongo: {
            db: 'mongodb://localhost:27017/jackson-mongo'
        },
        main: {
            languagePath: rootPath + '/language/'
        },
        cookie   : {
            secret     : 'jackson',
            sessionName: 'session'
        }
    }
};

module.exports = config[env];

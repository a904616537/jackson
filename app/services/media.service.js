/**
 * Author: iTonyYo <ceo@holaever.com> (https://github.com/iTonyYo)
 * Last Update (author): Kain.Altion <kain.shi@holaever.com> (https://github.com/a90461653)
 */

'use strict';

var key,
    fileText,
    range,
    parts,
    partialstart,
    partialend,
    start,
    end,
    chunksize,
    mimeType,
    fileStream;

const config  = require('../../setting/config'),
      glob    = require('glob'),
      fs      = require('fs');



const mimeTypes = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    mp3: 'audio/mp3',
    mp4: 'video/mp4',
    swf: 'video/swf',
    flv: 'video/flv',
};

/**
 * @module mediaServer
 * @description <p>流媒体服务处理函数。</p>
 * @param {http.request} request - http 请求
 * @param {reply} reply - http 输出代理
 * @returns {response} 流媒体输出
 */
const mediaServer = (req, res) => {
    var strMimes = '';

    /** 获取所有系统支持的文件后缀 */
    for (key in config.filemime) {
        key      = key.replace('.', '');
        strMimes = strMimes + '|' + key;
    }

    /** 媒体文件相关参数加载。 */
    const filename  = req.params.filename,
          thisFiles = glob.sync(config.main.media_path + filename + '.+(' + strMimes + ')'),
          filePath  = thisFiles[0],
          fileStat  = fs.statSync(filePath),
          total     = fileStat.size;
    fileText  = filePath.substring(filePath.lastIndexOf("."), filePath.length);

    /** 媒体文件后缀识别，配置 http hander 标签媒体类型。 */
    if (config.filemime[fileText] === undefined) {
        res.render('500');
        return;
    } else {
        fileText = config.filemime[fileText];
    }

    /** 浏览器支持处理，流媒体输出。 */
    if (req.headers.range) {

		range        = req.headers.range;
		parts        = range.replace(/bytes=/, "").split("-");
		partialstart = parts[0];
		partialend   = parts[1];
		start        = parseInt(partialstart, 10);
		end          = partialend ? parseInt(partialend, 10) : total - 1;
		chunksize    = (end - start) + 1;
		mimeType     = mimeTypes[fileText] || 'text/plain; charset=utf-8';

		res.writeHead(206, {            
			'Content-Range' : 'bytes ' + start + '-' + end + '/' + total,
			'Accept-Ranges' : 'bytes',
			'Content-Length': chunksize,
			'Content-Type'  : mimeType
		});

		fileStream = fs.createReadStream(filePath, {start: start, end: end});

		fileStream.pipe(res);
		res.on('close', () => {
			console.log('response closed');
			if (res.fileStream) {
				res.fileStream.unpipe(this);
				if (this.fileStream.fd) fs.close(this.fileStream.fd);
			}
		});
    } else {

      mimeType = mimeTypes[fileText] || 'text/plain; charset=utf-8';
      console.log(mimeType)
      res.writeHead(200, {'Content-Type': mimeType});
      fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    }
}


module.exports = mediaServer;

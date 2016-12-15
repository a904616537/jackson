/*
 * Author: Kain·Altion <kain@foowala.com>
 * Module description: 国际语言加载器
 */


const i18n = require('i18n'),
	config = require ('../../setting/config');

i18n.configure({
  locales       : ['zh-CN', 'en'],
  directory     : config.main.languagePath,
  defaultLocale : 'en',
  cookie        : 'lang',
  objectNotation: true,
  register      : global,
  queryParameter: 'lang'
})

module.exports = (req, res, next) => {
  i18n.init(req, res);
  i18n.getLocale();
  return next();
};

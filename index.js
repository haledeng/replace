/*
* replace filename with its content
* usage: replace('./xxx.html');
* html will be transformed into js
*/

var parseTpl = require('parse-tpl'),
	fs = require('fs'),
	watch = require('watch'),
	path = require('path'),
	css2str = require('css2string');

// transformer 应该是统一的格式，输入输出都应该是content，而不是filename
// TODO: 可配置的transformer
var transformer = {
	html: parseTpl.compileTmpl,
	css: css2str.parse
};

function replace(input) {
	var content = fs.readFileSync(input, 'utf-8');
	var dirname = path.dirname(input);
	return content.replace(/replace\([\'\"]([^\'\"]+)[\'\"]\)/g, function(all, name) {
		name = name.replace(/(^\s*|\s$)+/, '');
		var _replace = '';
		name.replace(/(.*)\.([^\.]+)$/, function(all, name, ext) {
			// name: filename, ext: file extension
			all = path.join(dirname, all);
			if (fs.existsSync(all)) {
				_replace = fs.readFileSync(all, 'utf-8');
				if (transformer[ext]) {
					_replace = transformer[ext](_replace);
				}
			}
		});
		return _replace;
	});
}


var _handler = function(input) {
	var content = replace(input);
	fs.writeFileSync(path.basename(input) , content, {
		encoding: 'utf-8'
	});
};

// watch 文件变化
function addWatcher(input) {
	watch.createMonitor(path.dirname(input), function(monitor) {
		monitor.on('create', function(f, stat) {
			_handler(input);
		});
		monitor.on("changed", function(f, curr, prev) {
			console.log('file -- ' + f + ' -- changed!');
			_handler(input);
		});
		monitor.on("removed", function(f, stat) {});
	});
}


module.exports = {
	parse: _handler,
	replace: replace,
	watcher: addWatcher
};
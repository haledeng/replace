var parseTpl = require('parse-tpl'),
	fs = require('fs'),
	css2str = require('css2string');



function replace(input) {

	var content = fs.readFileSync(args[0], 'utf-8');

	content = content.replace(/replace\([\'\"]([^\'\"]+)[\'\"]\)/g, function(all, name) {
		name = name.replace(/(^\s*|\s$)+/, '');
		var _replace = '';
		name.replace(/(.*)\.([^\.]+)$/, function(all, name, ext) {
			/*
			 * name: filename
			 * ext: file extension
			 */
			if (fs.existsSync(all)) {
				if (ext === 'html') {
					_replace = parseTpl.compileTmpl(fs.readFileSync(all, 'utf-8'));
				} else if (ext === 'css') {
					_replace = css2str.parse(all);
				}
			}
		});
		return _replace;
	});
	return content;
}


module.exports = {	
	replace: replace
};	

// var args = [].slice.call(process.argv, 2);
// fs.writeFileSync(args[0].replace(/js$/, 'dist.js'), content, {
// 	encoding: 'utf-8'
// });
#!/usr/bin/env node
var replace = require('../index'),
	fs = require('fs'),
	path = require('path');


function getJSON() {
	var jsonPath = path.dirname(__dirname) + '/package.json';
	if (fs.existsSync(jsonPath)) {
		var content = fs.readFileSync(jsonPath);
		content = JSON.parse(content);
		return content;
	}
	return {};
}

function index() {
	var argv = [].slice.call(process.argv, 2);
	var packageJson = getJSON();
	
	input = argv[0].toLowerCase();
	if (~input.indexOf('-v')) {
		console.log(packageJson.version);
	} else if (~input.indexOf('-w')) {
		replace.parse(argv[1]);
		replace.watch(argv[1]);
	} else {
		replace.parse(argv[0]);
	}
}

index();

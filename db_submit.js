/*eslint-env node, browser*/
var express = require('express');
var mysql =	require('mysql');

var connection = mysql.createConnection({
	host	: 'us-cdbr-iron-east-03.cleardb.net',
	user	: 'b615dfccc67165',
	password: '64fc33fa',
	database: 'ad_38c35f1f5131ab4'
});

connection.connect(function(err) {
	if (err){
		console.error('Error Connecting: ' + err.stack);
		return;
	}
});

module.exports = connection;

var db = connection;
var db_submit = express();

var sub_name = document.getElementById("submit_name");
var sub_comment = document.getElementById("submit_comments");
var sub_email = document.getElementById("submit_email");
db.query('INSERT INTO volunteer (name, comment, email) VALUES (' + sub_name + ', ' + sub_comment + ', ' + sub_email + ')');

connection.end();
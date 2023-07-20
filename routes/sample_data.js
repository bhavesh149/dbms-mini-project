var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	response.render('sample_data', {title : 'DBMS MINI PROJOECT'});

});

router.post("/action", function(request, response, next){

	var action = request.body.action;

	if(action == 'fetch')
	{
		var query = "SELECT * FROM hostel_management.managers;";

		database.query(query, function(error, data){

			response.json({
				data:data
			});

		});
	}

	if(action == 'Add')
	{
		var manager_id = request.body.manager_id;

		var name = request.body.name;

		var contact = request.body.contact;

		var shift = request.body.shift;

		var query = `
		INSERT INTO hostel_management.managers 
		(manager_id, name, contact, shift) 
		VALUES ("${manager_id}", "${name}", "${contact}", "${shift}")
		`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Added'
			});

		});
	}

	if(action == 'fetch_single')
	{
		var manager_id = request.body.manager_id;

		var query = `SELECT * FROM hostel_management.managers WHERE manager_id = "${manager_id}"`;

		database.query(query, function(error, data){

			response.json(data[0]);

		});
	}

	if(action == 'Edit')
	{
		var manager_id = request.body.manager_id;

		var manager_id = request.body.manager_id;

		var name = request.body.name;

		var contact = request.body.contact;

		var shift = request.body.shift;

		var query = `
		UPDATE hostel_management.managers 
		SET manager_id = "${manager_id}", 
		name = "${name}", 
		contact = "${contact}", 
		shift = "${shift}" 
		WHERE manager_id = "${manager_id}"
		`;

		database.query(query, function(error, data){
			response.json({
				message : 'Data Edited'
			});
		});
	}

	if(action == 'delete')
	{
		var manager_id = request.body.manager_id;

		var query = `DELETE FROM hostel_management.managers WHERE manager_id = "${manager_id}"`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Deleted'
			});

		});
	}

});

module.exports = router;
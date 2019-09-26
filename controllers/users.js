var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var UserValidator = require('../validators/UserValidator');

router.get('/', (req, res, next) => {
	let _id = req.query._id ? ObjectId(req.query._id) : null;
	var profile_id = req.query.profile_id;
	var username = req.query.username;
	var password = req.query.password;
	let where = {};
	if (_id) where._id = _id;
	if (profile_id) where.profile_id = parseInt(profile_id);
	if (username) where.username = username;
	if (password) where.password = password;

	db.collection('users')
		.find(where)
		.toArray((err, result) => {
			if (err) {
				return res.send(err);
			}
			res.send(200, result);
		});
});

router.post('/', UserValidator.post, (req, res, next) => {
	var val = UserValidator.validate(req, res);
	if (val) return val;

	db.collection('users').save(req.body, (err, result) => {
		if (err) {
			return res.send(err);
		}
		let user = result.ops[0];
		console.log('collection("users").save => user', user);
		res.status(200).send(user);
	});
});

router.put('/', UserValidator.put, (req, res, next) => {
	var val = UserValidator.validate(req, res);
	if (val) return val;

	let vm = req.body;
	let _id = ObjectId(vm._id);
	findUser(_id, req, res).then(() => {
		delete vm['_id'];
		db.collection('users').updateOne(
			{
				_id: _id
			},
			{
				$set: vm
			},
			(err, result) => {
				if (err) {
					return res.send(err);
				}
				res.send(204);
			}
		);
	});
});

router.delete('/', (req, res, next) => {
	let _id = req.query._id ? ObjectId(req.query._id) : null;
	console.log('_id', _id);
	if (!_id) {
		let msg = 'Inform the user ID';
		res.send(400, msg);
		return;
	}
	let filter = {_id: _id};
	findUser(_id, req, res).then(() => {
		db.collection('users').deleteOne(filter, (err, result) => {
			if (err) {
				return res.send(500, err);
			}
			res.send(200);
		});
	});
});

function findUser(_id, req, res) {
	return new Promise((resolve, reject) => {
		let filter = {_id: _id};
		db.collection('users')
			.find(filter)
			.toArray((err, result) => {
				if (err) {
					reject(res.send(err));
				}
				if (result.length === 0) {
					let msg = 'User not found';
					reject(res.send(400, msg));
				}
				resolve();
			});
	});
}

module.exports = router;

const {check} = require('express-validator');
var BaseValidator = require('./BaseValidator');
var util = require('util');

function UserValidator() {
	BaseValidator.apply(this);
}

util.inherits(UserValidator, BaseValidator);
UserValidator.prototype.post = [
	check('profile_id')
		.not()
		.isEmpty()
		.withMessage('Not informed'),
	check('username')
		.not()
		.isEmpty()
		.withMessage('Not informed'),
	check('password')
		.not()
		.isEmpty()
		.withMessage('Not informed'),
	check('profile_id')
		.isIn([1, 2])
		.withMessage('Out of domain'),
	check('username')
		.isLength({max: 20})
		.withMessage('Max value exceeded'),
	check('password')
		.isLength({min: 4})
		.withMessage('Min value not reached')
		.isLength({max: 20})
		.withMessage('Max value exceeded')
];
UserValidator.prototype.put = [
	check('_id')
		.not()
		.isEmpty()
		.withMessage('Not informed')
].concat(UserValidator.prototype.post);
module.exports = new UserValidator();

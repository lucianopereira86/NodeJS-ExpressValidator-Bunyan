const {validationResult} = require('express-validator');

var BaseValidator = function() {};
BaseValidator.prototype.validate = function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let obj = {errors: getErrors(errors)};
		return res.status(400).json(obj);
	}
	return null;
};
function getErrors(errors) {
	let result = [];
	errors.array().forEach(e => {
		if (!result.map(r => r.param).includes(e.param)) {
			result.push(e);
		}
	});
	return result;
}
module.exports = BaseValidator;

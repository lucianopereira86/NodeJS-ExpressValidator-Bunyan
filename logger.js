const bunyan = require('bunyan');
const fs = require('fs');

exports.loggerInstance = () => {
	return bunyan.createLogger({
		name: 'LOG',
		streams: [
			{
				level: 'info',
				path: `log/${getDate()}.json` // log ERROR and above to a file
			}
		]
	});
};

function getDate() {
	let today = new Date();
	let DD = String(today.getDate()).padStart(2, '0');
	let MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let YYYY = today.getFullYear();
	let date = YYYY + MM + DD;
	let time = '';
	let path = `log/${date}.json`;

	if (fs.existsSync(path)) {
		let stats = fs.statSync(path);
		if (stats.size > 3145728) {
			let HH = String(today.getHours()).padStart(2, '0');
			let mm = String(today.getMinutes()).padStart(2, '0');
			let ss = String(today.getSeconds()).padStart(2, '0');
			time = '_' + HH + mm + ss;
		}
	}
	let datetime = date + time;
	return datetime;
}

exports.logResponse = function(id, body, statusCode) {
	let log = this.loggerInstance().child(
		{
			id: id,
			body: body,
			statusCode: statusCode
		},
		true
	);
	log.info('RESPONSE');
};

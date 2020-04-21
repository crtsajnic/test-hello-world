var express = require('express');
const https = require('https')
var router = express.Router();


const fursUrl = {
	hostname: 'blagajne-test.fu.gov.si',
	port: 9007,
	path: '/v1/getInvoice?qr={qr}&apikey={apiKey}',
	method: 'GET'
}

router.get('/', function (req, res, next) {
	let apiKey = 'ZaDEKtHoSdGa0P4TwWV3tm6FkwUo71GL';
	let qrCode = req.query.code;

	if(qrCode != null && qrCode.length == 4) {
		fursUrl.path = fursUrl.path.replace('{qr}', qrCode);
		fursUrl.path = fursUrl.path.replace('{apiKey}', apiKey);
	
		res.json(fursUrl);
	} else {
		res.json({ code: 234 });
	}


	
	

	//const req = https.request(options, res => {
	//	console.log(`statusCode: ${res.statusCode}`)
//
	//	res.on('data', d => {
	//		process.stdout.write(d)
	//	})
	//})
//
	//req.on('error', error => {
	//	console.error(error)
	//})
//
	//req.end()

	//var day = (Math.round((Math.random() * 31) + 1));
	//if (day < 10) {
	//	day = '0' + day.toString();
	//}
	//
	//res.json({ amount: ((Math.random() * 100) + 1).toFixed(2).toString(), date:'2020-04-' + day + 'T07:15:00.000', title: 'QR CODE SAMPLE' });
});

module.exports = router;
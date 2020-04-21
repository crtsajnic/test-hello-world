var express = require('express');
const https = require('https');
const fs = require("fs");
var router = express.Router();


const fursUrl = {
	hostname: 'blagajne-test.fu.gov.si',
	port: 9007,
	path: '/v1/getInvoice?qr={qr}&apikey={apiKey}',
	method: 'GET',
	//key: fs.readFileSync("/srv/www/keys/my-site-key.pem"),
  	ca: fs.readFileSync("/root/test-hello-world/test-tls.cer")
}

router.get('/', function (req, res, next) {
	let apiKey = 'ZaDEKtHoSdGa0P4TwWV3tm6FkwUo71GL';
	let qrCode = req.query.code;

	//if(qrCode != null && qrCode.length == 4) {
	//	fursUrl.path = fursUrl.path.replace('{qr}', qrCode);
	//	fursUrl.path = fursUrl.path.replace('{apiKey}', apiKey);
	//
	//	res.json(fursUrl);
	//} else {
	//	res.json({ code: 234 });
	//}

	const reqq = https.request(fursUrl, ress => {
		console.log(`statusCode: ${ress.statusCode}`)

		ress.on('data', d => {
			res.json(error);
		})
	})

	reqq.on('error', error => {
		res.json(error);
	})

	reqq.end()

});

module.exports = router;
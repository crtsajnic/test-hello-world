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
	ca: fs.readFileSync("/root/test-hello-world/test-tls.cer"),
	secureProtocol: "TLSv1_2_method",
	rejectUnauthorized: false,
    requestCert: true,
    agent: false
}

router.get('/', function (req, res, next) {
	const apiKey = 'ZaDEKtHoSdGa0P4TwWV3tm6FkwUo71GL';
	let qrCode = req.query.code;

	if (qrCode != null && qrCode.length == 60) {
		fursUrl.path = fursUrl.path.replace('{qr}', qrCode);
		fursUrl.path = fursUrl.path.replace('{apiKey}', apiKey);

		process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

		const reqq = https.request(fursUrl, ress => {
			console.log(`statusCode: ${ress.statusCode}`)

			ress.on('data', d => {
				//res.json({ data: true });
				let json = JSON.parse(d);
				console.log(d);
				res.json(json);
			})
		})

		reqq.on('error', error => {
			console.log(error);
			res.json(error);
		})

		reqq.end()
	} else {
		res.json({ code: 234 });
	}
});

module.exports = router;
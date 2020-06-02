var express = require('express');
const https = require('https');
const fs = require("fs");
var router = express.Router();


const fursUrl = {
	hostname: 'blagajne-test.fu.gov.si',
	port: 9007,
	path: '/v1/getInvoice?qr={qr}&apikey={apiKey}',
	method: 'GET',
	//key: fs.readFileSync("/root/test-hello-world/test-tls.cer"),
	cert: fs.readFileSync("/root/test-hello-world/test-tls.cer"),
	//secureProtocol: "TLSv1_2_method",
	//rejectUnauthorized: false,
    //requestCert: true,
    //agent: false
}

router.get('/', function (req, res, next) {
	const apiKey = 'ZaDEKtHoSdGa0P4TwWV3tm6FkwUo71GL';
	let qrCode = req.query.code;

	if(qrCode == 'debug') {
		res.json({
			"Data": {
				"TaxNumber": 12345678,
				"UniqueInvoiceID": "6371d352-57af-4a84-b93d-fe33944762ab",
				"ProtectedID": "34905bcff14b381039af2e9d7eee54bb",
				"IssueDateTime": "2015-08-07T13:05:24",
				"IssuerName": "FURS",
				"IssuerAddress": "Šmartinska cesta 55, 1000 Ljubljana",
				"InvoiceAmount": 66.71,
				"PaymentAmount": 47.76,
				"InvoiceIdentifier": {
					"BusinessPremiseID": "TRGOVINA1",
					"ElectronicDeviceID": "BLAG2",
					"InvoiceNumber": "145"
				}
			},
			"status": {
				"code": "1",
				"msg": "Invoice found"
			}
		});
	}
	
	if (qrCode != null && qrCode.length == 60) {
		fursUrl.path = fursUrl.path.replace('{qr}', qrCode);
		fursUrl.path = fursUrl.path.replace('{apiKey}', apiKey);

		//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

		const reqq = https.request(fursUrl, ress => {
			console.log(`statusCode: ${ress.statusCode}`)

			ress.on('data', d => {
				//res.json({ data: true });
				let json = JSON.parse(d);
				console.log(json);
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
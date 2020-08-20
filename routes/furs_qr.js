var express = require('express');
const https = require('https');
const fs = require("fs");
var router = express.Router();

var testEnv = false;

const options = {
	hostname: testEnv ? 'blagajne-test.fu.gov.si' : 'blagajne.fu.gov.si',
	port: 9007,
	path: '/v1/getInvoice?qr={qr}&apikey={apikey}',
	method: 'GET',
	//key: testEnv ? null : 
	//				fs.readFileSync("/root/test-hello-world/key-blagajne.fu.gov.si.pem"),
	cert: testEnv ? fs.readFileSync("/root/test-hello-world/test-tls.cer") : 
					fs.readFileSync("/root/test-hello-world/interRootCombined.pem"),
	//ca: testEnv ?   null : 
	//				fs.readFileSync("/root/test-hello-world/ca-si-trust-root.crt"),
	//secureProtocol: "TLSv1_2_method",
	rejectUnauthorized: !testEnv,
	requestCert: true,
	//agent: false
}

//fursUrl.agent = new https.Agent(fursUrl);


router.get('/', function (req, res, next) {
	const apikey = 'ZaDEKtHoSdGa0P4TwWV3tm6FkwUo71GL';
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
		options.path = options.path.replace('{qr}', qrCode);
		options.path = options.path.replace('{apikey}', apikey);

		//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

		var reqq = https.request(options, ress => {
			console.log(`statusCode: ${ress.statusCode}`)

			ress.on('data', d => {
				let json = JSON.parse(d);
				//console.log(json);
				res.json(json);
			});

			ress.on('end', function() {
				console.log('END OF REQUEST');
			});
		});

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
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
	let fursUrl = 'https://blagajne-test.fu.gov.si:9007/v1/getInvoice?qr={qr}&apikey={apiKey}';
	let apiKey = 'ZaDEKtHoSdGa0P4TwWV3tm6FkwUo71GL';
	let qrCode = req.query.code;

	fursUrl = fursUrl.replace('{qr}', qrCode);
	fursUrl = fursUrl.replace('{apiKey}', apiKey);

	res.json({ url: fursUrl });

	
	//var day = (Math.round((Math.random() * 31) + 1));
	//if (day < 10) {
	//	day = '0' + day.toString();
	//}
	//
	//res.json({ amount: ((Math.random() * 100) + 1).toFixed(2).toString(), date:'2020-04-' + day + 'T07:15:00.000', title: 'QR CODE SAMPLE' });
});

module.exports = router;
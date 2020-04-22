// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');

// var fursRouter = require('./routes/furs');

// var app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/qr', fursRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;



// A super simple HTTPS service which allows you to GET a collection of names from https://<hostname>/names
var express = require('express');
var https = require('https');
var app = express();
var fs = require('fs');

const fursUrl = {
	hostname: 'blagajne-test.fu.gov.si',
	port: 9007,
	path: '/v1/getInvoice?qr={qr}&apikey={apiKey}',
	method: 'GET',
	//key: fs.readFileSync('/root/test-hello-world/bin/test-tls.cer'),
	//cert: fs.readFileSync('/root/test-hello-world/bin/test-tls.cer'),
	//secureProtocol: "TLSv1_2_method"
}

app.get('/qr', function (req, res, next) {
	const apiKey = 'ZaDEKtHoSdGa0P4TwWV3tm6FkwUo71GL';
	let qrCode = req.query.code;

	if (qrCode != null && qrCode.length == 4) {
		fursUrl.path = fursUrl.path.replace('{qr}', qrCode);
		fursUrl.path = fursUrl.path.replace('{apiKey}', apiKey);

		//console.log(fursUrl);

		const reqq = https.request(fursUrl, ress => {
			console.log(`statusCode: ${ress.statusCode}`)

			ress.on('data', d => {
				res.json(error);
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

// You can generate the certs using the instructions given here:
// https://vanjakom.wordpress.com/2011/08/11/client-and-server-side-ssl-with-nodejs/
var server = https.createServer({
	key: fs.readFileSync('/root/test-hello-world/bin/test-tls.cer'),
  cert: fs.readFileSync('/root/test-hello-world/bin/test-tls.cer'),
  ca: fs.readFileSync('/root/test-hello-world/bin/test-tls.cer'),
	ciphers: [
 		'ECDHE-RSA-AES128-GCM-SHA256',
 		'ECDHE-ECDSA-AES128-GCM-SHA256',
 		'ECDHE-RSA-AES256-GCM-SHA384',
 		'ECDHE-ECDSA-AES256-GCM-SHA384',
 		'DHE-RSA-AES128-GCM-SHA256',
 		'ECDHE-RSA-AES128-SHA256',
 		'DHE-RSA-AES128-SHA256',
 		'ECDHE-RSA-AES256-SHA384',
 		'DHE-RSA-AES256-SHA384',
 		'ECDHE-RSA-AES256-SHA256',
 		'DHE-RSA-AES256-SHA256',
 		'HIGH',
 		'!aNULL',
 		'!eNULL',
 		'!EXPORT',
 		'!DES',
 		'!RC4',
 		'!MD5',
 		'!PSK',
 		'!SRP',
 		'!CAMELLIA'
	].join(':'),
	honorCipherOrder: true
}, app).listen(443);
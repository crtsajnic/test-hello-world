var express = require('express');
var router = express.Router();


router.get('/qr', function(req, res, next) {
	//if(req.query.code == '1234') {
	//	app.set('json spaces', 2);
	//	res.json({ amount: '30.52', date:'2020-04-10T07:15:00.000', title: 'QR CODE SAMPLE' });
	//} else {
	//	res.send('Code not found');
	//}
	
	var day = (Math.round((Math.random() * 31) + 1));
	if (day < 10) {
		day = '0' + day.toString();
	}
	
	res.json({ amount: ((Math.random() * 100) + 1).toFixed(2).toString(), date:'2020-04-' + day + 'T07:15:00.000', title: 'QR CODE SAMPLE' });
});

module.exports = router;
'use strict';
var NDC = require('./'),
    testData = require('./test/test-data');
if (process.env.API_KEY) {
    testData.config[0].APIAuthKey = testData.config[1].APIAuthKey = process.env.API_KEY;
}
var kronos = new NDC(testData.config[0]),
    usdtravel = new NDC(testData.config[1]);

// var message = usdtravel.messages.FlightPrice(testData.FlightPrice[0]);
// var message = kronos.messages.SeatAvailability(testData.SeatAvailability[0]);
// var message = kronos.messages.ServiceList(testData.ServiceList[0]);
// var message = kronos.messages.ServicePrice(testData.ServicePrice[0]);
// var message = kronos.messages.OrderCreate(testData.OrderCreate[0]);
// var message = kronos.messages.OrderList(testData.OrderList[0]);
// var message = kronos.messages.OrderRetrieve(testData.OrderRetrieve[0]);
// require('fs').writeFileSync('/tmp/debug.xml', message.toXML(true, true));
// var message = kronos.messages.OrderCreate(testData.OrderCreate[0]);
var message = kronos.messages.AirShopping(testData.AirShopping[0])
message.request(function(err, data) {
    if (err) {
        return console.error(err);
    }
    console.log('>>>', JSON.stringify(data, null, '  '));
}, true);

/*var NDC = require('ndc-client');*/
var NDC = require('./index.js');
var ndc = new NDC(require('./config.json'));

/* OneWay with multiple pax */
var reqData = 
	{
	"Party": [{
		"Sender": [{
			"TravelAgencySender": [{
				"Name": ["JR TECHNOLOGIES"],
				"IATA_Number": ["20200154"],
				"AgencyID": ["00010080"]
			}]
		}]
	}],
	"Filters": [{
		"airlineID": "Z9",
		"CreateDateRange": [{
			"Effective": ["2017-08-14"],
			"Expiration": ["2017-08-15"]
		}]
	}]
};

// Direct request
ndc.request('OrderList', reqData, function (err, response) {
    console.log(response);
	
	
	if (err) {
        console.error("Can't process request", err);
		}
});

//Or if you need to work with message body:
var message = ndc.messages.OrderList(reqData);

// print JSON message.
console.log(message.toJSON());
// print pretty XML code.
console.log(message.toXML(true));
// make request
message.request(function (err, response) {
    // view response
    console.log(response);
});
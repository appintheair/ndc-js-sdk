'use strict';

var should = require('should'),
    testData = require('./test-data'),
    NDC = require('../');

// Override API Key with env variable
if (process.env.API_KEY) {
    testData.config[0].APIAuthKey = testData.config[1].APIAuthKey = process.env.API_KEY;
}

var ndc = new NDC(testData.config[0]);


describe('NDC client', function() {
    var OfferItemID;
    var ShoppingResponseID;
    describe('Shopping messages', function() {
        describe('should handle AirShopping messages', function() {
            it('should create "one flight" XML messages with only one <OriginDestination> element', function(done) {
                var xml = ndc.messages.AirShopping(testData.AirShopping[0]).toXML(true, true);
                should(xml.match(/<OriginDestination>/g).length).equal(1);

                done();
            });
            it('should create "round trip" XML messages with two <OriginDestination> elements', function(done) {
                var xml = ndc.messages.AirShopping(testData.AirShopping[1]).toXML(true, true);
                should(xml.match(/<OriginDestination>/g).length).equal(2);

                done();
            });
            it('should receive a successful response with a "ShoppingResponseID" element', function(done) {
                var message = ndc.messages.AirShopping(testData.AirShopping[1]);
                message.request(function(err, data) {

                    should.not.exist(err);
                    should.exist(data.AirShoppingRS.Success);
                    should.exist(data.AirShoppingRS.ShoppingResponseID.ResponseID);

                    ShoppingResponseID = data.AirShoppingRS.ShoppingResponseID.ResponseID;
                    console.log("Got Shopping responceID : " + ShoppingResponseID);
                    testData.OrderCreate[0].shoppingRS.id = ShoppingResponseID;

                    done();
                });
            });
        });

    });
    describe /*.only*/ ('Order management messages', function() {
        var orderID = "D12815";
        var order;
        describe('should handle OrderCreate messages', function() {
            it('should receive a successful "OrderViewRS" response element', function(done) {
                var message = ndc.messages.OrderCreate(testData.OrderCreate[0]);
                message.request(function(err, data) {

                    should.not.exist(err);
                    should.exist(data.OrderViewRS.Success);

                    orderID = data.OrderViewRS.Response.Order.$.OrderID;
                    console.log("Got orderID " + orderID);

                    done();
                });
            });
        });
        describe('should handle OrderList messages', function() {
            it('should receive a successful "OrderListRS" response element', function(done) {
                var message = ndc.messages.OrderList(testData.OrderList[0]);
                message.request(function(err, data) {

                    should.not.exist(err);
                    should.exist(data.OrderListRS.Success);

                    done();
                });

            });
        });
        describe('should handle OrderRetrieve messages', function() {
            it('should receive a successful "OrderViewRS" response element', function(done) {
                var reqData = testData.OrderRetrieve[0];
                reqData.order.id = orderID;
                console.log(ndc.messages.OrderRetrieve(reqData).toXML(true, true));

                ndc.messages.OrderRetrieve(reqData).request(function(err, data) {
                    should.not.exist(err);
                    should.exist(data.OrderViewRS.Success);

                    done();
                });
            });
        });
    });
});

'use strict';

var common = require('./common');

var OrderList = function(data) {
    return {
        PointOfSale: common.PointOfSale(data),
        Document: common.Document(data),
        Party: common.Party(data, true),
        Query: {
            Filters: {
                Airline: {
                    AirlineID: data.filter.airlineID
                }
            }
        }
    };
};

module.exports = OrderList;

'use strict';

var common = require('./common');

var OrderRetrieve = function(data) {
    return {
        Document: common.Document(data),
        Party: common.Party(data, true),
        Query: {
            Filters: {
                OrderID: {
                    _Owner: data.order.owner || data.sender.owner,
                    _: data.order.id
                }
            }
        }
    };
};

module.exports = OrderRetrieve;

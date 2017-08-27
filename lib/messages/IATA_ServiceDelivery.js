'use strict';
var ServiceDelivery = function(data) {
    return {
        Service: data.Service,
        Order: data.Order
    };

};

module.exports = ServiceDelivery;
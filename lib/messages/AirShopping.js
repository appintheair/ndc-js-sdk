'use strict';

var common = require('./common');

var AirShopping = function(data) {
    return {
        Document: common.Document(data),
        Party: common.Party(data),
        Parameters: common.Parameters(data),
        CoreQuery: {
            OriginDestinations: data.onds.map(function(ond) {
                return common.OriginDestinations(ond, data, 'OriginDestination');
            })
        },
        Preference: common.Preference(data),
        DataLists: common.Passengers(data),
        Metadata: common.Metadata(data)
    };
};

module.exports = AirShopping;

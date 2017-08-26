module.exports = function Preference(data) {
    var common = require('./');
    return {
        AirlinePreferences: {
            Airline: {
                AirlineID: (data.airline).id,
            }
        },
        CabinPreferences: (data.cabin ? {
            CabinType: common.CabinType(data)
        } : null)

    };
};

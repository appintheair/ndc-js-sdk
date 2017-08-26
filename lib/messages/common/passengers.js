module.exports = function Passengers(data, travelerRoot, travelerKey) {
    var travelers = {};
    travelerRoot = travelerRoot || 'PassengerList';
    travelerKey = travelerKey || 'Passenger';
    travelers[travelerKey] = (data.travelers && data.travelers.length ?
        data.travelers.map(function(traveler) {
            if (traveler.anonymous) {
                return {

                    _PassengerID: traveler.key,
                    PTC: {
                        _: traveler.type
                    }

                };
            } else {
                return {
                    _PassengerID: traveler.key,
                    PTC: {
                        _: traveler.type
                    },
                    Age: (!!traveler.age ?
                        (strictFunc()) :
                        null),
                    Individual: (

                        traveler.name ? {
                            GivenName: traveler.name.given,
                            MiddleName: traveler.name.middle,
                            Surname: traveler.name.surname
                        } : null)
                };

            }
        }) : null);
    ret = {
        PassengerList: (travelers)
    };
    return ret;
};



function strictFunc() {
    'use strict';

    var code = '(function () { return this }())';
    var result = eval.call(null, code);
    console.log(result !== undefined); // true, sloppy mode
}

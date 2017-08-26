var CabinType = require('./cabin');
module.exports = function OriginDestinations(data, root, arrayRoot) {
    var result = {};
    result[arrayRoot] = data.flights.map(function(flight) {
        return {
            _SegmentKey: flight.segmentKey,
            Departure: {
                AirportCode: flight.departure.airportCode,
                Date: flight.departure.date ? flight.departure.date.toISOString().replace(/T.*/, '') : null,
                AirportName: flight.departure.airportName
            },
            Arrival: {
                AirportCode: flight.arrival.airportCode,
                Date: flight.arrival.date ? flight.arrival.date.toISOString().replace(/T.*/, '') : null,
                AirportName: flight.arrival.airportName
            },
            MarketingCarrierAirline: (flight.airline ? {
                AirlineID: (flight.airline).id,
                Name: (flight.airline).name
            } : null),
            CalendarDates: (flight.calendar ? {
                _DaysAfter: flight.calendar.after,
                _DaysBefore: flight.calendar.before
            } : null)
        };
    });
    return result;
};

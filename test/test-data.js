'use strict';
var TestData = {};
/* sample regognized adult */
var passenger = {
    key: 'SH1',
    type: 'ADT',
    residenceCode: 'US',
    age: {
        birthDate: '1989-09-09'
    },
    name: {
        given: 'Mithalesh',
        middle: 'Ignatius',
        surname: 'Yadav'
    },
    contact: {
        email: 'mithalesh@jrtechnologies.com',
        phone: '9867236088',
        address: {
            street: '22 Main Street',
            city: 'FRA',
            postalCode: '14201',
            country: 'DE'
        }
    },
    profileID: '123',
    gender: 'Male',
    fqtvs: [{
        programID: 'kR',
        providerID: 'KR',
        accountNumber: '992227471658222'
    }],
    foids: [{
        type: 'PP',
        id: '333444666'
    }]
}



TestData.config = [
    /* Zeus Air config data*/
    {
        "language": "en",
        "currencyCode": "USD",
        "countryCode": "US",
        "cityCode": "NYC",
        "providerName": "IATA NDC GATEWAY",
        "endpoint": "http://35.187.57.17:8700/ndcgateway",
        "APIAuthKey": "xxxxxxxxxxxxxxxxxxxxxxxx",
        "agent": {
            "IATANumber": "0000XXXX",
            "name": "IATA Developer",
            "id": "developer.test",
            "type": "Hackathon Agent",
            "email": "me@my.domain.com"
        },
        "sender": {
            "id": "9A",
            "name": "Athena Air",
            "type": "Airline Agent",
            "email": "test@example.org",
            "IATANumber": "00000001"
        },
        airline: {
            id: "Z9",
            name: "Zeus Airline"
        }
    }

];

TestData.AirShopping = [
    /* OneWay with multiple pax */
    {
        onds: [{
            flights: [{
                departure: {
                    date: new Date('2017-09-06'),
                    airportCode: 'CDG'
                },
                arrival: {
                    airportCode: 'FRA'
                },
                airline: TestData.config.airline
            }]
        }],
        cabin: 'C',
        travelers: [
            /* two anonymous adults */
            {
                anonymous: true,
                type: 'ADT'
            },

            /* 1 anonymous infant */
            {
                anonymous: true,
                type: 'INF'
            }
        ]
    },
    /* RoundTrip with multiple pax */
    {
        onds: [{
            flights: [{
                departure: {
                    date: new Date('2017-09-06'),
                    airportCode: 'CDG'
                },
                arrival: {
                    airportCode: 'FRA'
                },
                airline: TestData.config.airline
            }, {
                departure: {
                    date: new Date('2017-09-07'),
                    airportCode: 'FRA'
                },
                arrival: {
                    airportCode: 'CDG'
                },
                airline: TestData.config.airline
            }]
        }],
        cabin: 'C',
        travelers: [
            /* one recognized adult */
            {
                key: 'PAX1',
                type: 'ADT',
                residenceCode: 'US',
                age: {
                    birthDate: '1989-09-09'
                },
                name: {
                    title: 'MR',
                    given: 'Mithalesh',
                    middle: 'Ignatius',
                    surname: 'Yadav'
                },
                contact: {
                    email: 'mithalesh@jrtechnologies.com',
                    phone: '9867236088'
                },
                profileID: '123',
                gender: 'Male',
                fqtvs: [{
                    programID: 'kR',
                    providerID: 'KR',
                    accountNumber: '992227471658222'
                }],
                foids: [{
                    type: 'PP',
                    id: '333444666'
                }]
            }
        ]
    },
    /* OneWay with all cabin */
    {
        onds: [{
            flights: [{
                departure: {
                    date: new Date('2017-09-05'),
                    airportCode: 'ARN'
                },
                arrival: {
                    airportCode: 'FRA'
                }
            }]
        }],
        travelers: [
            /* one anonymous adult */
            {
                anonymous: true,
                type: 'ADT'
            }
        ]
    }
];

TestData.OrderCreate = [
    /* OneWay with multiple pax */
    {
        travelers: [passenger],
        shoppingRS: {
            currencyCode: 'EUR',
            id: '201-f85ec0283f76448ba7c76a641ef70488',
            offers: [{
                owner: TestData.config[0].airline.id,
                total: 601.00,
                id: 'OFFER1',
                items: [{
                    id: 'OFFERITEM1_1',
                    passenger: 'SH1'
                }]
            }, {
                owner: TestData.config[0].airline.id,
                total: 601.00,
                id: 'OFFER12',
                items: [{
                    id: 'OFFERITEM12_1',
                    passenger: 'SH1'
                }]
            }]
        },
        payment: {
            card: {
                type: 'MC',
                number: '1111222233334444',
                series: '584',
                expiration: '0322'
            },
            taxable: true,
            currency: 'EUR',
            amount: 2019.87,
            payer: {
                surname: 'Yadav',
                given: 'Mithalesh',
                street: '22 Main Street',
                city: 'FRA',
                postalCode: '14201',
                country: 'DE',
                email: 'mithalesh@jrtechnologies.com'
            }
        }
    }
];
TestData.OrderList = [
    /* Airline Filter */
    {
        filter: {
            airlineID: TestData.config[0].airline.id
        }
    }
];


TestData.OrderRetrieve = [
    /* Airline Filter */
    {

        order: {
            owner: TestData.config[0].airline.id,
            id: 'A1234C4G8'
        }
    }
];


module.exports = TestData;

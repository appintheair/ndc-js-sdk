'use strict';

var util = require('util');
var common = require('./common');

var OrderCreate = function(data, shoppingRS, offerItemIDs) {
    var Query = {};
    Query.Passengers = {};

    Query.Order = {
        Offer: data.shoppingRS.offers.map(function(offer) {
            return {

                _OfferID: offer.id,
                _Owner: offer.owner || data.shoppingRS.owner,
                _ResponseID: data.shoppingRS.id,
                OfferItem: offer.items.map(function(item) {
                    var offerItem = {
                        _OfferItemID: item.id,
                        PassengerRefs: item.passenger
                    }
                    return offerItem;
                })
            };
        })
    };
    Query.Payments = {
        Payment: {
            Method: {
                PaymentCard: {
                    CardCode: data.payment.card.type,
                    CardNumber: data.payment.card.number,
                    SeriesCode: data.payment.card.series,
                    EffectiveExpireDate: {
                        Effective: data.payment.card.expiration
                    }
                }
            },
            Amount: {
                _Taxable: (!!data.payment.taxable).toString(),
                _Code: data.payment.currency,
                _: data.payment.amount.toString()
            },
            Payer: {
                Name: {
                    Surname: data.payment.payer.surname,
                    Given: data.payment.payer.given
                },
                Contacts: {
                    Contact: {
                        AddressContact: {
                            Street: data.payment.payer.street,
                            CityName: data.payment.payer.city,
                            PostalCode: data.payment.payer.postalCode,
                            CountryCode: data.payment.payer.country
                        },
                        EmailContact: {
                            Address: data.payment.payer.email
                        }
                    }
                }
            }
        }
    };

    Query.DataLists =
        common.Passengers(data)

    Query.Metadata = common.Metadata(data);

    return {
        Document: common.Document(data),
        Party: common.Party(data, true),
        Query: Query,
    };
};

module.exports = OrderCreate;

module.exports = function Travelers(data, travelerRoot, travelerKey) {
    var travelers = {};
    travelerRoot = travelerRoot || 'Traveler';
    travelerKey = travelerKey || 'RecognizedTraveler';
    travelers[travelerRoot] = (data.travelers && data.travelers.length ?
        data.travelers.map(function(traveler) {
            if (traveler.anonymous) {
                return {
                    AnonymousTraveler: {
                        _ObjectKey: traveler.key,
                        PTC: {
                            _Quantity: traveler.count || 1,
                            _: traveler.type
                        }
                    }
                };
            } else {
                var _traveler = {};
                _traveler[travelerKey] = {
                    _ObjectKey: traveler.key,
                    PTC: {
                        _Quantity: 1,
                        _: traveler.type
                    },
                    ResidenceCode: traveler.residenceCode,
                    Age: (!!traveler.age ? {
                        BirthDate: traveler.age.birthDate
                    } : null),
                    Name: (traveler.name ? {
                        Surname: traveler.name.surname,
                        Given: traveler.name.given,
                        Title: traveler.name.title,
                        Middle: traveler.name.middle
                    } : null),
                    ProfileID: traveler.profileID,
                    Gender: traveler.gender,

                    FQTVs: traveler.fqtvs.map(function(fqtv) {
                        return {
                            AirlineID: fqtv.providerID,
                            Account: {
                                Number: fqtv.accountNumber
                            },
                            ProgramID: fqtv.programID
                        };
                    }),
                    FOIDs: (traveler.foids && traveler.foids.length ? {
                        FOID: traveler.foids.map(function(foid) {
                            return {
                                Type: {
                                    Code: foid.type,
                                },
                                ID: foid.id
                            };
                        })
                    } : null),
                    Contacts: (traveler.contact ? {
                        Contact: (function() {
                            if (traveler.contact.email || traveler.contact.phone || traveler.contact.address) {
                                var contacts = [];
                                if (traveler.contact.email) {
                                    contacts.push({
                                        EmailContact: {
                                            Address: traveler.contact.email
                                        }
                                    });
                                }
                                if (traveler.contact.phone) {
                                    contacts.push({
                                        PhoneContact: {
                                            Application: 'Emergency',
                                            Number: traveler.contact.phone
                                        }
                                    });
                                }
                                if (traveler.contact.address) {
                                    contacts.push({
                                        AddressContact: {
                                            Application: 'AddressAtOrigin',
                                            Street: traveler.contact.address.street,
                                            CityName: traveler.contact.address.city,
                                            PostalCode: traveler.contact.address.postalCode,
                                            CountryCode: traveler.contact.address.country
                                        }
                                    });
                                }
                                return contacts;
                            }
                        })()
                    } : null),
                    Languages: (traveler.languages && traveler.languages.length ? {
                        LanguageCode: traveler.languages
                    } : null)
                };
                return _traveler;
            }
        }) : null);
    return travelers;
};

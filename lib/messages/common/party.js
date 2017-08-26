module.exports = function Party(data, travelAgency) {
    var sender = (travelAgency ? {
        TravelAgencySender: {
            Name: data.sender.name,
            Type: data.sender.type || 'TravelAgency',
            Contacts: (data.sender.email ? {
                Contact: [{
                    EmailContact: {
                        Address: data.sender.email,
                    }
                }]
            } : null),
            PseudoCity: data.sender.pseudoCity || 'A4A',
            IATA_Number: data.sender.IATANumber,
            AgencyID: {
                _Owner: data.sender.owner,
                _: data.sender.id
            },
            AgentUser: {
                Name: data.agent.name,
                AgentUserID: data.agent.id,
                Role: data.agent.role
            },
        }
    } : {
        ORA_Sender: {
            AirlineID: data.sender.id,
            Name: data.sender.name,
            AgentUser: {
                Name: data.sender.name,
                Type: data.sender.type,
                Contacts: (data.sender.email ? {
                    Contact: [{
                        EmailContact: {
                            Address: data.sender.email,
                        }
                    }]
                } : null),
                PseudoCity: 'A4A',
                IATA_Number: data.sender.IATANumber,
                AgentUserID: data.agent.id,
            }
        }
    });

    return {
        Sender: sender,
        Participants: (data.participants && data.participants.length ?
            data.participants.map(function(participant, idx) {
                return {
                    Participant: {
                        AggregatorParticipant: {
                            _SequenceNumber: idx + 1,
                            Name: participant.name,
                            AggregatorID: participant.id
                        },
                        CorporateParticipant: {
                            ID: participant.id
                        }
                    }
                };
            }) : null)
    }
};

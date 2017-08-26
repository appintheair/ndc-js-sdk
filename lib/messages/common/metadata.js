module.exports = function Metadata(data) {
    return {
        Other: {
            OtherMetadata: {
                CurrencyMetadatas: {
                    CurrencyMetadata: [{
                        _MetadataKey: data.currencyCode || 'EUR',
                        Decimals: 2
                    }]
                }
            }
        }
    };
};

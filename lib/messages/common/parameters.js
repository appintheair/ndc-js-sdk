'use strict';
module.exports = function Parameters(data) {
    return {
        Languages: {
            LanguageCode: data.language
        },
        CurrCodes: {
            FiledInCurrency: {
                CurrCode: data.currencyCode,
            }
        }
    };
};

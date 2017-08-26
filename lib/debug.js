var Debug = require('debug');

module.exports = {
    info: new Debug('ndc:info'),
    error: new Debug('ndc:error'),
};

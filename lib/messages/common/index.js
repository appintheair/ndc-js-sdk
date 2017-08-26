/* Common data structures */
var fs = require('fs');
var common = {};
/*
read each .js file here except myself and assign
it's exported function name as common property
*/
fs.readdirSync(__dirname).forEach(function (file) {
    if (file !== 'index.js') {
        var fn = require('./' + file);
        common[fn.name] = fn;
    }
});

module.exports = common;

var path = require('path'),
    childProcess = require('child_process'),
    utils = require('node-utils');

function init(dir, hostname, callback) {
    try {
        var conf = require(path.join(dir, 'common')).conf;

        try {
            callback(null, utils.merge(conf,
                require(path.join(dir, hostname)).conf));

        } catch(err) {
            callback(null, conf);
        }

    } catch(err) {
        callback(err);
    }
}

exports.init = function(dir, hostname, callback) {
    if (arguments.length == 2) { // If hostname == callback
        var hostnameProcess = childProcess.spawn('hostname');
        hostnameProcess.stdout.on('data', function(result) {
            init(dir, utils.trim(result), hostname);
        });
        hostnameProcess.stderr.on('data', hostname);

    } else init(dir, hostname, callback);
};

var path = require('path'),
    childProcess = require('child_process'),
    util = require('util'),
    utils = require('node-utils');

function init(dir, hostname, callback) {
    var conf;
    try {
        conf = require(path.join(dir, 'common')).conf;
        
    } catch(err) {
        callback(err);
        return;
    }
    
    try {
        conf = utils.merge(conf, require(path.join(dir, hostname)).conf);
        
    } catch (err) {
        util.log('Could not find config file: ' + hostname);
    }
    
    callback(null, conf);
}

exports.init = function(dir, hostname, callback) {
    if (arguments.length == 2) { // If hostname == callback
        var hostnameProcess = childProcess.spawn('hostname');
        hostnameProcess.stdout.on('data', function(result) {
            utils.async(init, dir, utils.trim(result), hostname);
        });
        hostnameProcess.stderr.on('data', hostname);

    } else utils.async(init, dir, hostname, callback);
};

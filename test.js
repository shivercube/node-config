var assert = require('assert'),
    conf = require('./index');

function test(err, opts, b, n) {
    if (err) {
        console.log(err);

    } else {
        assert.equal(opts.a, 'a');
        assert.equal(opts.b, b);
        console.log('Finished test ' + n)
    }
}

conf.init(__dirname + '/conf', 'hostname', function(err, opts) {
    test(err, opts, 'redefined b', 1);

    conf.init(__dirname + '/conf', function(err, opts) {
        test(err, opts, 'b', 2);
    });
});

// Pause execution of the rendering server start up script such that the server
// webpack build and watch execution task finishes before the server starts.

var args = process.argv.slice(2);

var delay = args[0];

var preamble = '[sleep #' + process.pid + '] ';

if (typeof delay === 'undefined') {
	return console.error(preamble + 'delay (in ms) not specified');
}

if (delay != parseInt(delay)) {
	return console.error(preamble + 'invalid delay: "' + delay + '"');
}

console.log(preamble + 'sleeping for ' + delay + ' milliseconds');

setTimeout(function() {
	console.log(preamble + 'woken up after ' + delay + ' milliseconds')
	process.exit(0)
}, delay);

var should = require('should'),
	lib = require('../'),
	parse = lib.parse,
	format = lib.format;

describe('parser', function () {

	it('written numbers', function () {
		should(parse('zero')).be.eql({value:0, relative:false});
		should(parse('one')).be.eql({value:1, relative:false});
		should(parse('two')).be.eql({value:2, relative:false});
		should(parse('three')).be.eql({value:3, relative:false});
		should(parse('four')).be.eql({value:4, relative:false});
		should(parse('five')).be.eql({value:5, relative:false});
		should(parse('six')).be.eql({value:6, relative:false});
		should(parse('seven')).be.eql({value:7, relative:false});
		should(parse('eight')).be.eql({value:8, relative:false});
		should(parse('nine')).be.eql({value:9, relative:false});
		should(parse('ten')).be.eql({value:10, relative:false});
		should(parse('eleven')).be.eql({value:11, relative:false});
		should(parse('twelve')).be.eql({value:12, relative:false});
		should(parse('thirteen')).be.eql({value:13, relative:false});
		should(parse('fourteen')).be.eql({value:14, relative:false});
		should(parse('fifteen')).be.eql({value:15, relative:false});
		should(parse('sixteen')).be.eql({value:16, relative:false});
		should(parse('seventeen')).be.eql({value:17, relative:false});
		should(parse('eighteen')).be.eql({value:18, relative:false});
		should(parse('nineteen')).be.eql({value:19, relative:false});
		should(parse('twenty')).be.eql({value:20, relative:false});
		should(parse('twenty one')).be.eql({value:21, relative:false});
		should(parse('twenty two')).be.eql({value:22, relative:false});
		should(parse('thirty')).be.eql({value:30, relative:false});
		should(parse('fourty')).be.eql({value:40, relative:false});
		should(parse('fifty')).be.eql({value:50, relative:false});
		should(parse('sixty')).be.eql({value:60, relative:false});
		should(parse('seventy')).be.eql({value:70, relative:false});
		should(parse('eighty')).be.eql({value:80, relative:false});
		should(parse('ninety')).be.eql({value:90, relative:false});
		should(parse('ninetyone')).be.eql({value:91, relative:false});
		should(parse('hundred')).be.eql({value:100, relative:false});
		should(parse('hundred one')).be.eql({value:101, relative:false});
		should(parse('hundred twenty')).be.eql({value:120, relative:false});
		should(parse('two hundred')).be.eql({value:200, relative:false});
		should(parse('thousand')).be.eql({value:1000, relative:false});
		should(parse('one thousand')).be.eql({value:1000, relative:false});
		should(parse('two thousand')).be.eql({value:2000, relative:false});
	});

	it('numerics', function () {
		for (var c = 0; c < 1000; c++) {
			should(parse(String(c))).be.eql({value:c, relative:false});
		}
	});

	it('time', function () {
		should(parse('1ms')).be.eql({value:1, relative:false});
		should(parse('1s')).be.eql({value:1000, relative:false});
		should(parse('1 sec')).be.eql({value:1000, relative:false});
		should(parse('1 second')).be.eql({value:1000, relative:false});
		should(parse('one second')).be.eql({value:1000, relative:false});
		should(parse('two seconds')).be.eql({value:2000, relative:false});
		should(parse('two hundred seconds')).be.eql({value:200000, relative:false});
		should(parse('1m')).be.eql({value:60000, relative:false});
		should(parse('1min')).be.eql({value:60000, relative:false});
		should(parse('1 min')).be.eql({value:60000, relative:false});
		should(parse('1 minute')).be.eql({value:60000, relative:false});
		should(parse('two hundred minutes')).be.eql({value:12000000, relative:false});
		should(parse('1h')).be.eql({value:3600000, relative:false});
		should(parse('1hr')).be.eql({value:3600000, relative:false});
		should(parse('1hour')).be.eql({value:3600000, relative:false});
		should(parse('1 hour')).be.eql({value:3600000, relative:false});
		should(parse('hour')).be.eql({value:3600000, relative:false});
		should(parse('hourly')).be.eql({value:3600000, relative:false});
		should(parse('one hour')).be.eql({value:3600000, relative:false});
		should(parse('one hours')).be.eql({value:3600000, relative:false});
		should(parse('two hours')).be.eql({value:7200000, relative:false});
		should(parse('weekly')).be.eql({value:604800000, relative:false});
		should(parse('next week')).be.eql({value:604800000, relative:false});
	});

	it('prefixes', function () {
		should(parse('every 1 hour')).be.eql({value: 3600000, relative: false});
		should(parse('each hour')).be.eql({value: 3600000, relative: false});
		var now = Date.now();
		should(parse('after 1 hour')).be.eql({value: now + 3600000, relative: true});
		should(parse('once per hour')).be.eql({value: 3600000, relative: false});
		should(parse('on every hour')).be.eql({value: 3600000, relative: false});
		should(parse('at the hour')).be.eql({value: 3600000, relative: false});
		should(parse('on the hour')).be.eql({value: 3600000, relative: false});
		should(parse('exactly one hour')).be.eql({value: 3600000, relative: false});
		should(parse('next one hour')).be.eql({value: 3600000, relative: false});
		now = Date.now();
		should(parse('after one hour')).be.eql({value: now + 3600000, relative: true});
		should(parse('every hour')).be.eql({value: 3600000, relative: false});
	});

	it('relative time', function () {
		var now = Date.now ();
		should(parse('1 hour from now')).be.eql({value:now + 3600000, relative: true});
		now = Date.now ();
		should(parse('now')).be.eql({value:now, relative: true});
		now = Date.now ();
		should(parse(now + 1000)).be.eql({value:now + 1000, relative: true});
		now = Date.now ();
		should(parse('at ' + (now + 1000))).be.eql({value:now + 1000, relative: true});
		now = Date.now ();
		should(parse('on ' + (now + 1000))).be.eql({value:now + 1000, relative: true});
		now = Date.now ();
		should(parse('after ' + (now + 1000) + ' from now')).be.eql({value:now + 1000, relative: true});
	});

	it('every other', function () {
		should(parse('every other hour')).be.eql({value: 7200000, relative: false});
		should(parse('every other day')).be.eql({value: 172800000, relative: false});
		should(parse('every other second')).be.eql({value: 2000, relative: false});
		should(parse('every other minute')).be.eql({value: 120000, relative: false});
		should(parse('every other week')).be.eql({value: 1209600000, relative: false});
		should(parse('every other month')).be.eql({value: 5260000000, relative: false});
		should(parse('every other quarter')).be.eql({value: 15780000000, relative: false});
		should(parse('every other year')).be.eql({value: 63120000000, relative: false});
		should(parse('every other 2 week')).be.eql({value: 2419200000, relative: false});
		should(parse('every other 2 weeks')).be.eql({value: 2419200000, relative: false});
		should(parse('every other 3 days')).be.eql({value: 518400000, relative: false});
	});

	it('format', function () {
		var now = Date.now ();
		var result = parse('1 hour from now');
		should(format(result)).be.equal('in an hour');

		result = parse('now');
		should(format(result)).be.equal('a few seconds ago');

		result = parse('1 hour');
		should(format(result)).be.equal('every hour');

		result = parse('annually');
		should(format(result)).be.equal('every year');

		result = parse('monthly');
		should(format(result)).be.equal('every month');

		result = parse('weekly');
		should(format(result)).be.equal('every week');

		result = parse('1 minute');
		should(format(result)).be.equal('every minute');

		result = parse('1 second');
		should(format(result)).be.equal('every second');

		result = parse('4 second');
		should(format(result)).be.equal('every 4 seconds');

		result = parse('every 4 seconds');
		should(format(result)).be.equal('every 4 seconds');

		result = parse('1ms');
		should(format(result)).be.equal('every ms');

		result = parse('every 2 weeks');
		should(format(result)).be.equal('every 2 weeks');

		result = parse('every 93 hours');
		should(format(result)).be.equal('every 3 days');

		result = parse('every 48 hours');
		should(format(result)).be.equal('every 2 days');

		result = parse('every 1000ms');
		should(format(result)).be.equal('every second');

		result = parse('every other day');
		should(format(result)).be.equal('every 2 days');

		result = parse('each day');
		should(format(result)).be.equal('every day');

		result = parse('every 2 days');
		should(format(result)).be.equal('every 2 days');

		result = parse('every other 2 days');
		should(format(result)).be.equal('every 4 days');

		should(format('every day')).be.equal('every day');
	});

});

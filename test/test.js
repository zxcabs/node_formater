/*
 * test
 */
var format = require('../lib/formater.js').format,
	obj = { 
		foo: 'Foo',
		bar: { baz: 'Baz' },
		ffoo: function () { return 'foo()'; },
		fhoo: function () { return { a: 1 } }
	};


describe('format', function () {
	describe('#0 lvl', function () {
		it('should return "Get Foo"', function () {
			format(obj, 'Get :foo').should.equal('Get Foo');
		});
	});
	
	describe('#0 lvl stringify', function () {
		it('should return "Bar: { "baz": "Bar" }"', function () {
			format(obj, 'Bar: :bar').should.equal('Bar: { "baz": "Bar" }');
		});
	});
	
	describe('#1 lvl', function () {
		it('should return "Baz = Baz"', function () {
			format(obj, 'Baz = :bar:baz').should.equal('Baz = Baz');
		});
	});
	
	describe('#function', function () {
		it('should return "foo()"', function () {
			format(obj, ':ffoo()').should.equal('foo()');
		});
	});
	
	describe('#function return object', function () {
		it('should return "fhoo(): 1"', function () {
			format(obj, 'fhoo: :fhoo().a').should.equal('fhoo: 1');
		});
	});
});
/*
 * test
 */
var format = require('../lib/formater.js'),
	tools = require('../lib/tools.js'),
	obj = { 
		foo: 'Foo',
		bar: { baz: 'Baz' },
		ffoo: function () { return 'foo()'; },
		fhoo: function () { return { a: 1 } }
	};

var parseParams = tools.params;
	
describe('tools', function () {
	describe('#params', function () {
		it('should return empty array', function () {
			parseParams('Some string').should.eql([]);
		});
		
		it('should return empty array', function () {
			parseParams('Some: string').should.eql([]);
		});
		
		it('should return empty array', function () {
			parseParams('Some ::: string').should.eql([]);
		});
		
		it('should return empty array', function () {
			parseParams('Some string:').should.eql([]);
		});
	});
});
	
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
	
	describe('#function', function () {
		it('should return "fhoo(): 1"', function () {
			format(obj, 'fhoo: :fhoo():a').should.equal('fhoo: 1');
		});
	});
	
	describe('#function', function () {
		it('should call once', function () {
			var count = 0,
				obj = {
					func: function () {
						count += 1;
						return {
								a: 1,
								b: 2
							};
					}
				};
				
			format(obj, 'get: :func():a and :func():b').should.equal('get: 1 and 2');
			count.should.eql(1);
		});
	});
});
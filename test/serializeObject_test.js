(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery.serializeObject', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture');
    }
  });

  test('can namespace string', function(){
    expect(1);
    deepEqual($.serializeObject.namespaceString('name.space.space').obj, { name: { space: { space: {} } } });
  });

  test('can augment an existing object with namespaces', function(){
    var obj = {
      name: {
        space: {},
        other: 'hello'
      }
    },
    objExpected = {
      name: {
        space: {
          space: {}
        },
        other: 'hello'
      }
    };
    deepEqual($.serializeObject.namespaceString('name.space.space', obj).obj, objExpected);
  });

  test('can augment an existing object with namespaces and array', function(){
    var obj = {
      name: {
        space: {
          space: []
        },
        other: 'hello'
      }
    },
    objExpected = {
      name: {
        space: {
          space: []
        },
        other: 'hello'
      }
    };
    deepEqual($.serializeObject.namespaceString('name.space.space', obj).obj, objExpected);
  });

  test('can augment an existing object with namespaces inserting in to array', function(){
    var obj = {
      name: {
        space: [
          { space: {} }
        ],
        other: 'hello'
      }
    },
    objExpected = {
      name: {
        space: [
          { space: {} },
          { space: {} }
        ],
        other: 'hello'
      }
    };
    deepEqual($.serializeObject.namespaceString('name.space[1].space', obj).obj, objExpected);
  });

  test('should serialize fixture form', function(){
    var objExpected = {
      name: {
        space: {
          foo: 'foo',
          bar: 'bar'
        },
        arr: [
          { space: 'foo' },
          { space: 'foo' },
          { space: 'foo' },
          { space: 'foo' },
          { space: 'foo' }
        ]
      }
    };
    $form = this.elems.find('form');
    equal($form.length, 1);
    equal($form[0].tagName, 'FORM');
    deepEqual($form.serializeObject(), objExpected);
  });
  
  test('issue#1: handle multiple digit indices', function(){
	  var objExpected = {
		cat: [
		   {name:'cat1'},
		   undefined,
		   undefined,
		   undefined,
		   undefined,
		   undefined,
		   undefined,
		   undefined,
		   undefined,
		   undefined,
		   {name:'cat2'}
		]
	  };
	var input = [
         { name:"cat[0].name", value:"cat1" },
         { name:"cat[10].name", value:"cat2" }
       ];
	var out = {};
  	$.serializeObject.serializeObjectInner(input, out);
  	
  	deepEqual(out, objExpected);
  });
  
  

}(jQuery));

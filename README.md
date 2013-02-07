# Serialize Form to Object

Serialize Form to Object including name.space.names

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/davetayls/jquery.serializeObject/master/dist/serializeObject.min.js
[max]: https://raw.github.com/davetayls/jquery.serializeObject/master/dist/serializeObject.js

In your web page:

```html
<form ...>
  <input type="text" name="name.space.foo" value="foo" />
  <input type="text" name="name.space.bar" value="bar" />
  <input type="text" name="name.arr[0].space" value="foo" />
  <input type="text" name="name.arr[1].space" value="foo" />
  <input type="text" name="name.arr[2].space" value="foo" />
  <input type="text" name="name.arr[3].space" value="foo" />
  <input type="text" name="name.arr[4].space" value="foo" />
</form>
<script src="jquery.js"></script>
<script src="dist/serializeObject.min.js"></script>
<script>
jQuery(function($) {
  $('form').serializeObject();
  // -> {
  //   name: {
  //     space: {
  //       foo: 'foo',
  //       bar: 'bar'
  //     },
  //     arr: [
  //       { space: 'foo' },
  //       { space: 'foo' },
  //       { space: 'foo' },
  //       { space: 'foo' },
  //       { space: 'foo' }
  //     ]
  //   }
  // }
});
</script>
```

## Release History

### 0.1.0 Initial Release

# msgpack for the browser

[![Build Status](https://secure.travis-ci.org/creationix/msgpack-js-browser.png)](http://travis-ci.org/creationix/msgpack-js-browser)

A handwritten msgpack encoder and decoder for Browsers

This is a browser port of https://github.com/creationix/msgpack-js

The original format can be found at <http://wiki.msgpack.org/display/MSGPACK/Format+specification>

## Extension

I've extended the format a little to allow for encoding and decoding of `undefined`.

This required a new type code that is marked as "ext format".
This change means that using these new types will render your serialized data
incompatible with other messagepack implementations that don't have the same
extension.

I've added a type for `undefined` that works just like the `null` type.

    undefined  11010100  0xd4

## Usage

``` javascript
require(['msgpack'], function (msgpack) {

  var initial = {Hello: "World"};
  var encoded = msgpack.encode(initial);
  var decoded = msgpack.decode(encoded);

});
```


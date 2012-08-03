# msgpack for the browser

[![Build Status](https://secure.travis-ci.org/creationix/msgpack-js-browser.png)](http://travis-ci.org/creationix/msgpack-js-browser)

A handwritten msgpack encoder and decoder for Browsers

This is a browser port of https://github.com/creationix/msgpack-js

The original format can be found at <http://wiki.msgpack.org/display/MSGPACK/Format+specification>

## Extension

I've extended the format a little to allow for encoding and decoding of `undefined` and `ArrayBuffer` instances.

This required three new type codes that were previously marked as "reserved".
This change means that using these new types will render your serialized data
incompatible with other messagepack implementations that don't have the same
extension.

There are two new types for storing browser `ArrayBuffer` instances. These work just 
like "raw 16" and "raw 32" except they are binary buffers instead of strings.

    buffer 16  11011000  0xd8
    buffer 32  11011001  0xd9

Also I've added a type for `undefined` that works just like the `null` type.

    undefined  11000100  0xc4

## Usage

``` javascript
require(['msgpack'], function (msgpack) {

  var initial = {Hello: "World"};
  var encoded = msgpack.encode(initial);
  var decoded = msgpack.decode(encoded);

});
```


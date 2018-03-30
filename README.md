# bencode [![Build Status](https://travis-ci.com/Lapixx/bencode.svg?token=vxmw15dfW4TqsU8zCCkf&branch=master)](https://travis-ci.com/Lapixx/bencode)
A small JavaScript library for encoding and decoding data following the Bencode specification.

## Usage

```js
const { encode, decode } = require('bencode');

encode({ foo: 42, hello: 'World!' });
// => d3:fooi42e5:hello6:World!e

decode('d3:fooi42e5:hello6:World!e');
// => { foo: 42, hello: 'World!' }
```

const test = require('tape')
const { encode, decode } = require('./index.js')

test('Exports both encode and decode functions', t => {
  t.equal(typeof encode, 'function', 'Encode is a function')
  t.equal(typeof decode, 'function', 'Decode is a function')
  t.end()
})

test('Encode and decode are inverses of each other', t => {
  const obj = { hello: 42, world: ['foo', 0, 'bar'] }
  t.deepEqual(decode(encode(obj)), obj, 'Returns original data (decode ∘ encode)')
  const str = 'd5:helloi42e5:worldl3:fooi0e3:baree'
  t.equal(encode(decode(str)), str, 'Returns original string (encode ∘ decode)')
  t.end()
})

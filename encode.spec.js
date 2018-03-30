const test = require('tape')
const encode = require('./encode.js')

test('Encodes integers correctly', t => {
  t.equal(encode(42), 'i42e', 'Positive number')
  t.equal(encode(0), 'i0e', 'Zero')
  t.equal(encode(-42), 'i-42e', 'Negative number')
  t.end()
})

test('Encodes strings correctly', t => {
  t.equal(encode(''), '0:', 'Empty string')
  t.equal(encode('hello'), '5:hello', 'Normal string')
  t.equal(encode('42'), '2:42', 'Number as string')
  t.end()
})

test('Encodes lists correctly', t => {
  t.equal(encode([]), 'le', 'Empty array')
  t.equal(encode([1, 2, 3]), 'li1ei2ei3ee', 'Array of numbers')
  t.equal(encode(['foo', 'bar']), 'l3:foo3:bare', 'Array of strings')
  t.equal(encode([[1, 2], [3, 4]]), 'lli1ei2eeli3ei4eee', 'Array of arrays')
  t.end()
})

test('Encodes dictionaries correctly', t => {
  t.equal(encode({}), 'de', 'Empty object')
  t.equal(encode({ hello: 1, world: 2 }), 'd5:helloi1e5:worldi2ee', 'Object with numbers')
  t.equal(encode({ hello: 'foo', world: 'bar' }), 'd5:hello3:foo5:world3:bare', 'Object with strings')
  t.equal(encode({ hello: [1, 2], world: [3, 4]}), 'd5:helloli1ei2ee5:worldli3ei4eee', 'Object with arrays')
  t.end()
})

test('Throws error on undefined', t => {
  t.throws(() => encode(undefined), 'Undefined as primitive')
  t.throws(() => encode([undefined]), 'Undefined in array')
  t.throws(() => encode({ foo: undefined }), 'Undefined in object')
  t.end()
})

test('Throws error on null', t => {
  t.throws(() => encode(null), 'Null as literal')
  t.throws(() => encode([null]), 'Null in array')
  t.throws(() => encode({ foo: null }), 'Null in object')
  t.end()
})

test('Throws error on booleans', t => {
  t.throws(() => encode(true), 'True as literal')
  t.throws(() => encode(false), 'False as literal')
  t.throws(() => encode([true]), 'True in array')
  t.throws(() => encode([false]), 'False in array')
  t.throws(() => encode({ foo: true }), 'True in object')
  t.throws(() => encode({ foo: false }), 'False in object')
  t.end()
})

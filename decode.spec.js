const test = require('tape')
const decode = require('./decode.js')

test('Decodes integers correctly', t => {
  t.equal(decode('i42e'), 42, 'Positive number')
  t.equal(decode('i0e'), 0, 'Zero')
  t.equal(decode('i-42e'), -42, 'Negative number')
  t.end()
})

test('Decodes strings correctly', t => {
  t.equal(decode('0:'), '', 'Empty string')
  t.equal(decode('5:hello'), 'hello', 'Normal string')
  t.equal(decode('2:42'), '42', 'Number as string')
  t.end()
})

test('Decodes lists correctly', t => {
  t.deepEqual(decode('le'), [], 'Empty array')
  t.deepEqual(decode('li1ei2ei3ee'), [1, 2, 3], 'Array of numbers')
  t.deepEqual(decode('l3:foo3:bare'), ['foo', 'bar'], 'Array of strings')
  t.deepEqual(decode('lli1ei2eeli3ei4eee'), [[1, 2], [3, 4]], 'Array of arrays')
  t.end()
})

test('Decodes dictionaries correctly', t => {
  t.deepEqual(decode('de'), {}, 'Empty object')
  t.deepEqual(decode('d5:helloi1e5:worldi2ee'), { hello: 1, world: 2 }, 'Object with numbers')
  t.deepEqual(decode('d5:hello3:foo5:world3:bare'), { hello: 'foo', world: 'bar' }, 'Object with strings')
  t.deepEqual(decode('d5:helloli1ei2ee5:worldli3ei4eee'), { hello: [1, 2], world: [3, 4]}, 'Object with arrays')
  t.end()
})

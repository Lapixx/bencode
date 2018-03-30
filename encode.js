const encodeInt = num => `i${num}e`

const encodeString = str => `${str.length}:${str}`

const encodeListEntries = arr => arr.map(encode).join('')
const encodeList = arr => `l${encodeListEntries(arr)}e`

const encodeDictEntries = obj => Object.keys(obj)
  .map(key => `${encode(key)}${encode(obj[key])}`)
  .join('')
const encodeDict = obj => `d${encodeDictEntries(obj)}e`

const encode = data => {
  if (typeof data === 'number')
    return encodeInt(data)
  if (typeof data === 'string')
    return encodeString(data)
  if (data instanceof Array)
    return encodeList(data)
  if (data instanceof Object)
    return encodeDict(data)
  throw new Error(`Unable to encode ${data}`)
}

module.exports = encode

const encodeInt = num => `i${num}e`

const encodeString = str => `${str.length}:${str}`

const encodeList = arr => `l${arr.map(encode).join('')}e`

const encodeDict = obj => `d${Object.keys(obj).map(key => `${encode(key)}${encode(obj[key])}`).join('')}e`

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

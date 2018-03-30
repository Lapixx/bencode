const decodeInt = str => {
  const len = str.indexOf('e')
  const data = parseInt(str.substring(1, len), 10)
  return [data, str.substring(len + 1)]
}

const decodeString = str => {
  const sep = str.indexOf(':')
  const len = parseInt(str.substring(0, sep), 10)
  const rest = str.substring(sep + 1)
  const data = rest.substring(0, len)
  return [data, rest.substring(len)]
}

const decodeList = str => {
  let rest = str.substring(1)
  const list = []
  while (rest[0] !== 'e') {
    const [data, newRest] = decode(rest)
    rest = newRest
    list.push(data)
  }
  return [list, rest.substring(1)]
}

const decodeDict = str => {
  let rest = str.substring(1)
  const dict = {}
  while (rest[0] !== 'e') {
    const [dataKey, restAfterKey] = decode(rest)
    const [dataVal, restAfterVal] = decode(restAfterKey)
    rest = restAfterVal
    dict[dataKey] = dataVal
  }
  return [dict, rest.substring(1)]
}

const decode = str => {
  const head = str[0]
  if (head === 'i')
    return decodeInt(str)
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(head))
    return decodeString(str)
  if (head === 'l')
    return decodeList(str)
  if (head === 'd')
    return decodeDict(str)
}

const _decode = str => {
  const data = decode(str)
  return data && data[0]
}

module.exports = _decode

export const flattenObject = (
  obj: Record<string, unknown>,
  delimiter = '.',
  prefix = '',
) =>
  Object.keys(obj).reduce(
    (acc, k) => {
      const pre = prefix.length ? `${prefix}${delimiter}` : ''
      if (
        typeof obj[k] === 'object' &&
        obj[k] !== null &&
        Object.keys(obj[k] as Record<string, unknown>).length > 0
      )
        Object.assign(
          acc,
          flattenObject(obj[k] as Record<string, unknown>, delimiter, pre + k),
        )
      else acc[pre + k] = obj[k]
      return acc
    },
    {} as Record<string, unknown>,
  )

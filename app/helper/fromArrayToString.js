const fromArrayToString = (array, joinParam = '&ids=') => Array.isArray(array) ? array.join(joinParam) : `&ids=${array}`
export default fromArrayToString

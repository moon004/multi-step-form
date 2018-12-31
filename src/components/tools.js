export const dupChecker = (array, itemToCheck) => {
  const duplicated = array.some(function(elem) {
    return elem === this;
  }, itemToCheck);
  if (duplicated) {
    return array
  }
  array.push(itemToCheck)
  return array
}
export const dupCheckerBool = (array, itemToCheck) => {
  const duplicated = array.some(function(elem) {
    return elem.restaurant === this;
  }, itemToCheck);
  if (duplicated) {
    return true
  }
  return false
}

export const nonEmptyCounter = (arr) => {
  let counter = 0;
  for (let i in arr) {
    if (arr[i] !== ''){
      counter++
    }
  }
  return counter
}
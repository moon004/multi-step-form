export const dupChecker = (array, itemToCheck) => {
  const duplicated = array.some(function(elem) {
    console.log('elem and itemToCheck', array, this)
    return elem === this;
  }, itemToCheck);
  if (duplicated) {
    return array
  }
  array.push(itemToCheck)
  return array
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
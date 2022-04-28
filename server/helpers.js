const logger = fn => {
  return function (x) {
    // console.log(fn(x))
    return fn(x)
  }
}

const getObjKeysAsRow = logger((obj) => Object.keys(obj).join(','))
const getObjKeysAsQuestionMarks = logger((obj) => Object.keys(obj).map(key => '?').join(','))

module.exports = {
  getObjKeysAsRow,
  getObjKeysAsQuestionMarks
}
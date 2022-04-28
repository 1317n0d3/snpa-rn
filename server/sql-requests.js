const db = require("./db");

const selectUserByColumn = async (column) => {
  const sql = `SELECT * FROM users WHERE ${Object.keys(column)[0]} = ?`

  return new Promise(resolve => {
    db.all(sql, Object.values(column)[0], (err, data) => {
      if (err) throw err
      resolve(data[0])
    })
  })
}

module.exports = {
  selectUserByColumn
}
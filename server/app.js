const dotenv = require("dotenv").config();
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require("./db")
const cors = require('cors');

const {getObjKeysAsRow, getObjKeysAsQuestionMarks} = require('./helpers')
const {selectUserByColumn} = require("./sql-requests");
const verifyToken = require("./middleware/verifyToken");

const app = express();

app.use(cors())
app.use(express.json());

const baseUrl = "/api";

// Logic goes here

app.post(baseUrl + '/register', async (req, res) => {
// Our register logic starts here
  try {
    // Get user input
    let {
      first_name,
      last_name,
      login,
      password,
      date_of_birth,
      photo_uri
    } = req.body;

    // Validate user input
    if (!Object.values(req.body).every(value => !!value)) {
      res.status(400).send("All inputs are required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await selectUserByColumn({login})

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    req.body.password = password = encryptedPassword //TODO

    const sql = `INSERT INTO users ( ${getObjKeysAsRow(req.body)} ) VALUES (${getObjKeysAsQuestionMarks(req.body)})`
    const params = [...Object.values(req.body)]
    const newUserID = await new Promise(resolve => {
      db.run(sql, params, function (err) {
        if (err) throw err
        resolve(this.lastID)
      })
    })

    // Create token
    const token = jwt.sign(
      {user_id: newUserID, login},
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    const user = await selectUserByColumn({id: newUserID})
    user.token = token;

    // return new user
    res.status(201).json(user);

  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
})


app.post(baseUrl + "/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const {login, password} = req.body;

    // Validate user input
    if (!(login && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await selectUserByColumn({login});

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        {user_id: user.id, login},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.post(baseUrl + '/check-auth', verifyToken, (req, res) => {
  res.status(200).json(true)
})

app.patch(baseUrl + '/update/:id', (async (req, res) => {
  const {password, photo_uri} = req.body
  const id = req.params.id

  const encryptedPassword = await bcrypt.hash(password, 10);

  const sql = ` 
    UPDATE users 
    set password = COALESCE(?, password),
        photo_uri = COALESCE(?, photo_uri)  
    WHERE id = ?  
    `
  const params = [encryptedPassword, photo_uri, id]
  db.all(sql, params, (err, data) => {
    if (err) throw new Error(err)
  })
}))

app.use((req, res) => {
  res.status(404);
  res.json({message: 'Page do not exists'})
});


module.exports = app;
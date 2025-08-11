const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

const SECRET_KEY = 'ramSuperSecretKey123';
const app = express();
app.use(express.json());
app.use(cors());

const myDBPath = path.join(__dirname, 'goodreads.db');
let db = null;

const initializeDB = async () => {
  db = await open({ filename: myDBPath, driver: sqlite3.Database });
};
initializeDB();

app.post('/register', async (req, res) => {
  try {
    const data = await db.run(
      `INSERT INTO LOGIN (EMAIL, PASSWORD) VALUES ('${req.body.email}', '${req.body.password}' )`
    );
    res.send('Register Successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Registration Failed');
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await db.get(
      `SELECT * FROM LOGIN WHERE EMAIL = '${req.body.email}' AND PASSWORD = '${req.body.password}'`
    );
    if (user) {
      const token = jwt.sign({ email: user.EMAIL }, SECRET_KEY, {
        expiresIn: '1h',
      });
      res.send({ user, token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Login Failed');
  }
});

app.get('/showData', async (req, res) => {
  const data = await db.all(`SELECT * FROM LOGIN`);
  res.send(data);
});

app.listen(3000, () => {
  console.log('server started at 3000');
});

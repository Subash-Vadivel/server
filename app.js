require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["https://quickquiz-bc991.web.app", "https://quickquiz-bc991.firebaseapp.com", "http://localhost:3000", "https://quickquiz.rido.live"],
  })
);
require('./db');

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

const AuthRouter = require('./routes/authRouter');

app.use('/accounts', AuthRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started at http://127.0.0.1:${PORT}`);
});

// example route to access the cookie
app.get('/', (req, res) => {
    const token = req.cookies.jwt_token;
    console.log('Token:', token);
    res.send('Hello World!');
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // Import body-parser

const jwt = require('jsonwebtoken');

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["https://quickquiz-bc991.web.app", "https://quickquiz-bc991.firebaseapp.com", "http://localhost:3000", "https://quickquiz.rido.live"],
  })
);
require('./db');

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ extended: true, limit: '500kb' }));
app.use(cookieParser());

const AuthRouter = require('./routes/authRouter');
const Transaction=require('./routes/transaction');
const Certificate=require('./routes/certificateRoute');

app.use('/accounts', AuthRouter);

app.use('/transaction', Transaction);

app.use('/certificate',Certificate)

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
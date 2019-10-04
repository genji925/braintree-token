import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
const app = express();

var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BT_MERCHANTID,
  publicKey: process.env.BT_PUBLICKEY,
  privateKey: process.env.BT_PRIVATEKEY,
});

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send({client_token: response.clientToken});
  });
});

// Start

app.listen(process.env.PORT, () =>
  console.log(`Token app listening on port ${process.env.PORT}!`),
);

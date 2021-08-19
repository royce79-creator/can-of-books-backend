'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const mongoose = require('mongoose');
const BookModel = require('./books')

const app = express();
app.use(cors());

let client = jwksClient({
  // EXCEPTION!  jwksUri comes from your single page application -> settings -> advanced settings -> endpoint -> the jwks one
  jwksUri: 'https://dev-royce79-creator.us.auth0.com/.well-known/jwks.json'
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('Hello people');
});

// TODO: 
// STEP 1: get the jwt from the headers
app.get('/test-login', (request, response) => {
  // grab the token sent by the front end
  const token = request.headers.authorization.split(' ')[1];
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken

  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end
  jwt.verify(token, getKey, {}, function (err, user) {
    if (err) {
      response.status(500).send('invlaid token');
    } else {
      BookModel.find((err, ))
    }
    response.send(user);
  });
});

app.get('/books', (request, response) => {

});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

app.listen(3001, () => {
  console.log('Server up on 3001');

  async function addBook(obj) {
    //CREATE R U D
    //{title: "", author: ""}
    let newBook = new BookModel(obj);
    return await newBook.save();
  }

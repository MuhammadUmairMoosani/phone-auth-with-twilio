const express = require('express');
const app = express();
const Client = require('authy-client').Client;
const authy = new Client({key: "{{key}}"});
const enums = require('authy-client').enums;
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.post('/sendMsg',(req, res) => {
    authy.startPhoneVerification({ countryCode: '92', locale: 'en', phone: req.body.phone, via: enums.verificationVia.SMS }, function(error, response) {
        if(error) res.send(error.message)
        res.send(response)
      });
})

app.post('/verifycode',(req, res) => {
    authy.verifyPhone({ countryCode: '92', phone: req.body.phone, token: req.body.token }, function(error, response) {
        if(error) res.send(error.message)
            res.send(response)
      });
})

app.listen(4000,() => {
    console.log("Server is runing 4000")
})
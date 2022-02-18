//require dependencies
import * as coin from "../a02-nymanka/modules/coin.mjs"
import express from 'express';
import Yargs from 'yargs';

const app = express();
const argv = Yargs(process.argv.slice(2)).argv;

//define port as default or from cli
const port = (argv.port == undefined) ? 5000 : argv.port;



// Require Express.js
const express = require('express')
const app = express()

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });


//random coin flip endpoint
app.get('/app/flip', (req, res) => {
    res.contentType('text/json');
    res.status(200).json({ 'flip' : coin.coinFlip()});
});

app.get('/app/flips/:number', (req, res) => {
    res.contentType('text/json');
    const flips = coin.coinFlips(req.params.number);
    const count = coin.countFlips(flips);
    res.status(200).json({'Flips': flips,'info': count});
});

app.get('/app/flip/call/heads', (req, res) => {
    res.contentType('text/json');
    res.status(200).json(coin.coinFlip('heads'));
});

app.get('/app/flip/call/tails', (req, res) => {
    res.contentType('text/json');
    res.status(200).json(coin.coinFlip('tails'));
});


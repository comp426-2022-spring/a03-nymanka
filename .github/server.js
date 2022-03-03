// Require Express.js
const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))

args['port']

const call = args.call
const port = args.port || process.env.PORT || 5000


// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});


// Define check endpoint
app.get('/app/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;

    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage);
});


function coinFlip() {
    return (Math.random() > 0.5 ? "heads" : "tails");
  }


app.get('/app/flip/', (req, res) => {
    res.send({ flip: coinFlip() });
});


function coinFlips(flips) {
    const coin = [];
  
    for(let i = 0; i < flips; i++){
      Math.random() > 0.5 ? coin.push("heads") : coin.push("tails");
    }
  
    const output = { raw: [], summary: "" };
    output.raw = coin;
    output.summary = countFlips(coin);
    return output;
  }

function countFlips(array) {
    var heads = 0;
    var tails = 0;
    for(let i = 0; i < array.length; i++){
      if(array[i] == 'heads'){
        heads++;
      }
      else{
        tails++;
      }
    }
    const count = new Map();
  
    count.set("tails", tails);
    count.set("heads", heads);
    
    return count;
  
  }


app.get('/app/flips/:number', (req, res) => {
    res.send(coinFlips(req.params.number));
});


function flipACoin(call) {
    if (call != "heads" & call != "tails" | call == null) {
      console.log("Error: no input.")
      console.log("Usage: node guess-flip --call=[heads|tails]")
    }else{
      const flip = coinFlip();
      var result = "lose";
      if(call == flip){
        result = "win";
    }
    const count = new Map();
  
    count.set("call", call);
    count.set("flip", flip);
    count.set("result", result);
   
    return count;
  
    }
}


app.get('/app/flip/call/heads', (req, res) => {
    res.send(flipACoin('heads'));
});


app.get('/app/flip/call/tails', (req, res) => {
    res.send(flipACoin('tails'));
});


// Default response for any other request
app.use(function (req, res) {
    res.status(404).send('404 NOT FOUND')
});

  
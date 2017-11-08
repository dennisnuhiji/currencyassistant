require('dotenv').config();
const ratesLink = process.env.RATES;
const currenciesLink = process.env.CURRENCIES;
let restify = require('restify');
const server = restify.createServer({});
const request = require('request');
let moment = require('moment');
let currencies;
let rates;
function getRates(req, res) {
  if (!rates) {
    console.log("Fetching rates first time");
    fetchRates().then((body) => {
      rates = {};
      rates['timestamp'] = moment.now();
      rates['data'] = body;
      res.send(200, body);
    })
  }
  else {
    let now = moment(new Date());
    let minutes = moment.duration(now.diff(rates.timestamp)).minutes();
    console.log("Rates last fetched before " + minutes+" minutes");
    if (minutes > 30) {
      console.log("Requesting new rates");
      fetchRates().then((body) => {
        rates['timestamp'] = moment.now();
        rates['data'] = body;
        res.send(200, rates.data);
      })
    } else {
      console.log("Returning cached rates");
      res.send(200, rates.data);
    }
  }
}
function fetchRates() {
  return new Promise((resolve, reject) => {
    request(ratesLink, (error, response, body) => {
      resolve(body);
    })
  })
}
function getCurrencies(req, res) {
  if (!currencies) {
    request(currenciesLink, (error, response, body) => {
      currencies = body;
      res.send(200, body);
    })
  }
  else {
    res.send(200, currencies);
  }
}

server.use(
  function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.get('/getCurrencies', [(req, res) => getCurrencies(req, res)]);
server.get('/getRates', [(req, res) => getRates(req, res)]);
server.on("uncaughtException", (req, res, route, err) => console.log("uncaughtException", err.stack));
server.listen(1234, () => console.log("The magic is happening on port 1234"));

//
// Reactive Extensions
// Websockets!
//

import { webSocket } from "rxjs/webSocket";
import { interval, from } from "rxjs";
import { map, mergeAll, buffer } from "rxjs/operators";

if (!apiKey) {
  throw "No global apiKey defined";
}

//
// create an active observable from our websocket
// start subscribing to our chosen stocks
//
const subject = webSocket(`wss://ws.finnhub.io/?token=${apiKey}`);

// using multiplex to produce multiple observables from a single websocket connection
const btc = subject.multiplex(
  // what to do when subscribing
  () => ({ type: "subscribe", symbol: "BINANCE:BTCUSDT" }),
  // what to do when unsubscribing
  () => ({ type: "unsubscribe", symbol: "BINANCE:BTCUSDT" }),
  // identify messages for this observable
  message => message.type === "trade" && message.data.some(d => d.s === "BINANCE:BTCUSDT")
);

// log all our messages
const allPricesElement = document.getElementById("log");

// all latest BTC trades, flattened to one trade per emit
const individualBtcTrades = btc.pipe(map(x => from(x.data))).pipe(mergeAll())

// time interval for buffering
const tick = interval(2000);

// buffer all trades over the last 2 seconds
individualBtcTrades.pipe(buffer(tick))
  .subscribe(trades => {
    const prices = trades.map(t => t.p);
    allPricesElement.innerText = prices.join("\r\n");
    rollingAverage.innerText = prices.reduce((a, b) => a + b, 0) / prices.length;
  });


// 
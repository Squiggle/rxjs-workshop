//
// Reactive Extensions
// Pipe
//

// we saw previously that arrays can be manipulated
// using various functions

// Reactive Extensions provides many similar functions for
// manipulating Observables

import { from } from "rxjs";
const numbers = from([1, 2, 3, 4, 5]);

let total = 0;

// let's try to filter our observable
import { filter } from "rxjs/operators";
numbers
    .pipe(filter(x => x < 3))
    .subscribe(n => total += n);

// our total is only 1 + 2
total;


// let's try to map an observable
import { map } from "rxjs/operators";
const days = from(["Monday", "Tuesday", "Wednesday"]);
const truncatedDays = [];
days
    .pipe(map(d => d.substr(0, 3)))
    .subscribe(day => truncatedDays.push(day));
truncatedDays;

// let's do both with a real-world example
// a heart rate monitor that sends an alert when it
// spikes above 130bpm twice
import { skip } from "rxjs/operators";
const records = from([70, 74, 74, 86, 105, 120, 131, 112, 101, 119, 135, 100]);
records
    .pipe(filter(heartrate => heartrate > 130))
    .pipe(skip(1)) // ignore the first match
    .subscribe((heartrate) => console.log(`Heart rate exceeded limit at ${heartrate}bpm`));
// the console output will log the 2nd value - 135bpm

// here we have seen how an observable's pipe method
// can be used to create complex method chains
// to manipulate the output of an observable over time

// exercise: using "scan" operator,
// keep a record of the latest 3 values and provide a warning when
// the heartrate is above 110bpm for three consecutive records
// hint: you can fetch the last 3 values of an array using .slice(-3)
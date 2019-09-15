//
// Reactive Extensions
// Observable
//

// we have seen how a subject can be subscribed to

// a subject just one type of Observable which controls
// the emission of data over time

// lets take a look at observables that don't control
// their own data

const numbers = [1, 2, 3, 4, 5];

// using "from" to create a obserable of an array
import { from } from 'rxjs';
const numbersObservable = from(numbers);

let total = 0;
numbersObservable.subscribe(n => total += n);
total;

// what happens when we subscribe again?
let total2 = 0;
numbersObservable.subscribe(n => total2 += n);
total2;

// it receives the same data all over again?
// this is because the source of our data is constant
// and held in memory

// what happens when we modify the source?
// let's remove the last entry in the numbers array
numbers.pop();
numbers;

// and create a new subscription
let total3 = 0;
numbersObservable.subscribe(n => total3 += n);
total3;


// we have seen here that observables that
// do not generate their own data just provide
// a conduit from the source to the subscriber

// it is the act of subscribing to an observable that
// renders it useful
//
// Reactive Extensions
// Subject
//

// like before, let's start with a subject
// but this one is supplied by Reactive Extensions
import { Subject, BehaviorSubject } from "rxjs";

const numbers = new Subject();

// subscribing to the subject
let total = 0;
numbers.subscribe(n => total += n);

// doesn't do anything yet
total;

// but when we tell the subject to send data...
[1, 2, 3, 4, 5].forEach(n => numbers.next(n));
// (and we say the subject is completed...)
numbers.complete();

// our subscribers are notified
total;

// what happens if we subscribe again?
let total2 = 0;
numbers.subscribe(n => total2 += n);
total2;
// the subject is no longer providing any more data


// Reactive Extensions provides different variants of subjects

// e.g. BehaviourSubject
// must always have a value, and will
// provide its latest value whenever it is subscribed to

const names = new BehaviorSubject("Amy");

const namesA = [];
names.subscribe(n => namesA.push(n));
// already contains the first value
namesA;

names.next("Barry");

// now with both
namesA;

// now let's subscribe a 2nd time
const namesB = [];
names.subscribe(n => namesB.push(n));

// our new subscriber has a value 
namesB;

// when is BehaviourSubject useful?
// "What time is it?" - will always provide the latest time
// to any new subscribers, even before the next second passes


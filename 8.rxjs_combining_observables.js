//
// Reactive Extensions
// Combining observables
//

import { fromEvent, interval } from "rxjs";
import { filter, scan, map } from "rxjs/operators";

// observable 1: an event stream from the toggle checkbox
const active = 
    fromEvent(document.getElementById("toggle_timer"), "change")
    // convert the events into a simple boolean
    .pipe(map(changeEvent => changeEvent.target.checked));

// observable 2: interval emits sequential numbers every second
const ticker = interval(1000)
    // we don't care about the sequential numbers
    // we just want an accumulator every second
    .pipe(map(() => 1));


// we want to combine the latest values from each of the observables
import { combineLatest } from "rxjs";
combineLatest(active, ticker)
    // only emit if the checkbox is checked
    .pipe(filter(([active, timer]) => active))
    // and output the latest value from our timer observable
    .pipe(map(([active, timer]) => timer))
    .pipe(scan((accumulator, value) => accumulator + value))
    .subscribe(result => 
        document.getElementById("timer_counter").innerText = result
    );

// it looks good - but can you spot the issue here?

// toggling the checkbox will cause another value to be emitted
// try toggling the checkbox quickly and you will see
// the number increment too 

// hint: we can prevent the observable from emitting more than once
// per second...

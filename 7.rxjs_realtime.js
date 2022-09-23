//
// Reactive Extensions
// Real time observables 
//

// for this example you'll need to run a local web server
// in terminal execute "npm run serve"
// browse site and navigate to the appropriate option

// turn events into observables with "fromEvent"
import { fromEvent } from "rxjs";
const clicks = fromEvent(increment_button, "click");

// "throttleTime" prevents subsequent values for a time period  
// "scan" acts as an accumulator
import { throttleTime, scan, map } from "rxjs/operators";
clicks
    .pipe(throttleTime(2000))
    .pipe(map(x => 1)) // provide our increment value
    .pipe(scan((accumulate, current) => accumulate + current, 0))
    .subscribe(value =>
        increment_counter.innerText = value.toString()
    );
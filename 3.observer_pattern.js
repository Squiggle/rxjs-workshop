//
// Observables
//

// we have seen how array methods allow us to transform
// and manipulate collections
// and we have seen how iterables allow us to define
// lazy collections from which we can pull the next value

// but what happens when we are no longer in control of
// the data source?

// Introducing the Observer Pattern
// https://en.wikipedia.org/wiki/Observer_pattern

function Subject() {
    // our subject keeps a record of its subscribers
    this.subscribers = new Set();
    // clients can can subscribe to it
    this.subscribe = (subscriber) => {
        this.subscribers.add(subscriber);
        // provite the ability to unsubscribe
        return {
            unsubscribe: () => this.subscribers.delete(subscriber)
        };
    };
    // our subject can emit values to each subscriber
    this.next = (value) => {
        this.subscribers.forEach(subscriber => subscriber(value));
    }
}

// how does this behave on a timeline?
// let's use a messenger
const doorEntry = new Subject();
// and our first client connects

const observer1 = doorEntry.subscribe(x => console.log(`1: ${x}`));

// some messages are sent
doorEntry.next("Alexis");
doorEntry.next("Barry");

// our 2nd client connects
const observer2 = doorEntry.subscribe(x => console.log(`2: ${x}`));


// and more messages are sent
doorEntry.next("Cathy");
doorEntry.next("Deepak");

// our first client disconnects
observer1.unsubscribe();
doorEntry.next("Edwin");
doorEntry.next("Frances");

// will only update the second client from now on


// this is an example of a 'push' collection
// the subscriber can subscribe and unsubscribe to the output

// but is not provided with tools to manipulate the stream

// next: Reactive Extensions
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
    this.subscribers = new Map();
    this.subscribe = (key, subscriber) => {
        this.subscribers.set(key, subscriber);
    };
    this.unsubscribe = (key) => {
        this.subscribers.delete(key);
    }
    this.next = (value) => {
        for (const subscriber of this.subscribers.values()) {
            subscriber(value);
        }
    }
}

// let's create a messenger
const messenger = new Subject();
// and our first client connects
const clientA = [];
messenger.subscribe("a", message => clientA.push(message));
// some messages are sent
messenger.next("A");
messenger.next("B");

// our 2nd client connects
const clientB = [];
messenger.subscribe("b", message => clientB.push(message));
// and more messages are sent
messenger.next("C");
messenger.next("D");

// thus our clients have so far received
clientA
clientB

// and unsubscribing the first client
messenger.unsubscribe("a");
messenger.next("E");
messenger.next("F");

// will only update the second client from now on
clientA
clientB


// this is an example of a 'push' collection
// the subscriber cannot subscribe and unsubscribe
// but is not provided with tools to manipulate the stream

// next: Reactive Extensions
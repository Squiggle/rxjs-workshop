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
const messenger = new Subject();
// and our first client connects
const clientA = {
    messages: [],
    connection:
        messenger.subscribe(message => clientA.messages.push(message))
};

// some messages are sent
messenger.next("A");
messenger.next("B");

// our 2nd client connects
const clientB = {
    messages: [],
    connection:
        messenger.subscribe(message => clientB.messages.push(message))
};

// and more messages are sent
messenger.next("C");
messenger.next("D");

// thus our clients have so far received
console.log(clientA.messages);
console.log(clientB.messages);

// our first client disconnects
clientA.connection.unsubscribe();
messenger.next("E");
messenger.next("F");

// will only update the second client from now on
console.log(clientA.messages);
console.log(clientB.messages);

// this is an example of a 'push' collection
// the subscriber can subscribe and unsubscribe to the output

// but is not provided with tools to manipulate the stream

// next: Reactive Extensions
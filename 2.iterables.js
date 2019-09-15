//
// Iterables
//

// iterables are objects that can be iterated over
const numbers = new Set([1, 2, 3, 4, 5]);
numbers;

let total = 0;
numbers.forEach(x => total += x);
total;

// wait, why do we need iterables when we have arrays?
// and why don't my array methods work?
// numbers.filter(x => x < 3); // .filter is not a function

// iterables are not guaranteed to exist in memory

// here's a generator that creates an iterable
function* generateNumbers() {
    for (i = 1; i <= 5; i++) {
        yield i;
    }
}
const numbers2 = generateNumbers();

// they don't exist in memory
// ...we can't see them all at the same time
numbers2;

// but we can iterate over them
function getTotal(numbersIterable) {
    let total = 0;
    for (n of numbersIterable) {
        total += n;
    }
    return total;
}
const result = getTotal(numbers2);
result;

// in order to view the contents we need to
// place them all in memory - using an array
const numbers3 = Array.from(generateNumbers());
numbers3;

// iterables can be exhausted
const numbers4 = generateNumbers();
const numbers4Total = getTotal(numbers4);
numbers4Total;

const numbers4TotalAgain = getTotal(numbers4);
numbers4TotalAgain;

// iterators allow us to fetch the next value on demand
const numbers5 = generateNumbers();
const a = numbers5.next();
a;
const b = numbers5.next();
b;
const c = numbers5.next();
c;
const d = numbers5.next();
d;
const e = numbers5.next();
e;
const f = numbers5.next();
f;

// it may be fair to say iterables can be treated
// like a synchronous stream

// how hard is it to implement our own generator?
function alphabetIterator() {
    this._i = 65;
    this._x = 65 + 26;
    // 1. an iterator must have a next() method
    // which returns { value: any, done: boolean }
    this.next = () => {
        if (this._i < this._x) {
            return { value: String.fromCharCode(this._i++), done: false };
        }
        return { done: true };
    };
    // 2. an iterator must have property a of Symbol.iterator
    // which returns the a function to fetch its self
    this[Symbol.iterator] = () => this;
}

const alphabet = new alphabetIterator();
const alphabetString = Array.from(alphabet).join("");
alphabetString;

// check out the iterator protocol:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol

// protip: Look out for async iteratables in ES2018!
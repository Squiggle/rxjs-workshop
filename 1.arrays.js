//
// Arrays
//

// we all know what an array looks like
const numbers = [1, 2, 3, 4];

numbers;

// an in-memory collection of values or objects

// fact: We always know what an Array contains.
// we can interrogate it by index (zero-indexed)
const secondValue = numbers[1];
secondValue;

// we can manipulate the array with many different methods
const doubled = numbers.map(x => x * 2);
doubled;

// some methods return new arrays
const filtered = numbers.filter(x => x > 2);
filtered;
numbers;

// and some methods manipulate the current array
const reversed = numbers.sort((a, b) => b - a);
reversed;
numbers;

// we often chain these methods
const shoppingList = [
    { name: "Chair", price: 35 },
    { name: "Table", price: 110 },
    { name: "Lamp", price: 15 },
    { name: "Chair", price: 35 }
];
const checkoutPrice = shoppingList
    .map(x => x.price)
    .reduce((p, c) => p + c);
checkoutPrice;


// next: Iterables



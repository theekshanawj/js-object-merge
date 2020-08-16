const assert = require('assert').strict;

const merge = require('./');

// Sanity checks

assert.deepStrictEqual({ a: { b: 3 } }, merge({ a: { b: { k: 1 } } }, { a: { b: 3 } }));
assert.deepStrictEqual(
    { a: { b: 3, c: 2, k: 5 }, c: 3 },
    merge({ a: { c: 2 } }, { a: { b: 3 } }, { c: 3 }, { a: { k: 5 } }),
);
assert.deepStrictEqual({ a: 3 }, merge({ a: 1 }, { a: 3 }));
assert.deepStrictEqual(
    { a: { b: { c: { d: 1, e: 2 } }, f: { g: 3 } }, b: 4 },
    merge({ a: { b: { c: { d: 1 } } } }, { a: { b: { c: { e: 2 } }, f: { g: 3 } } }, { b: 4 }),
);
assert.deepStrictEqual(
    { a: [{ b: 2 }, { d: 4 }, { c: 3 }, { e: 5 }] },
    merge({ a: [{ b: 2 }, { d: 4 }] }, { a: [{ c: 3 }, { e: 5 }] }),
);

// Combinations

assert.deepStrictEqual({}, merge(null, 1, 2));
assert.deepStrictEqual({ a: 2 }, merge(null, 1, 2, { a: 2}));
assert.deepStrictEqual({ a: [1,2, 5] }, merge({a : [1 ,2 ]}, { a: 5 }));
assert.deepStrictEqual({ a: { l: 2} }, merge({a : [1 ,2]}, { a: { l: 2} }));
assert.deepStrictEqual({ a: [{ l: 2}] }, merge({a : [1 ,2]}, { a: [{ l: 2}] }));
assert.deepStrictEqual({ a: 5 }, merge({a : null}, { a: 5 }));


console.log(merge( { a: { b: { k: 1} } }, { a: { b: 3 } }));
console.log(merge( { a: { c: 2 } }, { a: { b: 3 } }, { c: 3}, { a: { k: 5 }}));
console.log(merge( { a: 1},  { a: 3 } ));

console.log('All tests passed');

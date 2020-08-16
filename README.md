# js-merge-object
Utility method to merge nested JS objects recursively.

## Description

This lightweight util method will merge objects; nested and if required recursively.
```javascript
merge( { a: { c: 2 } }, { a: { b: 3 } }, { c: 3 }, { a: { k: 5 }})
// { a: { c: 2, b: 3, k: 5 }, c: 3 }
```


To add a flavour, this method will handle arrays as a **special case**. 

If merge encounters,
- Two arrays with the same key, if arrays have similar types arrays will be concatenated.
- An array and non-array element found with the same key, if type of non-array is similar to type of elements
in the array, non-array element will be pushed to the array. 

```javascript
merge({ a : [1 ,2 ]}, { a: [5, 7] });
// { a: [1, 2, 5, 7] } -> Arrays with same types will concat

merge({a : [1 ,2 ]}, { a: 5 });
// { a: [1, 2, 5 ] } -> Item will be pushed to an array with same type
```

## Add this to your application 

```shell script
npm i js-merge-object
```

## How to use

```javascript
const merge = require('js-merge-object');

merge({ a: { b: 2 }}, {a: { c: 4 }});
// {a: { b: 2, c: 4 } } -> Same key object are merged

merge( { a: 1}, { a: 3 });
// { a: 3 } -> Key found at last will override others

merge({ a : [1 ,2 ]}, { a: [5, 7] });
// { a: [1, 2, 5, 7] } -> Arrays with same types will concat

```

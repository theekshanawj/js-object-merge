/**
 * Merge list of objects, non objects are skipped.
 * A deep merge is the end result
 * Ex: merge( { a: { c: 2 } }, { a: { b: 3 } }, { c: 3 }, { a: { k: 5 }})
 * = { a: { c: 2, b: 3, k: 5 }, c: 3 }
 * When same key is repeated along with a non object, precedence is given to latter object (Similar to Object.assign)
 * Ex: merge( { a: 1 },  { a: 3 } )
 * = { a: 3 }.
 * @param params
 * @return {{}}
 */
const merge = (...params) => {
    const merger = {};
    params.forEach((param) => {
        if (isObject(param)) {
            Object.keys(param).forEach((key) => {
                // already a key is defined
                if (merger[key] !== undefined) {
                    merger[key] = mergeTwo(merger[key], param[key]);
                } else {
                    merger[key] = param[key];
                }
            });
        }
    });
    return merger;
};

/**
 * Return if object === {}.
 * @param {*} object
 * @return {boolean|boolean}
 */
const isObject = (object) => object instanceof Object && object.constructor === Object;

/**
 * Merge two objects.
 * If two objects found call the merge method for recursive merging
 * If either or both objects are array try to merge them
 * Else return b object.
 * @param {*} a
 * @param {*} b
 * @return {{}|*}
 */
const mergeTwo = (a, b) => {
    if (a === b) return a;
    if (isObject(a) && isObject(b)) return merge(a, b);
    if (Array.isArray(a) || Array.isArray(b)) return mergeArray(a, b);
    return b;
};

/**
 * Try to merge two arrays.
 * If both are arrays check the first element of both and if they are equal merge both
 * If only one is an array and other is a not, check type of first element of array with the other,
 * If they are same merge other to array.
 * @param a
 * @param b
 */
const mergeArray = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length === 0) return b;
        if (b.length === 0) return a;
        // If first elements of both are equal merge them
        if (typeof a[0] === typeof b[0]) return [...a, ...b];
        return b;
    }
    if (Array.isArray(a)) {
        if (a.length === 0) return b;
        if (typeof a[0] === typeof b) return a.concat(b);
        return b;
    }
    if (Array.isArray(b)) {
        if (b.length === 0) return b;
        if (typeof b[0] === typeof a) return b.concat(a);
        return b;
    }
    return b;
};

module.exports = merge;

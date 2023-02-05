// Polyfill of Promise.finally()

// Remember, here you cannot use Fat Arrow Syntax, since it would cause problem in correct 'this' detection
Promise.prototype.finally = function (callback) { // Accepts a callback
    if (typeof callback !== 'function') {
        callback = function() {};
    }

    // this.then() will be w.r.t the previous Promise for which we're attaching .then
    // Example, Promise.resolve(10).then(() => {}).finally(() => {})
    // Because Finally should resolve after the above promise to which .finally() is fulfilled(either resolved or rejected)
    return this.then(
        value => Promise.resolve(callback()).then(() => value),
        err => Promise.resolve(callback()).then(() => { throw err; })
    );

    // Or
    // return (
    //     this.then(value => Promise.resolve(callback()).then(() => value))
    //     .catch(err => Promise.resolve(callback()).then(() => { throw err; }))
    // )
}
const states = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
}

class MyPromise {
    state;
    value;
    handlers;

    constructor(callback) {
        this.state = states.PENDING;
        this.value = undefined;
        this.handlers = [];

        try {
            callback(this._resolve, this._reject);
        }
        catch (error) {
            this._reject(error);
        }
    }

    _resolve = (value) => {
        this._updateHandlers(states.FULFILLED, value);
    }

    _reject = (value) => {
        this._updateHandlers(states.REJECTED, value);
    }

    _updateHandlers = (state, value) => {
        if (state === states.PENDING) {
            return;
        }

        if (value instanceof MyPromise) {
            return value.then(this._resolve, this._reject);
        }

        this.state = state;
        this.value = value;

        this._executeHandlers();
    }

    _executeHandlers = () => {
        if (this.state === states.PENDING) {
            return;
        }
        
        this.handlers.forEach(handler => {
            if (this.state === states.FULFILLED) {
                return handler.onSuccess(this.value);
            }

            return handler.onFailure(this.value); // this.state === states.REJECTED
        })

        this.handlers = [];
    }

    _addHandler = (handler) => {
        this.handlers.push(handler);
        this._executeHandlers();
    }

    then = (onSuccess, onFailure) => {
        return new MyPromise((resolve, reject) => {
            this._addHandler({
                onSuccess: (value) => {
                    if (!onSuccess) {
                        return resolve(value);
                    }

                    try {
                        return resolve(onSuccess(value));
                    }
                    catch (error) {
                        return reject(value);
                    }
                },
                onFailure: (value) => {
                    if (!onFailure) {
                        return reject(value);
                    }

                    try {
                        return reject(onFailure(value));
                    }
                    catch (error) {
                        return reject(value);
                    }
                }
            })
        })
    }

    catch = (onFailure) => {
        return this.then(null, onFailure);
    }

    finally = (callback) => {
        return new MyPromise((resolve, reject) => {
            this.then((value) => {
                callback();
                resolve(value);
            })
            .catch((value) => {
                callback();
                reject(value);
            })
        })
    }
}

// Testcase 1
const promise1 = new MyPromise((resolve, reject) => {
    resolve('Hello World');
})
.then()
.then()
.then(value => {
    console.log(value);
    // return 'Yoo';
    return new MyPromise(resolve => setTimeout(() => resolve('Yoo!'), 3000));
})
.finally(() => {
    console.log('Finally');
})
.then(value => {
    console.log(value);
})

// Testcase 2
const promise2 = new MyPromise((resolve, reject) => {
    resolve(new MyPromise(resolve => setTimeout(() => resolve('Yoo!'), 3000)));
})
.then(value => console.log(value));
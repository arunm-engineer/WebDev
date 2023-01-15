const promise = new Promise((resolve, reject) => {
    // resolve('Hello World');
    reject('Hello Error');
})

// ===================================================

// promise
// .then(val => {
//     console.log(val);
//     return val + '123';
// }, err => {
//     console.log(err, ' - In catch Callback');
//     return err + '123';
// })
// .then(val => {
//     console.log(val);
//     return val;
// })
// .catch(err => {
//     console.log(err, ' - In catch Block');
// })

// ===================================================

// promise
// .then(val => {
//     console.log(val);
//     return val + '123';
// })
// .then(val => {
//     console.log(val);
//     return val;
// })
// .finally(() => {
//     console.log('This will not receive any value as argument');
// })

// ===================================================

// promise
// .then(val => {
//     console.log(val);
//     return val + '123';
// })
// .finally((val) => {
//     console.log('This callback will not receive any value as argument');
//     return val + '456';
// })
// .then(val => {
//     console.log(val);
//     return val;
// })

// ===================================================

// promise
// .then(null, err => {
//     console.log(err, ' - In Catch Callback');
// })
// .finally(() => {
//     console.log('Then Finally');
// })

// promise
// .catch(err => {
//     console.log(err, ' - In Catch Block');
// })
// .finally(() => {
//     console.log('Catch Finally');
// })

// ===================================================

// helper function to create a promise
// that resolves after a certain time
const asyncTask = function (time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(`Completing ${time}`), 100 * time);
    });
}
// create an array of task
const promises = [
    asyncTask(3),
    asyncTask(1),
    asyncTask(7),
    asyncTask(2),
    asyncTask(5),
];

const asyncSeriesExecuter = function(promises) {
    promises.reduce((acc, curr) => {
        return acc.then(() => {
            // This 'return' statement below makes a whole lot of difference, actually making it 'serial' in nature
            return curr.then(value => console.log(value)); 
        })
    }, asyncTask(1));
}

asyncSeriesExecuter(promises);


// This is how 'asyncSeriesExecuter' demystified looks like at low level, just simple promise chaining
// promises[0].then(() => {
//     // This 'return' statement below makes a whole lot of difference, actually making it 'serial' in nature
//     return promises[1].then(value => console.log(value)); 
// })
// .then(() => {
//     return promises[2].then(value => console.log(value)); 
// })
// .then(() => {
//     return promises[3].then(value => console.log(value)); 
// })
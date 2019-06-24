var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Its Worked');
        // reject('An error occurred');
    }, 2000);
});


somePromise.then(message => {
console.log(message);
}, errorMessage => {
    console.log(errorMessage);
});


var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 2000);
    });
};




////// Qualé
// class MyPromise {
//     constructor(func) {
//         this.func = func;
//     }
//     myThen(cbs, cbe) {
//         this.func(cbs, cbe);
//     }
// }

//  var f = new MyPromise((resolve,reject)=>{
//     resolve('something');
//  });

//  f.myThen(m => { console.log(m) });
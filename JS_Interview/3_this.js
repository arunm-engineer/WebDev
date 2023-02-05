// const example = {
//     blog: 'learnersbucket',
//     displayBlog: function () {
//         function inner() {
//             // this refers to the example object
//             console.log(this === example);
//             console.log(this.blog);
//         };
//         inner.call(this);
//     }
// };

// const display = example.displayBlog;
// display();

//====================================

// const example = {
//     blog: 'learnersbucket',
//     displayBlog: function () {
//         const inner = () => {
//             // this refers to the example object
//             console.log(this === example);
//             console.log(this.blog);
//         };

//         inner.call(this);
//         // inner();
//     }
// };

// const display = example.displayBlog;
// display();

//====================================


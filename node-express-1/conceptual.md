### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Call backs, Promises, Async/Await

- What is a Promise?
A promise is an object representing the eventual completion or failure of an asynchronous operation

- What are the differences between an async function and a regular function?
async- always returns a promise, and allows the use of await inside which pauses execution until the promise is settled 

regular- returns and immediate result and cannot use await inside

- What is the difference between Node.js and Express.js?
node.js- runtime environment that executes JavaScript code server side. and its a core for building web applications by providign a set of features and tools.

ecpress.js- web application framework for nodejs and simplifies building robust web applications by providing a set of features and tools 

- What is the error-first callback pattern?
callbacks take an error object as their first paramater, if null the operation was succesful; otherise, it contains information about the error

- What is middleware?
functions that have access to the request and response objects in an express applications rereqet cycle and can modify the request, response or end the request cycle. 

- What does the `next` function do?
its used in express.js middleware to pass control to the next middleware function and it is usally used to proceed the next middleware int he stack

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
it causes delays
the order of responses dont match the order of requests 
and the veriable names are not descriptive

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

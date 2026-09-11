/*🔥 Advanced Challenge: API Throttle with Success/Error Handling

You are given:

function fakeAPI(userId) {
  console.log(`Request started for user ${userId}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 3) {
        reject(new Error("Server error"));
      } else {
        resolve(`User ${userId} loaded`);
      }
    }, 1000);
  });
}

Build this from scratch:

function throttleAsync(fn, delay) {
    // your code
}
Requirements

Create:

const loadUser = throttleAsync(fakeAPI, 2000);

Then:

loadUser(1);

loadUser(2);

setTimeout(() => {
  loadUser(3);
}, 500);

setTimeout(() => {
  loadUser(4);
}, 1000);

setTimeout(() => {
  loadUser(5);
}, 2500);

Your throttle must:

Execute the first call immediately.
While throttled, keep only the latest pending call.
After 2 seconds, execute that latest pending call.
Start another 2-second throttle period.
Preserve any number of arguments using ...args.
Correctly handle the Promise returned by fn.
If fn rejects, the throttle itself must not break. It should continue accepting future calls.
Return the Promise from the actual API call so that this works:
loadUser(1)
  .then(result => console.log(result))
  .catch(error => console.log(error.message));
🧠 The tricky part

Think carefully about this:

fn(...args)

returns a Promise.

What should your throttle do with that Promise?

And if:

fn(...args)

rejects, should waiting remain stuck at true?*/

//GIVEN...
function fakeAPI(userId) {
  console.log(`Request started for user ${userId}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 3) {
        reject(new Error("Server error"));
      } else {
        resolve(`User ${userId} loaded`);
      }
    }, 1000);
  });
}
//SOLUTION
function throttleAsync(fn, delay) {
  let waiting = false;
  let storage = null;
  return function (...args) {
    if (waiting === true) {
      storage = args;
      return;
    }
    const promise = fn(...args)
      .then((response) => {
        console.log(response);
        return response; //had to put this so as to be able to return the promise when it is resolved successful
      })
      .catch((error) => {
        console.error(error.message);
        throw error; //had to put this so as to rethrow the error so that it doesn't get to be resolved.
      });
    waiting = true;
    setTimeout(() => {
      waiting = false;
      if (storage !== null) {
        let argsToRun = storage;
        storage = null;
        fn(...argsToRun) //Here our function does not return promise for those calls that occur later when our function has finished.
          .then((response) => console.log(response))
          .catch((error) => console.error(error.message));
        waiting = true;
        setTimeout(() => (waiting = false), delay);
      }
    }, delay);
    return promise;
  };
}
const loadUser = throttleAsync(fakeAPI, 2000);
loadUser(2).catch((error) => console.log("Error caught:", error.message));

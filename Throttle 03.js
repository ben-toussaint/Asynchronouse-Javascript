/*
## 🔥 Advanced Throttling Challenge: Build a Smart API Throttle

You're building a search system. The user can trigger searches extremely quickly, but your application must **never execute the actual API function more than once every 2 seconds**.

You are given only this:

```js
function fakeAPI(endpoint, query, page) {
  console.log(`API → ${endpoint}, query=${query}, page=${page}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        endpoint,
        query,
        page,
        results: [`Result for ${query}`]
      });
    }, 800);
  });
}
```

Your job is to build the **entire throttling system from scratch**.

### Requirements

Create:

```js
function throttleAsync(fn, delay) {
    // EVERYTHING is your job
}
```

It must support calls like:

```js
const search = throttleAsync(fakeAPI, 2000);

search("/search", "javascript", 1);
search("/search", "promises", 2);
search("/search", "async", 3);

setTimeout(() => {
    search("/search", "throttling", 4);
}, 1000);

setTimeout(() => {
    search("/search", "closures", 5);
}, 2500);
```

### Your throttle must satisfy these rules

**1. First call executes immediately.**

```text
0ms → javascript ✅
```

**2. Calls during the 2-second window must NOT execute immediately.**

```text
0ms     javascript    ✅
0ms     promises      ❌
0ms     async         ❌
1000ms  throttling    ❌
```

**3. When the waiting period ends, execute the MOST RECENT call.**

This is the important new part.

At 0–2000ms, the calls were:

```text
promises
async
throttling
```

When the gate opens, you should execute:

```text
throttling
```

because it was the **latest request**.

**4. After executing that queued request, start another 2-second throttle window.**

**5. Arguments must be preserved.**

This:

```js
search("/users", "Ben", 3);
```

must eventually call:

```js
fakeAPI("/users", "Ben", 3);
```

**6. It must work with any number of arguments.**

Don't hard-code:

```js
endpoint
query
page
```

Your throttle should work with:

```js
fn(a, b)
```

or:

```js
fn(a, b, c, d, e)
```

**7. The API is asynchronous.**

Your throttle should handle the returned Promise properly.

---

### 🎯 Expected conceptual timeline

```text
TIME

0ms
│
├── search("javascript") ────────→ EXECUTE ✅
│
├── search("promises") ──────────→ STORE ⏳
│
├── search("async") ─────────────→ REPLACE stored request
│
├── 1000ms
│   └── search("throttling") ────→ REPLACE stored request
│
2000ms
│
└── EXECUTE "throttling" ✅
        │
        └── new 2-second window
             │
2500ms
│
└── search("closures") ──────────→ STORE ⏳
```

reason about:

* closure
* `setTimeout`
* `...args`
* `fn(...args)`
* storing the latest call
* clearing/replacing stored data
* Promise handling
* when the gate opens and closes
*/
//given:
function fakeAPI(endpoint, query, page) {
  console.log(`API → ${endpoint}, query=${query}, page=${page}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        endpoint,
        query,
        page,
        results: [`Result for ${query}`],
      });
    }, 800);
  });
}

/////////SOLUTION....
function throttleAsync(fn, delay) {
  let waiting = false;
  let storage = null; //Storage for recent requests
  return function (...args) {
    //This corrects arguments which were passed in together as one array so as they can be easily managed
    if (waiting === true) {
      storage = args;
      return;
    }
    fn(...args); //This unpacks the argument so as they can be used normally as they should
    waiting = true;
    setTimeout(() => {
      waiting = false;
      if (storage !== null) {
        let argsToRun = storage; //copying the storage because it is going to be brought back to 'null'
        storage = null; //brought back to 'null'
        fn(...argsToRun);
        waiting = true;
        setTimeout(() => (waiting = false), delay);
      }
    }, delay);
  };
}

const search = throttleAsync(fakeAPI, 2000);
search();

//The version we build, if A is executed, B is stored, and then we get C before the setTimeout ends,
//  then C will replace B as the recent inserted.

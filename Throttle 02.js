//You are given this function=>
function fakeSearch(query) {
  console.log(`Searching for: ${query}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Results for "${query}"`);
    }, 500);
  });
}
/* create a function
function throttleSearch(fn, delay){...} so that search("hello"); will do the following:
0ms      search("j")           → API call ✅
500ms    search("ja")          → ignored ❌
500ms    first API finishes

1000ms   search("jav")         → ignored ❌

2000ms   throttle opens 🔓

2500ms   search("javascript")  → API call ✅
 NB>> the query will be passed to the called function*/

function throttleSearch(fn, delay) {
  let waiting = false;
  return function (query) {
    if (waiting === true) {
      return;
    }
    fn(query); //Key for the function to be successfull.
    waiting = true;
    setTimeout(() => (waiting = false), delay);
  };
}

const search = throttleSearch(fakeSearch, 2000);

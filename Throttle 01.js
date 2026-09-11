//Building a basic throttle function that will delay 2 seconds before responding...
function throttle(fn, delay) {
  let waiting = false;
  return function () {
    if (waiting === true) {
      return;
    }
    fn();
    waiting = true;
    setTimeout(() => (waiting = false), delay);
  };
}
const sayHello = throttle(() => console.log("hello"), 2000);
sayHello();
sayHello();
sayHello();
sayHello();

/*Create a function called `createAlarm` that generates a wake-up message 
for a person after a specified time delay. This function should accept two parameters:
 the person's name and the delay time in seconds. The function should return a promise that resolves
  with the wake-up message (e.g. Wake up person) but if the delay is less than 2 seconds,
   the promise should be immediately rejected with an error message stating **Delay is not
    sufficient**

      Example of how the function should be used


createAlarm('John', 4).then((message) => {
    console.log(message) // output "Wake up John" after 4 seconds
}).catch((error) => {
    console.error(error)
})

createAlarm('John', 1).then((message) => {
    console.log(message)
}).catch((error) => {
    console.error(error) // output "Delay is not sufficient"
})*/
//solution

function createAlarm(name, timeDelay) {
  return new Promise((resolve, reject) => {
    if (timeDelay < 2) {
      reject("Time not sufficient");
    }
    let timerId = setTimeout(() => {
      resolve(`Wake up ${name}`);
    }, timeDelay * 1000);
  });
}
//testing the function
createAlarm("John", 1)
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

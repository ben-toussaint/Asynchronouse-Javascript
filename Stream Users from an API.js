/*Stream users from an API

Imagine an API gives you users, but you want to process them one at a time instead of waiting for all users first.

You are given:

function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id,
        name: `User ${id}`
      });
    }, 1000);
  });
}

Your job is to create:

async function* getUsers() {
  // your code
}

It should produce users one at a time:

User 1
(wait)
User 2
(wait)
User 3

Then consume them*/
//solution
function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `User ${id}`,
      });
    }, 1000);
  });
}
async function* getUsers() {
  yield getUser(1);
  yield getUser(2);
  yield getUser(3);
}

async function main() {
  for await (let value of getUsers()) {
    console.log(value);
  }
}
main();

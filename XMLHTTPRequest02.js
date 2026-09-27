/*Get a User's Posts

You are given two API endpoints:

https://jsonplaceholder.typicode.com/users/{userId}
https://jsonplaceholder.typicode.com/posts?userId={userId}

Create these two functions:

1. getUser(userId)

Use XMLHttpRequest and return a Promise.

It should:

Make a GET request.
Resolve with the parsed user object.
Reject on an unsuccessful HTTP status.
Reject on a network error.
2. getUserPosts(userId)

Use XMLHttpRequest and return a Promise.

It should:

Make a GET request for the user's posts.
Resolve with the parsed array.
Reject on HTTP/network errors.

Then create:

async function main() {
  // your code
}

It should:

Get user 5.
Print the user's name.
Get that user's posts.
Print how many posts they have.
Use try...catch to handle errors.*/

//solution
function getUser(userId) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://jsonplaceholder.typicode.com/users/${userId}`);
    xhr.onload = function () {
      if (!(xhr.status >= 200 && xhr.status < 300))
        return reject(new Error(`HTTP Error ${xhr.status}`));
      resolve(JSON.parse(xhr.responseText));
    };
    xhr.onerror = function () {
      return reject(new Error(`Network Error`));
    };
    xhr.send();
  });
}

function getUserPosts(userId) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    );
    xhr.onload = function () {
      if (!(xhr.status >= 200 && xhr.status < 300)) {
        return reject(new Error(`HTTP Error: ${xhr.status}`));
      }
      resolve(JSON.parse(xhr.responseText));
    };
    xhr.onerror = function () {
      return reject(new Error(`Network Error`));
    };
    xhr.send();
  });
}

async function main() {
  try {
    const user = await getUser(5);
    console.log(user.name);

    const posts = await getUserPosts(5);
    console.log(posts.length);
  } catch (error) {
    console.log(error.message);
  }
}

main();

/*Create:

function getPost(postId) {
  // use XMLHttpRequest
}

It should:

Make a GET request to:
https://jsonplaceholder.typicode.com/posts/{postId}
Return a Promise.
Resolve with the parsed post.
Reject if the HTTP status isn't successful.
Reject on a network error.*/

//solution
function getPost(postId) {
  // use XMLHttpRequest
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://jsonplaceholder.typicode.com/posts/${postId}`);
    xhr.onload = function () {
      if (!(xhr.status >= 200 && xhr.status < 300)) {
        return reject(new Error(`HTTP Error: ${xhr.status}`));
      }
      resolve(JSON.parse(xhr.responseText));
    };
    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };
    xhr.send();
  });
}
getPost(10);

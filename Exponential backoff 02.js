/*Build this function:

async function fetchWithBackoff(url) {
  // your code
}

Requirements:

Make a fetch() request.
Each request has a 5-second timeout. If it takes longer, abort it.
If the request fails, retry up to 4 attempts.
Wait exponentially between retries:
after attempt 1 → 1 second
after attempt 2 → 2 seconds
after attempt 3 → 4 seconds
If an attempt succeeds, immediately return the response.
If all 4 attempts fail, throw the final error.

You can use:

AbortController
setTimeout
clearTimeout
async/await
for loop*/
//added comment here
//solution
async function fetchWithBackoff(url) {
  const maxAttempts = 4;
  let attempts;
  for (attempts = 1; attempts <= maxAttempts; attempts++) {
    let controller = new AbortController();
    const { signal } = controller;
    let timerId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      console.log(`got the response!`);
      return response;
    } catch (error) {
      if (attempts === maxAttempts) {
        console.log("ALL ATTEMPTES FAILED TO FETCH");
        throw error;
      }
      let delay = 2 ** (attempts - 1);
      if (error.name === "AbortError") {
        console.log(`request aborted successfully \n retrying...`);
      }
      await new Promise((resolve) => setTimeout(() => resolve(), delay * 1000));
    } finally {
      clearTimeout(timerId);
    }
  }
}

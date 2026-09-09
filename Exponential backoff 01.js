/*You have an API that sometimes fails. You want to retry the request 3 times, but wait longer after each failure.

Build:

async function fetchWithBackoff(url) {
  // your code
}
Requirements

Your function should:

Try fetch(url).
If it succeeds → return the response.
If it fails → retry.
Maximum 3 attempts.
Wait:
after 1st failure → 1 second
after 2nd failure → 2 seconds
after 3rd failure → 4 seconds
If all attempts fail → throw the final error.*/
//solution
async function fetchWithBackoff(url) {
  const attemptsLimit = 3;
  let attempt;
  for (attempt = 1; attempt <= attemptsLimit; attempt++) {
    let controller = new AbortController();
    const { signal } = controller;
    try {
      var TimerId = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error(`HTTP ERROR: Status ${response.status}`);
      }
      console.log("got the response!");
      return response;
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === attemptsLimit) {
        console.log("ALL ATTEMPTS FAILED!!");
      }
      let delay = attempt ** 2;
      await new Promise((resolve) => setTimeout(() => resolve(), delay * 1000));
    } finally {
      clearTimeout(TimerId);
    }
  }
}

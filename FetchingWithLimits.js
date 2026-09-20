//Creating a function that fetch will limit. If the space frees up, then the next urls is fetched.

async function fetchAllWithLimit(urls, limit) {
  let currentIndex = 0;
  let results = [];
  async function Worker() {
    while (currentIndex < urls.length) {
      let nextIndex = currentIndex;
      currentIndex++;
      try {
        let response = await fetch(urls[nextIndex]);
        results[nextIndex] = await response.json();
      } catch (error) {
        results[nextIndex] = error;
      }
    }
  }
  let Workers = [];
  let workerCounter = Math.min(limit, urls.length);
  for (let i = 0; i < workerCounter; i++) {
    Workers.push(Worker());
  }
  await Promise.all(Workers);
  return results;
}

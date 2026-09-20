//Creating a function that that will cancel out once the setTimeout finishes if the fetch has not yet completed.
async function fetchWithTimeout(url, timeoutMs) {
  let controller = new AbortController();
  const { signal } = controller;
  let timerID;
  try {
    timerID = setTimeout(() => {
      controller.abort();
    }, timeoutMs);
    let response = await fetch(url, { signal });
    let jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error detected", error);
    throw error;
  } finally {
    clearTimeout(timerID);
  }
}

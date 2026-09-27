/*Live Notifications

You have an API that checks for new notifications:

function fetchNotifications(check) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const notifications = {
        1: ["Ben liked your post", "New message"],
        2: ["Someone followed you"],
        3: ["You received a comment"],
        4: []
      };

      resolve(notifications[check] || []);
    }, 1000);
  });
}

Create:

async function* notificationStream() {
  // your code
}

And consume it:

async function main() {
  for await (const notification of notificationStream()) {
    console.log("🔔", notification);
  }
}

main();*/
//solution
async function* notificationStream() {
  let check = 1;
  while (true) {
    const notifications = await fetchNotifications(check);
    if (notifications.length === 0) {
      break;
    }
    for (const notify of notifications) {
      yield notify;
    }
    check++;
  }
}

/*Imagine an API returns one page of products at a time.

You are given:

function fetchProducts(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pages = {
        1: [
          { id: 1, name: "Laptop" },
          { id: 2, name: "Phone" }
        ],
        2: [
          { id: 3, name: "Keyboard" },
          { id: 4, name: "Mouse" }
        ],
        3: [
          { id: 5, name: "Monitor" }
        ]
      };

      resolve(pages[page] || []);
    }, 1000);
  });
}
Your task

Create:

async function* getAllProducts() {
  // your code
}

Then this should work:

async function main() {
  for await (const product of getAllProducts()) {
    console.log(product);
  }
}

main();

And eventually produce:

{ id: 1, name: "Laptop" }
{ id: 2, name: "Phone" }
{ id: 3, name: "Keyboard" }
{ id: 4, name: "Mouse" }
{ id: 5, name: "Monitor" }*/

async function* getAllProducts() {
  let page = 1;
  while (true) {
    const products = await fetchProducts(page);
    if (products.length === 0) {
      break;
    }
    for (const product of products) {
      yield product;
    }
    page++;
  }
}

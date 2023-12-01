let productList = [];
let cart = [];
let cards = [];
let loggedIn = false;
const mainCard = loggedIn ? "featured-card" : "small-card";

const myCarousel = document.querySelector("#carouselFeatured");
const carousel = new bootstrap.Carousel(myCarousel);

// fetch("https://fakestoreapi.com/products")
//   .then((res) => res.json())
//   .then((json) => {
//     productList = json;
//     // Display the data using the createCard function
//     productList.forEach((element) => {
//       createCard(element, mainCard);
//     });
//     // Call featuredCard after the data is fetched
//     featuredCard();
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    productList = json;
    // Display the data using the createCard function
    productList.forEach((element) => {
      createCard(element, mainCard);
    });
    // Call featuredCard after the data is fetched
    featuredCard();
    displayCards(cards);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function createCard(item, id) {
  const template = document.getElementById(id).content.cloneNode(true);
  // populate the template
  if (isValidHttpUrl(item.image)) {
    template.getElementById(id + "-img").src = item.image;
    template.getElementById(id + "-img").alt = item.description;
  }
  template.querySelector(".card-title").innerText = item.title;
  template.querySelector(".card-subtitle").innerText = `$ ${item.price.toFixed(
    2
  )}`;
  template.querySelector(".card-text").innerText = item.description;
  cards.push(template);
  return template;
}
function displayCards(cardArray) {
  cardArray.forEach((card) =>
    document.querySelector("#card-list").append(card)
  );
}

function loadCards(item) {
  return createCard(item, "featured-card");
}

function isValidHttpUrl(string) {
  try {
    const newUrl = new URL(string);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}

function filterCategories(event) {
  const list = document.getElementById("card-list");
  const selected = event;
  let updated = [];
  while (list.hasChildNodes()) list.removeChild(list.firstChild);

  if (selected === "all Catagories") {
    updated = Array.from(cards);
  } else {
    updated = productList.filter((item) => {
      return item.category === selected;
    });
  }
  displayCards(updated);
}

function featuredCard() {
  let numbers = [
    Math.floor(Math.random() * 7),
    Math.floor(Math.random() * (13 - 8) + 8),
    Math.floor(Math.random() * (19 - 14) + 14),
  ];
  for (let i = 0; i < 3; i++) {
    document
      .getElementById("carousel-item" + i)
      .append(loadCards(productList[numbers[i]]));
  }
}

function addToCart() {
  console.log("Item added.");
  cart.push(this);
  console.log(cart);
}

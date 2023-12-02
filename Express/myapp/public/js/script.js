let productList = [];
let cart = [];
let cards = [];
let loggedIn = false;
const mainCard = loggedIn ? "featured-card" : "small-card";

const myCarousel = document.querySelector("#carouselFeatured");
const carousel = new bootstrap.Carousel(myCarousel);

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    productList = json;
    // Display the data using the createCard function
    productList.forEach((element) => {
      const card = createCard(element, mainCard);
      cards.push(card);
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

  // Add data attribute for category
  template
    .querySelector(".card-text")
    .setAttribute("data-category", item.category.toLowerCase());

  return template.cloneNode(true); // Clone the template
}

function displayCards(cardArray) {
  const cardList = document.querySelector("#card-list");
  cardList.innerHTML = ""; // Clear the card list before appending new cards
  cardArray.forEach((card) => cardList.appendChild(card.cloneNode(true)));
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
  const selected = event.target.innerText.toLowerCase();
  const filteredProducts =
    selected === "all products"
      ? productList
      : productList.filter((item) => item.category.toLowerCase() === selected);

  displayFilteredCards(filteredProducts);
}

function displayFilteredCards(filteredProducts) {
  const cardList = document.getElementById("card-list");
  clearCardList(cardList);

  filteredProducts.forEach((product) => {
    const card = createCard(product, mainCard);
    cardList.appendChild(card);
  });
}

function clearCardList(cardList) {
  while (cardList.hasChildNodes()) {
    cardList.removeChild(cardList.firstChild);
  }
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

function openCardModal(card) {
  // Extract data from the clicked card
  const cardId = card
    .querySelector(".card-img-top")
    .getAttribute("data-card-id");
  const cardTitle = card.querySelector(".card-title").innerText;
  const cardDescription = card.querySelector(".card-text").innerText;
  const cardPrice = card.querySelector(".card-subtitle").innerText;

  // Use the extracted data as needed, for example, to populate a modal
  console.log(cardId, cardTitle, cardDescription, cardPrice);

  // Update modal content
  document.getElementById("cardModalLabel").innerText = cardTitle;
  document.getElementById("cardModalBody").innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <img src="${
          card.querySelector(".card-img-top").src
        }" class="img-fluid" alt="${cardDescription}">
      </div>
      <div class="col-md-6">
        <h5>${cardTitle}</h5>
        <p>${cardDescription}</p>
        <h6>${cardPrice}</h6>
      </div>
    </div>
  `;

  // Show the modal
  $("#cardModal").modal("show");
    // Handle button clicks to close the modal
    const modal = new bootstrap.Modal(document.getElementById("cardModal"));

    // Add event listeners to buttons
    const addToCartButton = document.getElementById("addToCartButton");
    const closeButton = document.getElementById("closeButton");
  
    addToCartButton.addEventListener("click", function () {
      // Perform addToCart logic here
      addToCart();
      // Close the modal
      modal.hide();
    });
  
    closeButton.addEventListener("click", function () {
      // Close the modal
      modal.hide();
    });
}

function addToCart() {
  console.log("Item added.");
  cart.push(this);
  console.log(cart);
}

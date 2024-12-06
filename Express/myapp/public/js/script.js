const myCarousel = document.querySelector("#carouselExampleCaptions");
const carousel = new bootstrap.Carousel(myCarousel);
let productList = [];
<<<<<<< HEAD
function addCard(img, title, price, description) {
    const priceNum = parseFloat(price);
    const template = document
        .getElementById("card-template")
        .content.cloneNode(true);
    // populate the template
    if (isValidHttpUrl(img)) {
        template.getElementById("small-card-img").src = img;
        template.getElementById("small-card-img").alt = description;
    }
    template.querySelector(".card-title").innerText = title;
    template.querySelector(".card-subtitle").innerText = `$ ${priceNum.toFixed(
        2
    )}`;
    template.querySelector(".card-text").innerText = description;
    document.querySelector("#card-list").appendChild(template);
}

fetch("https://fakestoreapi.com/products")
    .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        return res.json();
    })
    .then((json) => {
        console.log("API response:", json);
        json.forEach((element) => {
            addCard(
                element.image,
                element.title,
                element.price,
                element.description
            );
            productList.push(element);
        });

        // Populate carousel after product list is loaded
        populateCarousel();
    })
    .catch((err) => {
        console.error("Error fetching products:", err);
    });
=======
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

>>>>>>> 87e9ccd566d1debf2ed063a03d543314e5099a27
function isValidHttpUrl(string) {
    try {
        const newUrl = new URL(string);
        return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (err) {
        return false;
    }
}
<<<<<<< HEAD
console.log(productList);
function filterCategories(event) {
    //dropdown selected.
    const list = document.getElementById("card-list");
    const selected = event.target.value; // Gets the selections from the dropdown menu.
    while (list.hasChildNodes()) list.removeChild(list.firstChild);

    if (selected === "all categories") {
        productList.forEach((element) => {
            addCard(
                element.image,
                element.title,
                element.price,
                element.description
            );
        });
    } else {
        let updated = productList.filter((item) => {
            return item.category === selected;
        });
        updated.forEach((element) => {
            addCard(
                element.image,
                element.title,
                element.price,
                element.description
            );
        });
    }
}
let debounceTimer;
function debounce(func, delay) {
    return (...args) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
}
const filterCategoriesDebounced = debounce(filterCategories, 300);

function populateCarousel() {
    if (productList.length === 0) return;

    // Select 3 random products
    const randomProducts = productList
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    // Get carousel inner element
    const carouselInner = document.querySelector(".carousel-inner");
    const carouselIndicators = document.querySelector(".carousel-indicators");

    // Clear existing carousel items
    carouselInner.innerHTML = "";
    carouselIndicators.innerHTML = "";

    randomProducts.forEach((product, index) => {
        // Create carousel item
        const carouselItem = document.createElement("div");
        carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;
        carouselItem.innerHTML = `
          <img src="${product.image}" class="d-block w-100" alt="${product.title}">
          <div class="carousel-caption d-none d-md-block">
              <h5>${product.title}</h5>
              <p>${product.description}</p>
          </div>
      `;

        // Create indicator
        const indicator = document.createElement("button");
        indicator.type = "button";
        indicator.setAttribute("data-bs-target", "#carouselExampleCaptions");
        indicator.setAttribute("data-bs-slide-to", index.toString());
        indicator.className = index === 0 ? "active" : "";
        indicator.setAttribute("aria-label", `Slide ${index + 1}`);
        if (index === 0) indicator.setAttribute("aria-current", "true");

        // Append items
        carouselInner.appendChild(carouselItem);
        carouselIndicators.appendChild(indicator);
    });

    // Initialize the Bootstrap Carousel
    const myCarousel = document.querySelector("#carouselExampleCaptions");
    const carousel = new bootstrap.Carousel(myCarousel);
=======

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
>>>>>>> 87e9ccd566d1debf2ed063a03d543314e5099a27
}

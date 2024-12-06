const myCarousel = document.querySelector("#carouselExampleCaptions");
const carousel = new bootstrap.Carousel(myCarousel);
let productList = [];
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
function isValidHttpUrl(string) {
    try {
        const newUrl = new URL(string);
        return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (err) {
        return false;
    }
}
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
}

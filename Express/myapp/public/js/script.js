let productList = [];
/* const bootstrap = require('bootstrap')
const myCarousel = document.querySelector('#carouselExampleCaptions')
const carousel = new bootstrap.Carousel(myCarousel) */

function addCard(img, title, price, description) {
  const template = document
    .getElementById("small-card")
    .content.cloneNode(true);
  // populate the template
  if (isValidHttpUrl(img)) {
    template.getElementById("small-card-img").src = img;
    template.getElementById("small-card-img").alt = description;
  }
  template.querySelector(".card-title").innerText = title;
  template.querySelector(".card-subtitle").innerText = `$ ${price.toFixed(2)}`;
  template.querySelector(".card-text").innerText = description;
  document.querySelector("#card-list").appendChild(template);
}

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    json.forEach((element) => {
      addCard(element.image, element.title, element.price, element.description);
      productList.push(element);
    });
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
function filterCatagories(event) {
  console.log("Hi")
  const list = document.getElementById("card-list");
  const selected = event; // Gets the selections from the dropdown menu.
  while (list.hasChildNodes()) list.removeChild(list.firstChild);

  if (selected === "all Catagories") {
    productList.forEach((element) => {
      addCard(element.image, element.title, element.price, element.description);
    });
  } else {
    let updated = productList.filter((item) => {
      return item.category === selected;
    });
    updated.forEach((element) => {
      addCard(element.image, element.title, element.price, element.description);
    });
  }
}
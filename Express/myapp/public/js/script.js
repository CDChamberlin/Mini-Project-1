let productList = [];
function addCard(img, title, price, description) {
  const template = document
    .getElementById("card-template")
    .content.cloneNode(true);
  // populate the template
  if (isValidHttpUrl(img)) {
    template.querySelector(".card-img-top").src = img;
    template.querySelector(".card-img-top").alt = description;
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
  //dropdown selected.
  const list = document.getElementById("card-list");
  const selected = event.target.value; // Gets the selections from the dropdown menu.
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
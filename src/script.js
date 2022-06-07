'use strict';

const productList = [
  {
    id: 1000001,
    name: 'Jeans',
    img: './img/tShirt.jpg',
    price: 18,
    description: 'some jean text',
  },
  {
    id: 1000002,
    name: 'T-Shirt',
    img: './img/tShirt.jpg',
    price: 12,
    description: 'some t-shirt text',
  },
  {
    id: 1000003,
    name: 'T-Shirt',
    img: './img/tShirt.jpg',
    price: 12,
    description: 'some t-shirt text',
  },
];

//DOM elements
const containerItem = document.querySelector('.item');
const catalogueContainer = document.querySelector('.catalogue');
const items = document.querySelector('.items');
const btnCard = document.querySelectorAll('.btnCard');
const itemQty = document.querySelector('.qty');
const total = document.querySelector('.total');

//render products on screen from "Data Base"
const renderProductsOnScreen = function () {
  productList.forEach((product) => {
    catalogueContainer.innerHTML += `<div class="card">
                    <img src="${product.img}">
                    <h1>${product.name}</h1>
                    <p class="price">$${product.price}</p>
                    <p>${product.description}</p>
                    <p><button class="btnCard" onClick="addToCart(${product.id})">Add to Cart</button></p>
                  </div>`;
  });
};

//items on cart array
let cart = [];

//render selected items on cart
const renderProductsOnCart = function () {
  //render items added to cart
  items.innerHTML = '';
  cart.forEach((product) => {
    items.innerHTML += `<div class="item">
                    <h1>${product.name}</h1>
                    <p class="price">$${product.price}</p>
                    <button class="btnItem" onClick="removeFromCart(${product.id})">Remove</button>
                    <div class="qty">
                      <span onClick="qtyControl('minus', ${product.id})">-</span> 
                      ${product.itemQty}
                      <span onClick="qtyControl('plus', ${product.id})">+</span>
                    </div>
                  </div>`;
  });

  //for total cart amount
  let totalPriceToPay;
  if (cart.length > 0) {
    totalPriceToPay = cart
      .map((item) => item.price)
      .reduce((prev, next) => prev + next);
  } else {
    totalPriceToPay = 0;
  }

  //for total items on cart
  let totalItems;
  if (cart.length > 0) {
    totalItems = cart
      .map((item) => item.itemQty)
      .reduce((prev, next) => prev + next);
  } else {
    totalItems = 0;
  }

  //render total amounts on cart
  total.innerHTML = `
                      <h1>Total Items: ${totalItems}</h1>
                      <h1>Total Amount: $${totalPriceToPay}</h1>
                    `;
};

//render added items on cart
const addToCart = function (id) {
  if (cart.some((item) => item.id === id)) {
    alert('product already in cart');
  } else {
    let item = productList.find((product) => product.id === id);

    //add initial item quantity on cart
    item = {
      ...item,
      itemQty: 1,
    };

    cart.push(item);

    renderProductsOnCart();
  }
};

//remove items from cart
const removeFromCart = function (id) {
  let index = cart.findIndex((object) => {
    return object.id === id;
  });

  if (index > -1) {
    cart.splice(index, 1);
  }

  renderProductsOnCart();
};

//render and control items quantity on cart
const qtyControl = function (action, id) {
  //what is the index of the items on cart array
  let index = cart.findIndex((object) => {
    return object.id === id;
  });

  let item = cart[index];

  //quantity logic
  if (action == 'plus') {
    item.itemQty++;
    item.price = productList[index].price * item.itemQty;
    renderProductsOnCart();
  } else if (action == 'minus') {
    item.itemQty--;
    if (item.itemQty == 0) {
      removeFromCart(id);
    } else {
      item.price = productList[index].price * item.itemQty;
      renderProductsOnCart();
    }
  }
};

//initial rendering on the items from the "Data Base"
renderProductsOnScreen();

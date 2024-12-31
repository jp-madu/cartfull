const products = [
  {
    id: 1,
    name: "Waffle",
    description: "Waffle with Berries",
    price: 6.5,
    image: "./assets/images/image-waffle-desktop.jpg",
  },
  {
    id: 2,
    name: "Crème Brûlée",
    description: "Vanilla Bean Crème Brûlée",
    price: 7.0,
    image: "./assets/images/image-creme-brulee-desktop.jpg",
  },
  {
    id: 3,
    name: "Macaron",
    description: "Macaron Mix of Five",
    price: 8.0,
    image: "./assets/images/image-macaron-desktop.jpg",
  },
  {
    id: 4,
    name: "Tiramisu",
    description: "Classic Tiramisu",
    price: 6.5,
    image: "./assets/images/image-tiramisu-desktop.jpg",
  },
  {
    id: 5,
    name: "Baklava",
    description: "Pistachio Baklava",
    price: 5.99,
    image: "./assets/images/image-baklava-desktop.jpg",
  },
  {
    id: 6,
    name: "Pie",
    description: "Lemon Meringue Pie",
    price: 3.5,
    image: "./assets/images/image-meringue-desktop.jpg",
  },
  {
    id: 7,
    name: "Cake",
    description: "Red Velvet Cake",
    price: 3.5,
    image: "./assets/images/image-cake-desktop.jpg",
  },
  {
    id: 8,
    name: " Brownie",
    description: "Salted Caramel Brownie",
    price: 3.5,
    image: "./assets/images/image-brownie-desktop.jpg",
  },
  {
    id: 9,
    name: "Panna Cotta",
    description: " Vanilla Panna Cotta",
    price: 3.5,
    image: "./assets/images/image-panna-cotta-desktop.jpg",
  },
];
// Empty cart array to store selected products
let cart = [];

// Function to render products
function renderProducts() {
  const productContainer = document.querySelector(".product-list");
  productContainer.innerHTML = ""; // Clear the product container

  products.forEach((product) => {
    const productCard = `
      <div class="card" data-id="${product.id}">
        <div class="card_top">
          <img src="${product.image}" alt="${
      product.name
    }" class="card_image" />
          <div class="cart-controls">
            <div class="cart-default-btn">
              <img src="./assets/images/icon-add-to-cart.svg" alt="">
              <p>Add to Cart</p>
            </div>   
            <div class="quantity-controls" style="display: none;">
              <button class="decrease-btn">-</button>
              <span class="quantity">1</span>
              <button class="increase-btn">+</button>
            </div>
          </div>
        </div>
        <div class="card_notes">
          <p class="title">${product.name}</p>
          <p class="subtitle">${product.description}</p>
          <p class="price">$${product.price.toFixed(2)}</p>
        </div>
      </div>
    `;

    productContainer.innerHTML += productCard;
  });

  // Add event listeners after rendering products
  attachProductEventListeners();
}

// Function to render the cart
function renderCart() {
  const cartContainer = document.querySelector(".cart-list-display");
  const emptyCartDisplay = document.querySelector(".empty_cart_display");

  // // Retrieve cart from localStorage
  // let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = ""; // Clear the cart display
    emptyCartDisplay.style.display = "block"; // Show empty cart message
    return;
  }

  emptyCartDisplay.style.display = "none"; // Hide empty cart message
  cartContainer.innerHTML = ""; // Clear previous cart display

  cart.forEach((checkoutItem) => {
    const cartItemHTML = `
      <div class="card-list">
        <img class="cart-item-image" src="${
          checkoutItem.image
        }" alt="Cart item image">
        <div class="cart-item-details">
          <p class="cart-item-title">${checkoutItem.name}</p>
          <div class="cart-item-subtitles">
            <p class="cart-item-subtitle-1">${checkoutItem.quantity}x</p>
            <p class="cart-item-subtitle-2">$${(
              checkoutItem.price * checkoutItem.quantity
            ).toFixed(2)}</p>
          </div>
        </div>
      </div>
    `;
    cartContainer.innerHTML += cartItemHTML;
  });
}

// function renderCheckout() {
//  const checkoutContainer = document.querySelector(".checkout-container");

//  const checkoutListDisplay =

// }

// Attach event listeners to product cards
function attachProductEventListeners() {
  const addToCartButtons = document.querySelectorAll(".cart-default-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.closest(".card").dataset.id);
      const product = products.find((p) => p.id === productId);
      let cartItem = cart.find((item) => item.id === productId);

      if (!cartItem) {
        cartItem = { ...product, quantity: 1 };
        cart.push(cartItem);
      }

      // alert(`${product.name} has been added to your cart.`);
      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      renderCart();
      updateProductUI(this, cartItem.quantity);
    });
  });

  document.querySelectorAll(".increase-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.closest(".card").dataset.id);
      const cartItem = cart.find((item) => item.id === productId);

      if (cartItem) {
        cartItem.quantity++;
        renderCart();
        updateProductUI(
          this.closest(".card").querySelector(".cart-default-btn"),
          cartItem.quantity
        );

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
  });

  document.querySelectorAll(".decrease-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.closest(".card").dataset.id);
      const cartItem = cart.find((item) => item.id === productId);
      console.log(cartItem);
      console.log("Number of items in the cart is:", cart.length);

      if (cartItem) {
        cartItem.quantity--;

        if (cartItem.quantity === 0) {
          // Remove item from cart
          cart = cart.filter((item) => item.id !== productId);
        }
        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
        updateProductUI(
          this.closest(".card").querySelector(".cart-default-btn"),
          cartItem.quantity
        );
      }
    });
  });
}

// Update the product UI based on cart state
function updateProductUI(button, quantity) {
  const cartControls = button.parentElement;
  const quantityControls = cartControls.querySelector(".quantity-controls");

  if (quantity > 0) {
    button.style.display = "none";
    quantityControls.style.display = "flex";
    quantityControls.querySelector(".quantity").textContent = quantity;
  } else {
    button.style.display = "flex";
    quantityControls.style.display = "none";
  }
}

// Function to update the product list UI based on the cart state
function updateProductListUI() {
  const productContainer = document.querySelector(".product-list");
  productContainer.innerHTML = ""; // Clear the product container

  products.forEach((product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    const productCard = `
      <div class="card" data-id="${product.id}">
        <div class="card_top">
          <img src="${product.image}" alt="${
      product.name
    }" class="card_image" />
          <div class="cart-controls">
            <div class="cart-default-btn" style="${
              cartItem ? "display: none;" : "display: flex;"
            }">
              <img src="./assets/images/icon-add-to-cart.svg" alt="">
              <p>Add to Cart</p>
            </div>   
            <div class="quantity-controls" style="${
              cartItem ? "display: flex;" : "display: none;"
            }">
              <button class="decrease-btn">-</button>
              <span class="quantity">${cartItem ? cartItem.quantity : 1}</span>
              <button class="increase-btn">+</button>
            </div>
          </div>
        </div>
        <div class="card_notes">
          <p class="title">${product.name}</p>
          <p class="subtitle">${product.description}</p>
          <p class="price">$${product.price.toFixed(2)}</p>
        </div>
      </div>
    `;

    productContainer.innerHTML += productCard;
  });

  // Add event listeners after rendering products
  attachProductEventListeners();
}

// Initialize functionality
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve cart from localStorage
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  console.log("items saved in local storage are:", cart);

  // Check if the cart is empty
  if (cart.length > 0) {
    // Update the UI to reflect the current cart state
    renderCart();
    updateProductListUI();
  } else {
    // Display the default UI
    renderProducts();
    renderCart();
  }
});

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

// // Function to render products
// function renderProducts() {
//   const productContainer = document.querySelector(".product-list");
//   productContainer.innerHTML = ""; // Clear the product container

//   products.forEach((product) => {
//     const productCard = `
//       <div class="card" data-id="${product.id}">
//         <div class="card_top">
//           <img src="${product.image}" alt="${
//       product.name
//     }" class="card_image" />
//           <div class="cart-controls">
//             <div class="cart-default-btn">
//               <img src="./assets/images/icon-add-to-cart.svg" alt="">
//               <p>Add to Cart</p>
//             </div>
//             <div class="quantity-controls" style="display: none;">
//               <button class="decrease-btn">-</button>
//               <span class="quantity">1</span>
//               <button class="increase-btn">+</button>
//             </div>
//           </div>
//         </div>
//         <div class="card_notes">
//           <p class="title">${product.name}</p>
//           <p class="subtitle">${product.description}</p>
//           <p class="price">$${product.price.toFixed(2)}</p>
//         </div>
//       </div>
//     `;

//     productContainer.innerHTML += productCard;
//   });

//   // Add event listeners after rendering products
//   attachProductEventListeners();
// }

function updateNavCartCount() {
  const navCartIcon = document.querySelector(".nav-cart-image");

  let totalCartItemCount = getCartItemCount();

  if (navCartIcon) {
    navCartIcon.innerHTML = `
     <a href="#">
          <img src="./assets/images/shopping-cart.png" alt="" class="nav_cart" />
          <span class="cart-counter">${totalCartItemCount}</span> <!-- Cart counter -->

        </a>
        
        `;
  }
}


// function showCartPopupModal() {

// }


// // Add event listener to close button
// document
//   .querySelector(".nav-cart-image  .active")
//   .addEventListener("click", showCartPopupModal);



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

// Function to render the cart
function renderCart() {
  const cartDisplay = document.querySelector(".cart-display");
  const cartContainer = document.querySelector(".cart-list-display");
  const emptyCartDisplay = document.querySelector(".empty_cart_display");
  const cartTotalAmount = document.querySelector(".cart-total-amount");
  const cartHeading = document.querySelector(".cart-heading");

  // // Retrieve cart from localStorage
  // let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartDisplay.style.display = "none";
    cartContainer.innerHTML = ""; // Clear the cart display
    emptyCartDisplay.style.display = "block"; // Show empty cart message
    return;
  }
  cartDisplay.style.display = "block";
  emptyCartDisplay.style.display = "none"; // Hide empty cart message
  cartContainer.innerHTML = ""; // Clear previous cart display
  let totalCartItemCount = getCartItemCount();
  let totalCartItemCost = getCartTotal();

  if (cartHeading) {
    cartHeading.innerHTML = `<h3>Your Cart ( ${totalCartItemCount} )</h3>`;
  } else {
    console.error("Element with class 'cart-total-amount' not found.");
  }

  if (cartTotalAmount) {
    cartTotalAmount.innerHTML = `<p class="cart-total-amount-title">Order Total: </p> <h3 class="cart-total-amount-price" >$${totalCartItemCost.toFixed(
      2
    )}</h3>
    `;
  } else {
    console.error("Element with class 'cart-total-amount' not found.");
  }

  cart.forEach((checkoutItem) => {
    const cartItemHTML = `
      <div class="card-list" data-id="${checkoutItem.id}">
        
        <div class="cart-item-details">
          <p class="cart-item-title">${checkoutItem.name}</p>
          <div class="cart-item-subtitles">
            <p class="cart-item-subtitle-1">${checkoutItem.quantity}x</p>
      
            <p class="cart-item-subtitle-2">@$${checkoutItem.price.toFixed(
              2
            )}</p>
            <p class="cart-item-subtitle-2">$${(
              checkoutItem.price * checkoutItem.quantity
            ).toFixed(2)}</p>
          </div>
        </div>        
         <img src="./assets/images/icon-remove-item.svg" alt="" class="remove-cart-item"  data-id="${
           checkoutItem.id
         }">
      </div>
    `;
    console.log(checkoutItem.id);
    cartContainer.innerHTML += cartItemHTML;
    // cartTotalAmount.innerHTML = `<p>$${totalItemCost.toFixed(2)}</p>`;
  });

  // Add event listeners to "remove item" buttons
  attachRemoveEventListeners();
}

function renderCheckoutModal() {
  const checkoutContainer = document.querySelector(".checkout-container");
  const checkoutModalTotalAmount = document.querySelector(
    ".checkout-modal-total-amount"
  );
  // const checkoutModalButton = document.querySelector(".checkout-container");

  // // close - modal - btn;

  checkoutContainer.innerHTML = "";
  let totalCartItemCost = getCartTotal();

  cart.forEach((checkoutModalItem) => {
    const checkOutListView = `
      <div class="checkout-list-modal">
        <img class="cart-item-image" src="${
          checkoutModalItem.image
        }" alt="Cart item image">
        <div class="cart-item-details">
          <p class="cart-item-title">${checkoutModalItem.name}</p>
          <div class="cart-item-subtitles">
            <p class="cart-item-subtitle-1">${checkoutModalItem.quantity}x</p>
            <p class="cart-item-subtitle-2">@$${checkoutModalItem.price.toFixed(
              2
            )}</p>
          </div>
        </div>
          <p class="cart-item-subtitle-2">$${(
            checkoutModalItem.price * checkoutModalItem.quantity
          ).toFixed(2)}</p>
      </div>
    `;
    checkoutContainer.innerHTML += checkOutListView;
  });

  if (checkoutModalTotalAmount) {
    checkoutModalTotalAmount.innerHTML = `<p class="cart-total-amount-title">Order Total: </p> <h3 class="cart-total-amount-price" >$${totalCartItemCost.toFixed(
      2
    )}</h3>
    `;
  } else {
    console.error("Element with class 'cart-total-amount' not found.");
  }
}

// Attach event listeners to product cards

// Function to attach event listeners to "remove item" buttons
function attachRemoveEventListeners() {
  document.querySelectorAll(".remove-cart-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(event.currentTarget.dataset.id); // Get the product ID
      const cartItemIndex = cart.findIndex((item) => item.id === productId); // Find the index

      if (cartItemIndex !== -1) {
        cart.splice(cartItemIndex, 1); // Remove the item
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        updateNavCartCount();
        renderCart(); // Re-render the cart UI
        updateProductListUI(); // Update the product list UI
        console.log(`Item with ID ${productId} removed from cart.`);
        console.log("Updated cart:", cart);
      } else {
        console.log(`Item with ID ${productId} not found in cart.`);
      }
    });
  });
}

function attachProductEventListeners() {
  // const addToCartButtons = document.querySelectorAll(".cart-default-btn");

  // const renderCheckoutModalButton = document.querySelector("");

  document.querySelectorAll(".cart-default-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(
        event.currentTarget.closest(".card").dataset.id
      );
      addToCart(productId); // Add the product to the cart
    });
  });

  document.querySelectorAll(".increase-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(
        event.currentTarget.closest(".card").dataset.id
      );
      increaseQuantity(productId); // Increase the product quantity
    });
  });

  document.querySelectorAll(".decrease-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = parseInt(
        event.currentTarget.closest(".card").dataset.id
      );
      decreaseQuantity(productId); // Decrease the product quantity
    });
  });

  // Function to add a product to the cart
  function addToCart(productId) {
    const product = products.find((item) => item.id === productId);
    if (product) {
      cart.push({ ...product, quantity: 1 }); // Add the product with a quantity of 1
      localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
      updateNavCartCount();
      renderCart(); // Re-render the cart UI
      updateProductListUI(); // Update the product list UI
    }
  }

  // Function to increase the quantity of a product in the cart
  function increaseQuantity(productId) {
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.quantity += 1; // Increase the quantity
      localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
      updateNavCartCount();
      renderCart(); // Re-render the cart UI
      updateProductListUI(); // Update the product list UI
    }
  }

  // Function to decrease the quantity of a product in the cart
  function decreaseQuantity(productId) {
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1; // Decrease the quantity
      } else {
        cart.splice(cart.indexOf(cartItem), 1); // Remove the item if quantity is 1
      }
      localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
      updateNavCartCount();
      renderCart(); // Re-render the cart UI
      updateProductListUI(); // Update the product list UI
    }
  }

  // document.querySelectorAll(".remove-cart-item").forEach((button) => {
  //   button.addEventListener("click", (event) => {
  //     const currentId = parseInt(event.currentTarget.dataset.id);
  //     //   const productId = parseInt(this.closest(".card-list").dataset.id);
  //     const cartItem = cart.find((item) => item.id === currentId);

  //     // console.log(cartItem);
  //     console.log(currentId);
  //   });
  // });

  // OR use event delegation for dynamic elements
  // document.addEventListener("click", (event) => {
  //   if (event.target.classList.contains("remove-cart-item")) {
  //     const currentId = event.target.dataset.id;
  //     const cartItem = cart.find((item) => item.id === currentId);

  //     console.log(cartItem);
  //     console.log(currentId);
  //   }
  // });
}

document
  .querySelector(".confirm-order-button")
  .addEventListener("click", openCheckoutModal);

// Function to open the modal
function openCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  modal.style.display = "flex"; // Show the modal
  renderCheckoutModal(); // Render the checkout items
}

// Function to close the modal
function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  modal.style.display = "none"; // Hide the modal

  // Clear local storage (if used)
  localStorage.removeItem("cart");
  cart = []; // Reset the cart to an empty array

  renderCart();
  updateProductListUI();
  updateNavCartCount();
  
}


// Add event listener to close button
document
  .querySelector(".close-modal-btn")
  .addEventListener("click", closeCheckoutModal);

// Initialize functionality
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve cart from localStorage
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  console.log("items saved in local storage are:", cart);
  // console.log("Total cost of items in the cart:", totalItemCost);
  renderCart();
  updateProductListUI();
  updateNavCartCount();
  
});

// Helper function to calculate cart total
function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Helper function to get total items in cart
function getCartItemCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

//

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
  // Select the container where the products will be displayed
  const productContainer = document.querySelector(".product-list");

  // Render the products dynamically
  products.forEach((product) => {
    const productCard = `
    <div class="card" data-id="${product.id}" >
      <div class="card_top">
        <img src="${product.image}" alt="${product.name}" class="card_image" />
          <div class="cart-controls">
          <div class="cart-default-btn">
            <img src="./assets/images/icon-add-to-cart.svg" alt="">
            <p>Add to Cart</p>
          </div>   
           <div class="quantity-controls" >
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

    // Append the product card to the container
    productContainer.innerHTML += productCard;

    console.log(productContainer.innerHTML);
  });

  const cartContainer = document.querySelector(".cart-list-display");

  if (cart && cart.length > 0) {
    // Build HTML for all cart items
    let cartHTML = "";

    cart.forEach((checkoutItem) => {
      cartHTML += `
      <div class="card-list">
        <img class="cart-item-image" src="${checkoutItem.image}" alt="Cart item image">
        <div class="cart-item-details">
          <p class="cart-item-title">${checkoutItem.name}</p>
          <div class="cart-item-subtitles">
            <p class="cart-item-subtitle-1">1x</p>
            <p class="cart-item-subtitle-2">${checkoutItem.price}</p>
          </div>
        </div>
        <p class="cart-item-price">${checkoutItem.price}</p>
      </div>
    `;
    });

    // Update container once
    cartContainer.innerHTML = cartHTML;

    console.log(cartContainer.innerHTML);
  } else {
    console.log("Cart is empty or undefined.");
  }
}

// Initialize cart functionality
document.addEventListener("DOMContentLoaded", () => {
  // Render products first
  renderProducts();

  // Get all add to cart buttons
  const addToCartButtons = document.querySelectorAll(".cart-default-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get product ID from parent element
      const productId = parseInt(this.closest(".card").dataset.id);

      // Find the product from products array
      const product = products.find((p) => p.id === productId);

      // Check if the product is already in the cart
      let cartItem = cart.find((item) => item.id === productId);

      if (!cartItem) {
        // Add product to cart with quantity 1 if not already in cart
        cartItem = {
          ...product,
          quantity: 1,
        };
        cart.push(cartItem);
        console.log("Product added to cart:", cartItem);
      }

      // Update UI
      console.log("Cart updated:", cart); // For debugging

      // Hide add to cart button and show quantity controls
      const cartControls = this.parentElement;
      this.style.display = "none";

      const quantityControls = cartControls.querySelector(".quantity-controls");
      quantityControls.style.display = "flex";

      // Setup quantity controls
      const quantityDisplay = quantityControls.querySelector(".quantity");
      quantityDisplay.textContent = cartItem.quantity; // Set initial quantity display

      const increaseBtn = quantityControls.querySelector(".increase-btn");
      const decreaseBtn = quantityControls.querySelector(".decrease-btn");

      increaseBtn.addEventListener("click", function () {
        // Increase item quantity
        cartItem.quantity++;
        quantityDisplay.textContent = cartItem.quantity;
        console.log("Cart updated:", cart); // For debugging
      });

      decreaseBtn.addEventListener("click", function () {
        // Decrease item quantity
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
          quantityDisplay.textContent = cartItem.quantity;
        } else {
          // Remove item from cart when quantity reaches 0
          const cartIndex = cart.findIndex((item) => item.id === productId);
          cart.splice(cartIndex, 1); // Remove item from cart
          quantityControls.style.display = "none";
          button.style.display = "flex"; // Show "Add to Cart" button again
        }

        console.log("Cart updated:", cart); // For debugging
      });

      // decreaseBtn.addEventListener("click", function () {
      //   // Decrease item quantity
      //   if (cartItem.quantity > 0) {
      //     cartItem.quantity--;
      //     quantityDisplay.textContent = cartItem.quantity;
      //   }

      //   // If quantity reaches 0, remove item from cart
      //   if (cartItem.quantity === 0) {
      //     const cartIndex = cart.findIndex((item) => item.id === productId);
      //     cart.splice(cartIndex, 1);
      //     quantityControls.style.display = "none";
      //     button.style.display = "flex"; // Show "Add to Cart" button again
      //   }

      //   console.log("Cart updated:", cart); // For debugging
      // });
    });
  });
});


// Helper function to calculate cart total
function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Helper function to get total items in cart
function getCartItemCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}


//  <div class="card-list">
//             <img class="cart-item-image" src="./assets/images/image-baklava-thumbnail.jpg" alt="">
//             <div class="cart-item-details">

//               <p class="cart-item-title">Classic Tiramisu</h3>

//               <div class="cart-item-subtitles">
//                 <p class="cart-item-subtitle-1">1x</p>
//                 <p class="cart-item-subtitle-2">@5.50</p>
//               </div>

//             </div>
//             <p class="cart-item-price">$5.50</p>
//           </div> 


// renderProducts();

/*
const productList = document.querySelector(".product-list");
productList.innerHTML = products
  .map(
    (product) => `
      <div class="card" data-id="${product.id}">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <div class="cart-controls">
              <button class="add-to-cart-btn">Add to Cart</button>
              <div class="quantity-controls" style="display: none;">
                  <button class="decrease-btn">-</button>
                  <span class="quantity">1</span>
                  <button class="increase-btn">+</button>
              </div>
          </div>
      </div>
  `
  )
  .join("");
*/

/* <div class="card">

            <div class="card_top">

              <img src="./assets/images/image-waffle-desktop.jpg" alt="" class="card_image" />
              <button class="cart_btn">
                <i class="fa-solid fa-cart-plus" style="color: #c83b0e;"></i>
                <p>Add to Cart</p>
              </button>

            </div>

            <div class="card_notes">

              <p class="title">Waffle</p>
              <p class="subtitle">Waffle with Berries</p>
              <p class="price">$6.50</p>

            </div>


          </div>

          <div class="card">

            <div class="card_top">

              <img src="./assets/images/image-waffle-desktop.jpg" alt="" class="card_image" />
              <button class="cart_btn">
                <i class="fa-solid fa-cart-plus" style="color: #c83b0e;"></i>
                <p>Add to Cart</p>
              </button>

            </div>

            <div class="card_notes">

              <p class="title">Waffle</p>
              <p class="subtitle">Waffle with Berries</p>
              <p class="price">$6.50</p>

            </div>


          </div>

          <div class="card">

            <div class="card_top">

              <img src="./assets/images/image-waffle-desktop.jpg" alt="" class="card_image" />
              <button class="cart_btn">
                <i class="fa-solid fa-cart-plus" style="color: #c83b0e;"></i>
                <p>Add to Cart</p>
              </button>

            </div>

            <div class="card_notes">

              <p class="title">Waffle</p>
              <p class="subtitle">Waffle with Berries</p>
              <p class="price">$6.50</p>

            </div>


          </div> */

const addCart = document.querySelectorAll(".add-cart");
const notification = document.querySelector(".cart-notification");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.querySelector(".cart-count");
const cartIcon = document.querySelector(".cart-icon");
const cartBox = document.querySelector(".cart-box");
const cartItems = document.querySelector(".cart-items");

cartCount.textContent = cart.length;


function displayCart() {

    cartItems.innerHTML = "";

    cart.forEach(function(product, index) {

        const item = document.createElement("div");
        item.classList.add("cart-item");


        const productName = document.createElement("span");
        productName.textContent = product.name;


        const minusButton = document.createElement("button");
        minusButton.textContent = "-";


        const quantity = document.createElement("span");
        quantity.textContent = product.quantity;


        const plusButton = document.createElement("button");
        plusButton.textContent = "+";


        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");


        const quantityControls = document.createElement("div");
        quantityControls.classList.add("quantity-controls");

        quantityControls.appendChild(minusButton);
        quantityControls.appendChild(quantity);
        quantityControls.appendChild(plusButton);


        minusButton.addEventListener("click", function() {

            if (product.quantity > 1) {
                product.quantity--;
                saveCart();
            }

        });


        plusButton.addEventListener("click", function() {

            product.quantity++;
            saveCart();

        });


        removeButton.addEventListener("click", function() {

            cart.splice(index, 1);
            saveCart();

        });


        item.appendChild(productName);
        item.appendChild(quantityControls);
        item.appendChild(removeButton);

        cartItems.appendChild(item);

    });

}


function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    cartCount.textContent = cart.length;

    displayCart();

}


cartIcon.addEventListener("click", function(event) {

    event.preventDefault();

    cartBox.classList.toggle("show");

    displayCart();

});


addCart.forEach(function(button) {

    button.addEventListener("click", function() {

        const productName = button.dataset.product;


        const existingProduct = cart.find(function(product) {

            return product.name === productName;

        });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: productName,
                quantity: 1
            });

        }


        cartCount.textContent = cart.length;

        localStorage.setItem("cart", JSON.stringify(cart));


        notification.classList.add("show");


        setTimeout(function() {

            notification.classList.remove("show");

        }, 2000);

    });

});

const searchIcon = document.querySelector(".search-icon");
const searchBox = document.querySelector(".search-box");
const searchInput = document.querySelector(".search-input");
const cards = document.querySelectorAll(".card");

searchIcon.addEventListener("click", function(event) {

    event.preventDefault();

    searchBox.classList.toggle("show");

});

searchInput.addEventListener("input", function() {

    const searchValue = searchInput.value.toLowerCase();

    cards.forEach(function(card) {

        const productName = card.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(searchValue)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});
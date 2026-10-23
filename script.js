
let cart = [];

const countElement = document.getElementById("count");
const totalElement = document.getElementById("total");
const cartItems = document.getElementById("cart-items");
const searchInput = document.getElementById("search");

function updateCart() {
    countElement.textContent = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    totalElement.textContent = total.toLocaleString("en-PK");

    cartItems.innerHTML = "";

    cart.forEach(function(item) {
        const li = document.createElement("li");
        li.textContent =
            item.name + " × " + item.quantity +
            " — Rs. " + (item.price * item.quantity);
        cartItems.appendChild(li);
    });
}

document.querySelectorAll(".add-button").forEach(function(button) {
    button.addEventListener("click", function() {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(function(item) {
            return item.name === name;
        });

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();
    });
});

document.getElementById("clear-cart").addEventListener("click", function() {
    cart = [];
    updateCart();
});

searchInput.addEventListener("input", function() {
    const query = searchInput.value.trim().toLowerCase();

    document.querySelectorAll(".card").forEach(function(card) {
        const name = card.dataset.name.toLowerCase();
        const title = card.querySelector("h3").textContent.toLowerCase();

        card.style.display =
            name.includes(query) || title.includes(query)
                ? ""
                : "none";
    });
});

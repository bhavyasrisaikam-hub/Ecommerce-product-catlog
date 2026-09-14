const cartContainer =
document.getElementById("cartContainer");

const totalPriceElement =
document.getElementById("totalPrice");

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;


// Get selected reward
const selectedReward =
JSON.parse(localStorage.getItem("selectedReward")) || null;


// Display cart
if (cart.length === 0) {

    cartContainer.innerHTML =
    "<h2>Your Cart is Empty</h2>";

} else {

    cart.forEach(id => {

        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(product => {

            total += product.price;

            cartContainer.innerHTML += `

            <div class="card">

                <img src="${product.image}">

                <h3>${product.title}</h3>

                <p>₹${product.price}</p>

                <button onclick="removeItem(${id})">
                    Remove
                </button>

            </div>

            `;

            updateTotal();

        });

    });

}


// Update total with reward
function updateTotal() {

    let finalTotal = total;
    let discount = 0;

    if (selectedReward) {

        if (selectedReward.discountType === "percentage") {

            discount =
            total * selectedReward.discount / 100;

        } else {

            discount =
            selectedReward.discount;

        }

        discount = Math.min(discount, total);

        finalTotal = total - discount;

        totalPriceElement.innerHTML = `
            <div>
                <p>Subtotal: ₹${total.toFixed(2)}</p>

                <p style="color: green;">
                    Reward Applied: -₹${discount.toFixed(2)}
                </p>

                <h2>
                    Total: ₹${finalTotal.toFixed(2)}
                </h2>
            </div>
        `;

    } else {

        totalPriceElement.innerHTML =
        `Total: ₹${total.toFixed(2)}`;

    }

}


// Remove item
function removeItem(id) {

    cart = cart.filter(item => item !== id);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();

}

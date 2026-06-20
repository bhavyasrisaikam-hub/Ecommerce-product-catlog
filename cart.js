const cartContainer =
document.getElementById("cartContainer");

const totalPriceElement =
document.getElementById("totalPrice");

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

if(cart.length === 0){

    cartContainer.innerHTML =
    "<h2>Your Cart is Empty</h2>";

}else{

    cart.forEach(id => {

        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(product => {

            total += product.price;

            totalPriceElement.innerHTML =
            `Total: ₹${total.toFixed(2)}`;

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

        });

    });

}

function removeItem(id){

    cart = cart.filter(item => item !== id);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    location.reload();

}
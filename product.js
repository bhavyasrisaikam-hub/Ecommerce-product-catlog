const params =
new URLSearchParams(window.location.search);

const productId = params.get("id");

fetch(`https://fakestoreapi.com/products/${productId}`)
.then(response => response.json())
.then(product => {

    document.getElementById("productDetails")
    .innerHTML = `

    <div class="detail-card">

        <img src="${product.image}" alt="${product.title}">

        <div>

            <h2>${product.title}</h2>

            <h3>₹${product.price}</h3>

            <p><strong>Category:</strong>
            ${product.category}</p>

            <p>${product.description}</p>

            <p>
            ⭐ ${product.rating.rate}
            (${product.rating.count} reviews)
            </p>

            <button onclick="addToCart(${product.id})">
                Add To Cart
            </button>

        </div>

    </div>
    `;

});

function addToCart(id){

    let cart =
    JSON.parse(localStorage.getItem("cart"))
    || [];

    cart.push(id);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Product Added To Cart!");
}
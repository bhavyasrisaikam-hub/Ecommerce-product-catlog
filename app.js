const productContainer = document.getElementById("products");
const searchInput = document.getElementById("search");

let products = [];

// Fetch products from API
fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => {
    products = data;
    displayProducts(products);
  })
  .catch(error => {
    console.error("Error fetching products:", error);
  });

// Display products
function displayProducts(items) {

  productContainer.innerHTML = "";

  if (items.length === 0) {
    productContainer.innerHTML = `
      <h2 style="text-align:center;width:100%;margin-top:30px;">
        No Products Found
      </h2>
    `;
    return;
  }

  items.forEach(product => {

    productContainer.innerHTML += `
<div class="card">

<a href="product.html?id=${product.id}" style="text-decoration:none;color:black;">

<img src="${product.image}" alt="${product.title}">

<h3>${product.title}</h3>

<p>₹${product.price}</p>

<p style="color:#555;font-size:14px;">
${product.category}
</p>

</a>

</div>
`;

  });
}

// Search functionality
searchInput.addEventListener("input", () => {

  const keyword = searchInput.value.toLowerCase();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(keyword)
  );

  displayProducts(filteredProducts);

});

// Category Filter
function filterCategory(category) {

  if (category === "all") {
    displayProducts(products);
    return;
  }

  const filteredProducts = products.filter(product =>
    product.category === category
  );

  displayProducts(filteredProducts);

}
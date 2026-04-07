

fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
  .then((resp) => resp.json())
  .then((data) => showProducts(data));

fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  .then((resp) => resp.json())
  .then((data) => {
    showCategories(data);
    categoriesList(data);
  });

function showProducts(list) {
  const productsDiv = document.querySelector(".products");
  productsDiv.innerHTML = "";
  list.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const productImage = document.createElement("img");
    productImage.src = item.image;

    const productName = document.createElement("h3");
    productName.textContent = item.name;

    const productPrice = document.createElement("span");
    productPrice.textContent = item.price;

    const button = document.createElement("button");
    button.textContent = "Add To Cart";
    button.addEventListener("click", () => addToCart(1, item.price, item.id));
    card.append(productImage, productName, productPrice, button);
    productsDiv.appendChild(card);
  });
}

function addToCart(qty, price, id) {
  const reqBodyObj = {
    quantity: qty,
    price: price,
    productId: id,
  };

  fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(reqBodyObj),
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}

function showCategories(list) {
  const categoriesDiv = document.querySelector(".categories");

  const allCategories = document.createElement("button");
  allCategories.textContent = "All Products";
  categoriesDiv.appendChild(allCategories);

  allCategories.addEventListener("click", () => {
    fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
      .then((resp) => resp.json())
      .then((data) => showProducts(data));
  });

  list.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item.name;
    categoriesDiv.appendChild(button);

    button.addEventListener("click", () => {
      fetch(
        `https://restaurant.stepprojects.ge/api/Categories/GetCategory/${item.id}`,
      )
        .then((resp) => resp.json())
        .then((data) => showProducts(data.products));
    });
  });
}

function categoriesList(list) {
  const categoryList = document.querySelector("#categoryId");
  const defaultCategories = document.createElement("option");
  defaultCategories.textContent = "Show All";
  defaultCategories.value = "";
  categoryList.append(defaultCategories);
  list.forEach((item) => {
    const option = document.createElement("option");
    option.textContent = item.name;
    option.value = item.id;
    categoryList.appendChild(option);
  });
} 

const filterSubmitBtn = document.querySelector("#filterSubmit");
const filterResetBtn = document.querySelector("#filterReset");

filterSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const vegeterian = document.querySelector("#vegeterianId");
  const nuts = document.querySelector("#nutsId");
  const spiciness = document.querySelector("#spicinessId");
  const category = document.querySelector("#categoryId");

  fetch(
    `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegeterian.value}&nuts=${nuts.value}&spiciness=${spiciness.value}&categoryId=${category.value}`,
  )
    .then((resp) => resp.json())
    .then((data) => showProducts(data));  
});

filterResetBtn.addEventListener("click", () => {
  fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?v`)
    .then((resp) => resp.json())
    .then((data) => showProducts(data));
});

// Cart Section
const cartBtn = document.querySelector("#cartBtn");
cartBtn.addEventListener("click", () => {
  document.querySelector(".productsSection").classList.toggle("hidden");
  document.querySelector(".cartSection").classList.toggle("hidden");
  fetchCart();
});

function fetchCart() {
  const cartItemsMain = document.querySelector(".cartItemsMain");
  cartItemsMain.innerHTML = "";
  fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then((resp) => resp.json())
    .then((data) => { 
      data.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartItem");

        const cartItemName = document.createElement("div");
        cartItemName.classList.add("cartItemName");
        const cartImage = document.createElement("img");
        cartImage.src = item.product.image;
        const cartName = document.createElement("h3");
        cartName.textContent = item.product.name;
        cartItemName.append(cartImage, cartName);

        const qty = document.createElement("div");
        qty.classList.add("qty");
        qty.textContent = item.quantity;
        const qtyMinus = document.createElement("button");
        qtyMinus.textContent = "-";
        const qtyPlus = document.createElement("button");
        qtyPlus.textContent = "+";
        qty.prepend(qtyMinus);
        qty.append(qtyPlus);

        const price = document.createElement("span");
        price.classList.add("price");
        price.textContent = item.product.price;

        const total = document.createElement("span");
        total.classList.add("total");
        total.textContent = item.quantity * item.product.price;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.id = "deleteBtnId";
        deleteBtn.textContent = "X";

        cartItem.append(cartItemName, qty, price, total, deleteBtn);
        deleteBtn.addEventListener("click", () =>
          productDelete(item.product.id),
        );
        qtyMinus.addEventListener("click", () =>
          updateQuantity(
            item.product.id,
            item.product.price,
            item.quantity - 1,
          ),
        );
        qtyPlus.addEventListener("click", () =>
          updateQuantity(
            item.product.id,
            item.product.price,
            item.quantity + 1,
          ),
        );
        cartItemsMain.appendChild(cartItem);
      });

      let allTotal = 0;

      data.reduce(function (acc, item) {
        allTotal = acc + item.quantity * item.product.price;
        return allTotal;
      }, 0);

      document.querySelector(".allTotalPrice").textContent = "$" + allTotal;
    });
}

function updateQuantity(productId, price, quantity) {
  if (quantity < 1) {
    return;
  }
  const reqBodyObj = {
    quantity: quantity,
    price: price,
    productId: productId,
  };
  fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBodyObj),
  }).then(() => fetchCart());
}

function productDelete(id) {
  fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`, {
    method: "DELETE",
  }).then(() => fetchCart());
}


let Order = document.querySelector("#toCheckOut");

Order.addEventListener("click", () => {
    alert("We have received your order!");
})

const deleteAllBtn = document.querySelector("#deleteAll");

deleteAllBtn.addEventListener("click", () =>  {
  fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  .then((resp) => resp.json())
  .then((cartData) => {cartData.forEach((item) => {
    productDelete(item.product.id)
  })})
})
const errorHtml = document.getElementById("error");

//precio total de producto
const updateTotalProduct = () => {
  const productElements = document.querySelectorAll(".total-product");

  productElements.forEach((el) => {
    //product id
    const productId = el.closest(".div").id.split("-")[1];
    //quantity
    const quantity = parseInt(
      el.previousElementSibling.textContent.split(" ")[1],
      10
    );
    //price
    const price = parseFloat(
      el.previousElementSibling.previousElementSibling.textContent.split(
        "$ "
      )[1]
    );
    //total
    const total = quantity * price;
    el.textContent = `total: $ ${total}`;

    if (isNaN(total)) {
      const container = document.getElementById("container");
      container.innerHTML = `<div id="emptyCart">
      <h3>your cart is empty🫠</h3>
      <button><a href="/shop">return to shop</a></button>
      </div>`;
    }
  });
};
updateTotalProduct();

//eliminar producto del carrito
const deleteFromCart = async (pid) => {
  try {
    const cid = "656915f9d275608fc814127f";
    if (!cid) {
      console.log("cart not found");
    }
    const response = await fetch(
      `http://localhost:8080/api/carts/${cid}/products/${pid}`,
      {
        method: "DELETE",
      }
    );
    if (response.status == 200) {
      const productElement = document.getElementById(`product-${pid}`);
      if (productElement) {
        productElement.remove();
      }
      Swal.fire({
        text: "product deleted successfully",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  } catch (error) {
    console.log("error deleting product from cart: ", error);
    errorHtml.innerHTML = "error deleting product";
  }
};

//precio total del carrito
const updateTotalCart = () => {
  const totalCartElement = document.getElementById("total");
  const productElements = document.querySelectorAll(".total-product");

  let totalCart = 0;
  productElements.forEach((el) => {
    const total = parseFloat(el.textContent.split("$ ")[1]);
    totalCart += total;
  });

  totalCartElement.innerHTML = `<h3>total cart: $ ${totalCart}</h3>
  `;
};
updateTotalCart();

//purchase
const finalizePurchase = async (cid) => {
  try {
    const response = await fetch(`/api/carts/${cid}/purchase`, {
      method: "POST",
    });
    const result = await response.json();
    console.log(result);
    if (result.status === "success") {
      console.log("purchase successful!", result.message);
    }
  } catch (error) {
    console.error(error);
    document.getElementById("purchaseError").textContent =
      "Unexpected error occurred";
  }
};

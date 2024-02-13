const buttonAdd = document.getElementById("add-item");
const buttonDelete = document.getElementById("delete-item");
const buttonUpdate = document.getElementById("update-item");
const itemsContainer = document.querySelectorAll("input[type=checkbox]");

buttonAdd.addEventListener("click", () => {
  console.log("Add item");
  window.location.href = "/panel/productos?actions=agregar";
});

buttonDelete.addEventListener("click", async () => {
  console.log("Delete item");
  let prod = [];
  itemsContainer.forEach((item) => {
    if (item.checked) {
      const _id = item.id;
      console.log(_id);
      prod.push({ _id: item.id });
    }
  });
  const inputValue = "";
  const { value: option } = await Swal.fire({
    title: "Elininar productos",
    input: "text",
    inputLabel:
      "¿Estas seguro de liminar varios productos de la lista?\nSi es asi esribir 'ELIMINAR PRODUCTOS'",
    inputValue,
    showCancelButton: true,
    inputValidator: (value) => {
      if (value !== "ELIMINAR PRODUCTOS") {
        return "Para completar la accion debe escribir 'ELIMINAR PRODUCTOS'";
      }
    },
  });
  if (option) {
    Swal.fire(`Productos eliminados: ${prod.length}`);
    if (prod.length > 1) {
      fetch(`/api/products/${prod[0]}}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      fetch(`/api/products?quantity=${prod.length}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prod),
      });
    }
  }
});

buttonUpdate.addEventListener("click", () => {
  console.log("Update item");
});

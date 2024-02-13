const titleInput = document.getElementById("title-put");
const descriptionInput = document.getElementById("description-put");
const codeInput = document.getElementById("code-put");
const priceInput = document.getElementById("price-put");
const stockInput = document.getElementById("stock-put");
const categoryInput = document.getElementById("category-put");
const imageInput = document.getElementById("file-put");

const submitBtn = document.getElementById("submit-put");

const imgCard = document.getElementById("img-card-put");
const titleCard = document.getElementById("title-card-put");
const priceCard = document.getElementById("price-card-put");

titleInput.addEventListener("input", updateProductCard);
descriptionInput.addEventListener("input", updateProductCard);
priceInput.addEventListener("input", updateProductCard);
stockInput.addEventListener("input", updateProductCard);
categoryInput.addEventListener("input", updateProductCard);

const filesInput = [];
function previewImages(event) {
  const fileInput = event.target;
  const files = fileInput.files;
  const imagePreview = document.getElementById("image-preview-put");
  imagePreview.innerHTML = "";
  if (files.length > 4) {
    alert("Solo se permiten hasta 4 imágenes.");
    fileInput.value = "";
    imagePreview.innerHTML = `<h1>PREVIEW IMAGENES SOLO SE PERMITE 4 IMAGENES</h1>`;
    return;
  }
  if (files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgCard.src = e.target.result;
    };
    reader.readAsDataURL(files[0]);
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    filesInput.push(file.name);

    reader.onload = function (e) {
      const img = document.createElement("div");
      img.style.background = `url('${e.target.result}') no-repeat center center / cover`;
      img.classList.add("w-full", "h-full");
      imagePreview.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
}
let form = {};
function updateProductCard() {
  const titleValue = titleInput.value;
  const priceValue = priceInput.value;
  const descriptionValue = descriptionInput.value;
  const stockValue = stockInput.value;
  const categoryValue = categoryInput.value.split(",");

  titleCard.textContent = titleValue;
  priceCard.textContent = "$ " + priceValue;
}

document.getElementById("submit-put").addEventListener("click", function () {
  // Obtener los valores de los campos del formulario
  const title = document.getElementById("title-put").value;
  const description = document.getElementById("description-put").value;
  const code = document.getElementById("code-put").value;
  const price = document.getElementById("price-put").value;
  const stock = document.getElementById("stock-put").value;
  const category = document.getElementById("category-put").value;
  const fileInput = document.getElementById("file-put");
  const files = fileInput.files;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("code", code);
  formData.append("price", price);
  formData.append("stock", stock);
  formData.append("category", category);
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
  }
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const id = params.get("id");
  console.log(id);
  fetch(`/api/products/${id}`, {
    method: "PUT",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Hubo un problema al actualizar el producto.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Producto actualizado:", data);
      window.location.href = "/panel/productos";
    })
    .catch((error) => {
      console.error("Error al actualizar el producto:", error.message);
    });
});

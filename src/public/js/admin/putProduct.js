const formElements = [
  "title-put",
  "description-put",
  "code-put",
  "price-put",
  "stock-put",
  "category-put",
  "file-put",
].map((id) => document.getElementById(id));
const [imgCard, titleCard, priceCard] = [
  "img-card-put",
  "title-card-put",
  "price-card-put",
].map((id) => document.getElementById(id));

formElements.forEach((input) =>
  input.addEventListener("input", updateProductCard)
);

document.getElementById("file-put").addEventListener("change", previewImages);

function previewImages(event) {
  const files = event.target.files;
  const imagePreview = document.getElementById("image-preview-put");
  imagePreview.innerHTML = "";

  if (files.length > 4) {
    alert("Solo se permiten hasta 4 imágenes.");
    event.target.value = "";
    imagePreview.innerHTML =
      "<h1>PREVIEW IMAGENES SOLO SE PERMITE 4 IMAGENES</h1>";
    return;
  }

  [...files].forEach((file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("div");
      img.style.background = `url('${e.target.result}') no-repeat center center / cover`;
      img.classList.add("w-full", "h-full");
      imagePreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

function updateProductCard() {
  titleCard.textContent = formElements[0].value;
  priceCard.textContent = "$ " + formElements[3].value;
}

document.getElementById("submit-put").addEventListener("click", function () {
  const formData = new FormData();

  formElements.forEach((input) => {
    if (input.type === "file") {
      [...input.files].forEach((file) => formData.append("photos", file));
    } else {
      formData.append(input.name, input.value);
    }
  });

  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
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
      window.location.href = "/panel/productos";
    })
    .catch((error) => {
      console.error("Error al actualizar el producto:", error.message);
    });
});

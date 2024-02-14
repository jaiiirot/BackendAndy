const getElementById = (id) => document.getElementById(id);

const [
  titleInput,
  descriptionInput,
  codeInput,
  priceInput,
  stockInput,
  categoryInput,
  imageInput,
] = ["title", "description", "code", "price", "stock", "category", "file"].map(
  getElementById
);

const [imgCard, titleCard, priceCard] = [
  "img-card",
  "title-card",
  "price-card",
].map(getElementById);
const inputs = [
  titleInput,
  descriptionInput,
  priceInput,
  stockInput,
  categoryInput,
];
inputs.forEach((input) => input.addEventListener("input", updateProductCard));
imageInput.addEventListener("change", previewImages);

function previewImages(event) {
  const files = event.target.files;
  const imagePreview = getElementById("image-preview");
  imagePreview.innerHTML = "";

  if (files.length > 4) {
    alert("Solo se permiten hasta 4 imágenes.");
    event.target.value = "";
    imagePreview.innerHTML = `<img class="card-img w-full" src="../../image/noimgv.jpg" alt="imagen nuevo producto" id="img-card"/>`;
    return;
  }

  [...files].forEach((file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgCard.src = e.target.result;
      const img = document.createElement("div");
      img.style.background = `url('${e.target.result}') no-repeat center center / cover`;
      img.classList.add("w-full", "h-full");
      imagePreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

function updateProductCard() {
  titleCard.textContent = titleInput.value;
  priceCard.textContent = "$ " + priceInput.value;
}

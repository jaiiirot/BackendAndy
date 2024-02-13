const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const codeInput = document.getElementById("code");
const priceInput = document.getElementById("price");
const stockInput = document.getElementById("stock");
const categoryInput = document.getElementById("category");
const imageInput = document.getElementById("file");

const imgCard = document.getElementById("img-card");
const titleCard = document.getElementById("title-card");
const priceCard = document.getElementById("price-card");

titleInput.addEventListener("input", updateProductCard);
descriptionInput.addEventListener("input", updateProductCard);
priceInput.addEventListener("input", updateProductCard);
stockInput.addEventListener("input", updateProductCard);
categoryInput.addEventListener("input", updateProductCard);

function previewImages(event) {
  const fileInput = event.target;
  const files = fileInput.files;
  const imagePreview = document.getElementById("image-preview");
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
  const filesInput = [];
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
  return filesInput;
}

function updateProductCard() {
  const titleValue = titleInput.value;
  const priceValue = priceInput.value;
  const descriptionValue = descriptionInput.value;
  const stockValue = stockInput.value;
  const categoryValue = categoryInput.value.split(",");
  const imageValue = imageInput.value;

  console.log(imageValue);

  titleCard.textContent = titleValue;
  priceCard.textContent = "$ " + priceValue;
  //   titleCard.textContent = descriptionValue;
  return {
    titleValue,
    priceValue,
    descriptionValue,
    stockValue,
    categoryValue,
  };
}

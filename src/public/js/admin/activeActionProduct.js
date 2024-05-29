const params = new URLSearchParams(window.location.search);
const typeAction = params.get("action");
console.log("typeAction:", typeAction);

const formElements = [
	"title-input",
	"description-input",
	"code-input",
	"price-input",
	"stock-input",
	"category-input",
	"file-input",
].map(id => document.getElementById(id));

const [imgCard, titleCard, priceCard] = [
	"img-card",
	"title-card",
	"price-card",
].map(id => document.getElementById(id));

formElements.forEach(input =>
	input.addEventListener("input", updateProductCard)
);

function previewImages(event) {
	const files = event.target.files;
	const imagePreview = document.getElementById("image-preview");
	imagePreview.innerHTML = "";

	if (files.length > 4) {
		alert("Solo se permiten hasta 4 imágenes.");
		event.target.value = "";
		imagePreview.innerHTML =
			'<img class="card-img w-full" src="../../image/noimgv.jpg" alt="imagen nuevo producto" id="img-card"/>';
		return;
	}

	[...files].forEach(file => {
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
	titleCard.textContent = formElements[0].value;
	priceCard.textContent = "$ " + formElements[3].value;
}

if (typeAction === "editar") {
	document.getElementById("submit-put").addEventListener("click", function () {
		const formData = new FormData();

		formElements.forEach(input => {
			if (input.type === "file") {
				[...input.files].forEach(file => formData.append("photos", file));
			} else {
				formData.append(input.name, input.value);
			}
		});

		const url = new URL(window.location.href);
		const id = url.searchParams.get("pid");
		fetch(`/api/products/${id}`, {
			method: "PUT",
			body: formData,
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Hubo un problema al actualizar el producto.");
				}
				return response.json();
			})
			.then(data => {
				console.log("Producto actualizado:", data);
				window.location.href = "/panel/productos";
			})
			.catch(error => {
				console.error("Error al actualizar el producto:", error.message);
			});
	});
}

const formElements = [
  'title-input',
  'description-input',
  'code-input',
  'price-input',
  'stock-input',
  'category-input',
  'file-input'
].map((id) => document.getElementById(id))

const [imgCard, titleCard, priceCard] = [
  'img-card',
  'title-card',
  'price-card'
].map((id) => document.getElementById(id))

formElements.forEach((input) =>
  input.addEventListener('input', updateProductCard)
)

function previewImages (event) {
  const files = event.target.files
  const imagePreview = document.getElementById('image-preview')
  imagePreview.innerHTML = ''

  if (files.length > 4) {
    alert('Solo se permiten hasta 4 imágenes.')
    event.target.value = ''
    imagePreview.innerHTML = '<img class="card-img w-full" src="../../image/noimgv.jpg" alt="imagen nuevo producto" id="img-card"/>'
    return
  }

  [...files].forEach((file) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      imgCard.src = e.target.result
      const img = document.createElement('div')
      img.style.background = `url('${e.target.result}') no-repeat center center / cover`
      img.classList.add('w-full', 'h-full')
      imagePreview.appendChild(img)
    }
    reader.readAsDataURL(file)
  })
}

function updateProductCard () {
  titleCard.textContent = formElements[0].value
  priceCard.textContent = '$ ' + formElements[3].value
}

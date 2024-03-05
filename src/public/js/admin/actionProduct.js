const buttonAdd = document.getElementById('add-item')
const buttonDelete = document.getElementById('delete-item')
const buttonUpdate = document.getElementById('update-item')
const itemsContainer = document.querySelectorAll('input[type=checkbox]')
const trOptions = document.querySelectorAll('.tr_item')

trOptions.forEach((tr) => {
  tr.addEventListener('click', () => {
    const checkbox = tr.querySelector('input[type=checkbox]')
    checkbox.checked = !checkbox.checked
  })
})

buttonAdd.addEventListener('click', () => {
  window.location.href = '/panel/productos?action=agregar'
})

buttonDelete.addEventListener('click', async () => {
  const ids = []
  itemsContainer.forEach((item) => {
    if (item.checked) {
      ids.push(item.id)
    }
  })
  console.log(ids.length)
  const inputValue = ''
  const { value: option } = await Swal.fire({
    title: 'Elininar productos',
    input: 'text',
    inputLabel:
      "¿Estas seguro de liminar varios productos de la lista?\nSi es asi esribir 'ELIMINAR PRODUCTOS'",
    inputValue,
    showCancelButton: true,
    inputValidator: (value) => {
      if (value !== 'ELIMINAR PRODUCTOS') {
        return "Para completar la accion debe escribir 'ELIMINAR PRODUCTOS'"
      }
    }
  })
  if (option) {
    Swal.fire(`Productos eliminados: ${ids.length}`)
    if (ids.length == 1) {
      console.log(`/api/products/${ids[0]}`)
      fetch(`/api/products/${ids[0]}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload()
          }
        })
        .catch((error) => {
          console.error('Error al eliminar producto:', error)
        })
    } else {
      fetch('/api/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ids)
      })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload()
          }
        })
        .catch((error) => {
          console.error('Error al eliminar productos:', error)
        })
    }
  }
})

buttonUpdate.addEventListener('click', () => {
  itemsContainer.forEach((item) => {
    if (item.checked) {
      return (window.location = `/panel/productos?action=editar&pid=${item.id}`)
    }
  })
})

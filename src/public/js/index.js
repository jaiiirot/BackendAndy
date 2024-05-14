const header__mobile = document.querySelector('.header__mobile')
const header__active__mobile = document.querySelector(
  '.header__active__mobile'
)
const header__desactive__mobile = document.querySelector(
  '.header__desactive__mobile'
)

header__active__mobile.addEventListener('click', () => {
  header__mobile.classList.replace('desactive', 'active')
})
header__desactive__mobile.addEventListener('click', () => {
  header__mobile.classList.replace('active', 'desactive')
})

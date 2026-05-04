 
 //variavel//
 const prevButton = document.getElementById('prev')
 const nextButton = document.getElementById('next')
 const items = document.querySelectorAll('.item')
 const dots = document.querySelectorAll('.dot')
 const NumberIndicator = document.querySelector('.numbers')
 const list = document.querySelector('.list')
 
 
 let active = 0 
 const totalItems = items.length
 let time




 //função//
function update(direction){
  document.querySelector('.item.active').classList.remove('active')
  document.querySelector('.dot.active').classList.remove('active')
  active += direction

  if (active < 0) {
    active = totalItems -1
  }
  if (active >=totalItems) {
    active = 0 
    
  }
 items[active].classList.add('active')
  dots[active].classList.add('active')

  NumberIndicator.textContent = String(active + 1).padStart(2,'0')
}

clearInterval(time)

time = setInterval(() => {
   update(1) 
}, 2000);



 //addEventListener//
 prevButton.addEventListener('click', () => update(-1))
 nextButton.addEventListener('click', () => update(1))
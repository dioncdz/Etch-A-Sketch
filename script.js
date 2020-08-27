/*************************************************
 * // GET ELEMENTS
 *************************************************/

let canvas = document.querySelector('.grid-container');
let buttons = document.querySelectorAll('.buttons');
let box = '<div class="grid"></div>';
let hue = 0;
console.dir(canvas);

/*************************************************
 * // CREATE FUNCTION
 *************************************************/

function gridSet(e){
   let rows, column;
   canvas.innerHTML = '';
   
   if (e.target.textContent === 'Set Grid') {
      column = parseInt(prompt('Set number of columns (maximum: 64)', 16));
      if (column > 64 || !column || column < 0) {
         return -1;
      } 
      rows = parseInt(prompt('Set number of rows (maximum: 64)', 16)); 
      if (rows > 64 || !rows || rows < 0) {
         return -1;
      } 
      canvas.setAttribute('style', `grid-template-columns: repeat(${column}, 1fr)`)
      for(let i = 0; i < column*rows; i++) {
         canvas.innerHTML += box;
      }
   } else if (e.target.textContent === 'Clear Grid') {
      canvas.innerHTML = '';
   }
}

function draw() {
   let boxes = document.querySelectorAll('.grid');
   
   boxes.forEach(box => box.addEventListener('mouseover', (e)=> {
      e.target.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
      e.target.classList.remove('fade');
   }))
   boxes.forEach(box => box.addEventListener('mouseout', (e)=> {
      // e.target.style.backgroundColor = `#273F3B`;
      e.target.classList.add('fade');
   }))
   hue++;
}

function debounce(func, wait = 20, immediate = true) {
   var timeout;
   return function() {
     var context = this, args = arguments;
     var later = function() {
       timeout = null;
       if (!immediate) func.apply(context, args);
     };
     var callNow = immediate && !timeout;
     clearTimeout(timeout);
     timeout = setTimeout(later, wait);
     if (callNow) func.apply(context, args);
   };
 }

 /*************************************************
 * // ADD EVENT LISTENERS
 *************************************************/
buttons.forEach(button => button.addEventListener('click', gridSet))
canvas.addEventListener('mouseover', debounce(draw));
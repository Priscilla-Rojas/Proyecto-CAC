const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header-nav');
const header = document.querySelector('.header');
const close = document.querySelector('.close');

hamburger.addEventListener('click', ()=>{
  nav.classList.add('visible');
  header.classList. add('header-visible');
})
close.addEventListener('click', ()=>{
  nav.classList.remove('visible');
  header.classList.remove('header-visible');
})

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header-nav');
const header = document.querySelector('.header');
const close = document.querySelector('.close');

hamburger.addEventListener('click', ()=>{
  nav.classList.toggle('visible');
  header.classList.toggle('header-visible');
  // console.log(nav)
})
close.addEventListener('click', ()=>{
  nav.classList.toggle('visible');
  header.classList.toggle('header-visible');
})

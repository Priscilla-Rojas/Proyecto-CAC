const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header-nav');
const header = document.querySelector('.header');
const close = document.querySelector('.close');
const user = document.querySelector('#user');
const menuUser= document.getElementById('menu-user');
const logeo = localStorage.getItem('sesionIniciada');
const nameUSer = localStorage.getItem('nombre');
const bottonLogin = document.getElementById("userP");
const divdatesUSer = document.getElementById("img-Name-User");
const divImgUSer = document.getElementById("img-User");
const navUser = document.getElementById('nav-user');
const closeSesion = document.getElementById('closeSesion');

const locationURL = window.location.pathname;
const prevlocationURL = document.referrer;

if(logeo) {
  
  locationURL === '/login.html' ? window.location.href = './reservas.html' : false

  bottonLogin.textContent =` ${nameUSer}`
  user.title = 'Mi cuenta';

  const srcFoto = localStorage.getItem('foto');
  const img = document.createElement('img');
  img.src = srcFoto;
  img.classList.add('fotoUser');
  divImgUSer.append(img);

  const p = document.createElement('p');;
  p.textContent = nameUSer;
  divdatesUSer.innerHTML = `<img src="${srcFoto}" class="fotoUserMenu">`;
  divdatesUSer.appendChild(p)

}else{
  bottonLogin.textContent ='Iniciar Sesion';
  user.title ='Iniciar Sesion';
  menuUser.classList.add('hidden');
  divImgUSer.innerHTML = `<i class="fa-regular fa-user"></i>`;
  menuUser.classList.add('hidden');


};

hamburger.addEventListener('click', ()=>{
  nav.classList.add('visible');
  header.classList. add('header-visible');
})

close.addEventListener('click', ()=>{
  nav.classList.remove('visible');
  header.classList.remove('header-visible');
})
user.addEventListener('click', ()=>{
  !logeo 
  ? user.href = './login.html'
  : menuUser.classList.toggle('hidden')
})

closeSesion.addEventListener('click', ()=>{
  console.log('escuchando cerrar sesion')
  if(logeo){
    const rememberMail = localStorage.getItem('remember') ? true : false;
    let check;
    if(rememberMail) check = localStorage.getItem('mail');

    localStorage.clear();
    sessionStorage.clear();
    if (rememberMail) {
      localStorage.setItem('mail', check);
      localStorage.setItem('remember', true);
    }
    location.reload();
  }else{
    console.log('No se encuentra logeado')
  }
})

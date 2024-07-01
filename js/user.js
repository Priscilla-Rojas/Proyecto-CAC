const foto = document.getElementById('foto');
const myName = document.getElementById('myName');
const dni = document.getElementById('dni');
const mail = document.getElementById('mail');
const password = document.getElementById('password');


const img = document.createElement('img');
const url = localStorage.getItem('foto');
img.src = url;
const pName = document.createElement('p');
const nameUser = localStorage.getItem('nombre');
pName.textContent = nameUser;
const pDni = document.createElement('p')


myName.append(pName);
foto.appendChild(img);
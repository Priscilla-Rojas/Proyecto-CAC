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

function usuario(a,b,c,d,e,f,g,h) {
  this.nombreCompleto = a
  this.email = b
  this.clave = c
  this.genero = d
  this.foto = e
  this.edad = f
  this.referido = g
  this.DNI_usuario = h
};

let usuarios = [
  {
      nombreCompleto: "Ariel Zulian",
      email: "azulian093@gmail.com",
      clave: "Padelero100%",
      genero: "Masculino",
      foto: "url",
      edad: 46,
      referido: 1,
      DNI_usuario: '12345672'
  },
  {
      nombreCompleto: "Priscilla Rojas",
      email: "priscilla.k.rojas@hotmail.com",
      clave: "Padelera100%",
      genero: "Femenino",
      foto: "url",
      edad: 20,
      referido: 2,
      DNI_usuario: '12345673'
  },
  {
      nombreCompleto: "Daniela Bastias",
      email: "danybastias@outlook.com",
      clave: "Padel-era100%",
      genero: "Femenino",
      foto: "url",
      edad: 25,
      referido: 3,
      DNI_usuario: '12345671'
  },
  {
      nombreCompleto: "Adrián Bulacio",
      email: "adrian.bulacio.ab@hotmail.com",
      clave: "Padel-ero100%",
      genero: "Masculino",
      foto: "url",
      edad: 26,
      referido: 4,
      DNI_usuario: '12345674'
  }
];

function cierraSesion(){
  sessionStorage.setItem("usuarioSesion", "");
}

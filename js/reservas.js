// toda esta rutina para conseguir la fecha de hoy

const fecha = Date.now();
const fechaActual = new Date(fecha);
let hoyAnio = fechaActual.getFullYear();
let hoyMes = fechaActual.getMonth()+1 ;
let mes = hoyMes < 10 ? "0"+hoyMes : hoyMes;
let hoyDia = fechaActual.getDate();
let dia = hoyDia < 10 ? "0"+hoyDia : hoyDia;
let hoy = hoyAnio+"-"+mes+"-"+dia;

document.getElementById("fecha-turno").value = hoy;
document.getElementById("fecha-turno").min = hoy;

function fechar(p){
   p = p.slice(-2)+"/"+ p.substr(5,2) +"/"+ p.substr(0,4)
   return p
}


let elementos = document.querySelectorAll('.fe-turno');
    elementos.forEach(function(elemento) {
        elemento.textContent = fechar(hoy);
    });

// ahora intentando que La pagina cambie el mensaje cada vez que cambio el valor de logueado
function isLogin(){
let userLogued = document.getElementById("logueado").checked;
return userLogued
}


// con esto logré que que deje poner imite inferior en la fecha que puedo seleccionar (hoy) y el valor con que se carga la página (también hoy)
const horariosDisponibles = document.getElementById("head-main")


function queMensajeMuestro(){

isLogin() ? 
horariosDisponibles.innerHTML = `<h3 id="hora-dispo">Horarios Disponibles</h3>
<p>¿Vas a jugar? ¿Cuándo?
   Elige una fecha: </p> <input type="date" name="fecha-turno"  id="fecha-turno" min=${hoy} value=${hoy}>
  <p><span id="reco-inicio-sesion">Veamos qué turnos hay disponibles para ti</span></p>`
    : 
horariosDisponibles.innerHTML = `<h3 id="hora-dispo">Horarios Disponibles</h3>
    <p>¿Vas a jugar? ¿Cuándo?
       Elige una fecha: </p> <input type="date" name="fecha-turno"  id="fecha-turno" min=${hoy} value=${hoy}>
    <p><span id="reco-inicio-sesion">Recuerda que debes iniciar sesión para poder reservar</span></p>`
}
 
// cambiar todas las fechas cada vez que elijan una fecha en la tabla. 

let fechaInput = document.getElementById('fecha-turno');

fechaInput.addEventListener('change', function(){
    let fechaSel = fechaInput.value;
   
    let elementos = document.querySelectorAll('.fe-turno');
    elementos.forEach(function(elemento) {
        elemento.textContent = fechar(fechaSel);
    });
});


// cambiar estado del boton si el turno esta disponible o no

var botones = document.querySelectorAll('.turno-disponible');

// Iterar sobre cada botón y agregar el evento click
botones.forEach(function(boton) {
    boton.addEventListener('click', function() {
        // Alternar la clase en el botón actual
        this.value = "Reservado";
        this.classList.toggle('no');
        //  switch (this.value) {
        //  case "Reservar":
        //     this.value = "Reservado"
        //     break
        //     // case "Reservado":
        //     // this.value = "Reservar"
        //     // break

        // }
    });
});


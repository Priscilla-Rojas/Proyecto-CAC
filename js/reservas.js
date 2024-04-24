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
};


let elementos = document.querySelectorAll('.fe-turno');
    elementos.forEach(function(elemento) {
        elemento.textContent = fechar(hoy);
    });


    // ahora intentando que La pagina cambie el mensaje cada vez que cambio el valor de logueado

   

const horariosDisponibles = document.getElementById("reco-inicio-sesion");
function queMensajeMuestro(){
    let textoBoton = document.getElementById("userP");
    if (textoBoton.textContent == "Iniciar Sesión")
{
    canchas.classList.toggle("oculto");
    horariosDisponibles.classList.toggle("animado");
    horariosDisponibles.textContent = `Veamos qué turnos hay disponibles para ti`;
    textoBoton.textContent = "Cerrar Sesión";
   
}
else {
    canchas.classList.toggle("oculto");
    horariosDisponibles.classList.toggle("animado");
    horariosDisponibles.textContent = `Recuerda que debes iniciar sesión para poder reservar`;
    textoBoton.textContent = "Iniciar Sesión";
       
}
    };


 
// cambiar todas las fechas cada vez que elijan una fecha en la tabla. 

let fechaInput = document.getElementById('fecha-turno');

fechaInput.addEventListener('change', function(){
    let nos = document.querySelectorAll('.no');
        nos.forEach(function(no) {
            no.disabled = false;
            no.classList.remove("no");
            no.value = "Reservar";

            
        });

    let elementos = document.querySelectorAll('.fe-turno');
    elementos.forEach(function(elemento) {
        elemento.textContent = fechar(fechaInput.value);
    });
});



// cambiar estado del boton si el turno esta disponible o no

let botones = document.querySelectorAll('.turno-disponible');

  botones.forEach(function(boton) {
    boton.addEventListener('click', function() {
       
        this.value = "Reservado";
        this.classList.toggle('no');
        this.disabled = true;
       
    });
});

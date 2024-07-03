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

const obtenerCanchas = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No hay respuesta del servidor' + response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('la petición de datos arroja el siguiente error:', error);
    }
  };
const estructuraCanchas = document.getElementById("canchas")

  const url = 'http://localhost:3000/canchaTurnos/'
  obtenerCanchas(url)
  .then (data => data.forEach((cancha) => {
        console.log(cancha)
        const turnosEnOrden = cancha.TURNOS.reverse()
        const tBody = document.createElement('tbody')
        
        turnosEnOrden.forEach((turno)=> {
            const row = document.createElement('tr')
            const tdFecha = document.createElement('td')
            tdFecha.setAttribute('class', 'fe-turno')
            const tdNombre = document.createElement('td')
            tdNombre.textContent = turno.TURNO_NOMBRE
            const tdInicio = document.createElement('td')
            tdInicio.textContent = turno.TURNO_INICIO.slice(0,5)
            const tdFin = document.createElement('td')
            tdFin.textContent = turno.TURNO_FIN.slice(0,5)
            row.appendChild(tdFecha)
            row.appendChild(tdNombre)
            row.appendChild(tdInicio)
            row.appendChild(tdFin)
            tBody.appendChild(row)

        })
        console.log(tBody)
        const div = document.createElement('div')
        div.setAttribute('class', 'cancha')
        div.setAttribute('id', `${cancha.NOMBRE_CANCHA}`)
        div.innerHTML = `<h4>${cancha.NOMBRE_CANCHA}</h4>
                    <table class="horario" id="horario-cancha-${cancha.ID_CANCHA}">
                        <thead>
                            <tr>
                            <td class="head-column1" id="head-fecha-${cancha.ID_CANCHA}">Fecha</td>
                            <td class="head-column2" id="head-turno-${cancha.ID_CANCHA}">Turno</td>
                            <td class="head-column3" id="head-desde-${cancha.ID_CANCHA}">Desde</td>
                            <td class="head-column4" id="head-hasta-${cancha.ID_CANCHA}">Hasta</td>
                            <td class="head-column5" id="head-reserva-${cancha.ID_CANCHA}">¿Reservar?</td>
                        </tr>
                        </thead>
                        ${tBody}
                        <tbody>
                   <tr>
                               <td class="fe-turno" id="fe-c${cancha.ID_CANCHA}-t1">10/04/2024</td>
                               <td class="or-turno" id="or-c${cancha.ID_CANCHA}-t1">Primero</td>
                               <td class="de-turno" id="de-c${cancha.ID_CANCHA}-t1">10:00</td>
                               <td class="ha-turno" id="ha-c${cancha.ID_CANCHA}-t1">11:30</td>
                               <td class="re-turno" id="re-c${cancha.ID_CANCHA}-t1"><input type="button" class="turno-disponible" value="Reservar" id="btn-turno-1-c${cancha.ID_CANCHA}"></td>
                           </tr>
                           <tr>
                               <td class="fe-turno" id="fe-c${cancha.ID_CANCHA}-t2">10/04/2024</td>
                               <td class="or-turno" id="or-c${cancha.ID_CANCHA}-t2">Segundo</td>
                               <td class="de-turno" id="de-c${cancha.ID_CANCHA}-t2">11:30</td>
                               <td class="ha-turno" id="ha-c${cancha.ID_CANCHA}-t2">13:00</td>
                               <td class="re-turno" id="re-c${cancha.ID_CANCHA}-t2"><input type="button" class="turno-disponible" value="Reservar" id="btn-turno-2-c${cancha.ID_CANCHA}"></td>
                           </tr>                  

                           
                            
                           <tr>
                               <td class="fe-turno" id="fe-c${cancha.ID_CANCHA}-t3">10/04/2024</td>
                               <td class="or-turno" id="or-c${cancha.ID_CANCHA}-t3">Tercero</td>
                               <td class="de-turno" id="de-c${cancha.ID_CANCHA}-t3">13:00</td>
                               <td class="ha-turno" id="ha-c${cancha.ID_CANCHA}-t3">14:30</td>
                               <td class="re-turno" id="re-c${cancha.ID_CANCHA}-t3"><input type="button" class="turno-disponible" value="Reservar" id="btn-turno-3-c${cancha.ID_CANCHA}"></td>
                           </tr>
                           <tr>
                               <td class="fe-turno" id="fe-c${cancha.ID_CANCHA}-t4">10/04/2024</td>
                               <td class="or-turno" id="or-c${cancha.ID_CANCHA}-t4">Cuarto</td>
                               <td class="de-turno" id="de-c${cancha.ID_CANCHA}-t4">14:30</td>
                               <td class="ha-turno" id="ha-c${cancha.ID_CANCHA}-t4">16:00</td>
                               <td class="re-turno" id="re-c${cancha.ID_CANCHA}-t4"><input type="button" class="turno-disponible" value="Reservar" id="btn-turno-4-c${cancha.ID_CANCHA}"></td>
                           </tr>
                           <tr>
                               <td class="fe-turno" id="fe-c${cancha.ID_CANCHA}-t5">10/04/2024</td>
                               <td class="or-turno" id="or-c${cancha.ID_CANCHA}-t5">Quinto</td>
                               <td class="de-turno" id="de-c${cancha.ID_CANCHA}-t5">16:00</td>
                               <td class="ha-turno" id="ha-c${cancha.ID_CANCHA}-t5">17:30</td>
                               <td class="re-turno" id="re-c${cancha.ID_CANCHA}-t5"><input type="button" class="turno-disponible" value="Reservar" id="btn-turno-5-c${cancha.ID_CANCHA}"></td>
                           </tr>
                           <tr>
                               <td class="fe-turno" id="fe-c${cancha.ID_CANCHA}-t6">10/04/2024</td>
                               <td class="or-turno" id="or-c${cancha.ID_CANCHA}-t6">Sexto</td>
                               <td class="de-turno" id="de-c${cancha.ID_CANCHA}-t6">17:30</td>
                               <td class="ha-turno" id="ha-c${cancha.ID_CANCHA}-t6">19:00</td>
                               <td class="re-turno" id="re-c${cancha.ID_CANCHA}-t6"><input type="button" class="turno-disponible" value="Reservar" id="btn-turno-6-c${cancha.ID_CANCHA}"></td>
                           </tr>
                       </tbody> 
                    </table>
                    <a class="volver" href="#">Volver</a>`
                    estructuraCanchas.appendChild(div)
        
  }))

function fechar(p){
    p = p.slice(-2)+"/"+ p.substr(5,2) +"/"+ p.substr(0,4)
    return p

    const url = 'http://localhost:3000/canchas/'
    obtenerCanchas(url)
    .then (data => console.log(data));    




};


let elementos = document.querySelectorAll('.fe-turno');
    elementos.forEach(function(elemento) {
        elemento.textContent = fechar(hoy);
    });

    let usuarioQueIngreso = sessionStorage.getItem("usuarioSesion")
    console.log(sessionStorage.getItem("usuarioSesion"))

    // ahora intentando que La pagina cambie el mensaje cada vez que cambio el valor de logueado
    let textoBoton = document.getElementById("userP");
    const horariosDisponibles = document.getElementById("reco-inicio-sesion");

    if(usuarioQueIngreso) {
    document.getElementById("usuario-logueado").innerHTML = `Hola ${sessionStorage.getItem("usuarioSesion")}, ¿Vas a jugar? ¿Cuándo?
    Elige una fecha: `   
    textoBoton.textContent =` ${sessionStorage.getItem("usuarioSesion")}`;
    canchas.classList.toggle("oculto");
    horariosDisponibles.classList.toggle("animado");
    horariosDisponibles.textContent = `Veamos qué turnos hay disponibles para ti`; 
    }


  
   
// cambiar todas las fechas cada vez que elijan una fecha en la tabla. 

let fechaInput = document.getElementById('fecha-turno');

fechaInput.addEventListener('change', function(){
    let nos = document.querySelectorAll('.no');
        nos.forEach(function(no) {
            // no.disabled = false;
            no.classList.remove("no");
            no.value == "Reservar" ? no.value = "Reservado" : no.value = "Reservar" ;

            
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
       
        this.value == "Reservar" ? this.value = "Reservado" : this.value = "Reservar";
        this.classList.toggle('no');
        // this.disabled = true;
       
    });
});

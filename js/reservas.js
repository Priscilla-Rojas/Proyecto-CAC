// toda esta rutina para conseguir la fecha de hoy

const fecha = Date.now();
const fechaActual = new Date(fecha);
let hoyAnio = fechaActual.getFullYear();
let hoyMes = fechaActual.getMonth()+1 ;
let mes = hoyMes < 10 ? "0"+hoyMes : hoyMes;
let hoyDia = fechaActual.getDate();
let dia = hoyDia < 10 ? "0"+hoyDia : hoyDia;
let hoy = hoyAnio+"-"+mes+"-"+dia;
let fechaSeleccionada = fechar(hoy)


document.getElementById("fecha-turno").value = hoy;
document.getElementById("fecha-turno").min = hoy;

function fechar(p){
    p = p.slice(-2)+"/"+ p.substr(5,2) +"/"+ p.substr(0,4)
    return p
   
};

// cambiar todas las fechas cada vez que elijan una fecha en la tabla. 
let fechaInput = document.getElementById('fecha-turno');

fechaInput.addEventListener('change', function(){
let elementos = document.querySelectorAll('.fe-turno');
    elementos.forEach(function(elemento) {
        elemento.textContent = fechar(fechaInput.value);
      }
      );
    fechaSeleccionada = fechaInput.value
    }
);

// función asincrónica para dibujar las canchas...!!!

    const obtenerCanchas = async (url) => {
        //Manejo de error
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
      
      const estructuraCanchas = document.getElementById("canchas");
      const url = 'http://localhost:3000/canchaTurnos/';
      obtenerCanchas(url)
        .then(data => {
          data.forEach((cancha) => {
            const turnosEnOrden = cancha.TURNOS.reverse();
            const c = parseInt(cancha.ID_CANCHA) -1
            const div = document.createElement('div');
            div.setAttribute('class', 'cancha');
            div.setAttribute('id', `${cancha.NOMBRE_CANCHA}`);
            div.innerHTML = `
              <h4>${cancha.NOMBRE_CANCHA}</h4>
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
                <tbody id="tbody-cancha-${cancha.ID_CANCHA}">
                </tbody>
              </table>
              <a class="volver" href="#">Volver</a>`;
      
            const tbody = div.querySelector(`#tbody-cancha-${cancha.ID_CANCHA}`);
            const maxTurnos = cancha.TURNOS.length;
      
            for (let i = 0; i < maxTurnos; i++) {
              const idBoton = i + 1 + parseInt(maxTurnos) * c
              const turno = cancha.TURNOS[i];
              const tr = document.createElement('tr');
              tr.innerHTML = `
                <td class="fe-turno" id="fe-c${cancha.ID_CANCHA}-t${i+1}">${fechar(hoy)}</td>
                <td class="or-turno" id="or-c${cancha.ID_CANCHA}-t${i+1}">${turno.TURNO_NOMBRE}</td>
                <td class="de-turno" id="de-c${cancha.ID_CANCHA}-t${i+1}">${turno.TURNO_INICIO.slice(0,5)}</td>
                <td class="ha-turno" id="ha-c${cancha.ID_CANCHA}-t${i+1}">${turno.TURNO_FIN.slice(0,5)}</td>
                <td class="re-turno" id="re-c${cancha.ID_CANCHA}-t${i+1}">
                  <input type="button" class="turno-disponible" value="Reservar" id="${idBoton}">
                </td>
              `;
              tbody.appendChild(tr);
            }
      
            estructuraCanchas.appendChild(div);
          });
        });


        // Validación de usuario hardcodeada

    let usuarioQueIngreso = sessionStorage.getItem("usuarioSesion")
    console.log(sessionStorage.getItem("usuarioSesion"))
    let DNI_Usuario = '12345672'
    console.log(DNI_Usuario)
  
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
    
  
    // fetch para traer las reservas registradas

    fechaInput.addEventListener('change', function(){

    const obtenerReservas = async (url) => {
        //Manejo de error
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
      const url2 = 'http://localhost:3000/reservas/';
      obtenerReservas(url2)
        .then(data => {
                 
         const reservasDelDia = data.filter(data => data.fecha.slice(0,10) === fechaInput.value )
         
         const botones = document.querySelectorAll(".turno-disponible")
        
         botones.forEach(elemento => {
        
          const idTurnoCancha = parseInt(elemento.id)
        
          const reservasDia = reservasDelDia.find(o => o.ID_turno_cancha === idTurnoCancha)
  
          if (reservasDia) { 
                    elemento.value = reservasDia.estado
          } else {
                  elemento.value = "Reservar"
          }


            })
         
          })
        })        
            
            
        const registroReserva = async (DNI, fechaTurno, Id_TC, estado) => {
          const url2 = 'http://localhost:3000/reservas/';
          const method = 'POST';
          const body = JSON.stringify({
              DNI_usuario: DNI,
              fecha: fechaTurno,
              ID_turno_cancha: Id_TC,
              estado: "Reservado"
          });
      
          try {
              const response = await fetch(url2, {
                  method: method,
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: body
              });
      
              if (!response.ok) {
                  throw new Error('No hay respuesta del servidor: ' + response.statusText);
              }
      
              const data = await response.json();
              console.log('Reserva realizada:', data);
          } catch (error) {
              console.error('Error en la reserva:', error);
          }
      };
      
      // Asignar el evento de click a los botones de reserva

      document.addEventListener('click', (event) => {
          if (event.target.classList.contains('turno-disponible')) {
              const Id_TC = event.target.id;
              const fechaTurno = fechaInput.value;
              registroReserva(DNI_Usuario, fechaTurno, Id_TC, "Reservado");
              alert("Reserva realizada con éxito");
              
              obtenerReservas(url2)
          }

      });
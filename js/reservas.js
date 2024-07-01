// fecha de hoy
const fecha = Date.now();
const fechaActual = new Date(fecha);
let hoyAnio = fechaActual.getFullYear();
let hoyMes = fechaActual.getMonth()+1 ;
let hoyDia = fechaActual.getDate();
let mes = hoyMes < 10 ? "0"+hoyMes : hoyMes;
let dia = hoyDia < 10 ? "0"+hoyDia : hoyDia;
let hoy = hoyAnio+"-"+mes+"-"+dia;
let fechaSeleccionada = fechar(hoy);

// definiendo como valor predeterminado y minimo la fecha del dia de hoy
document.getElementById("fecha-turno").value = hoy;
document.getElementById("fecha-turno").min = hoy;

// Funcion para revertir el formato de fecha: aaaa/mm/dd => dd/mm/aaaa
function fechar(p){
    p = p.slice(-2)+"/"+ p.substr(5,2) +"/"+ p.substr(0,4)
    // console.log(p)
    return p
};

// Selecionar la fecha del input type date.y cambiarlo de manera automatica para ver los turnos
let fechaInput = document.getElementById('fecha-turno');
fechaInput.addEventListener('change', function(){
  let elementos = document.querySelectorAll('.fe-turno');
  elementos.forEach(function(elemento) {
    elemento.textContent = fechar(fechaInput.value);
  });
  fechaSeleccionada = fechaInput.value
});

// Validación de usuario 
const sesion = localStorage.getItem('sesionIniciada');
const usuarioName = localStorage.getItem('nombre');
const userMail = localStorage.getItem('mail');

const horariosDisponibles = document.getElementById("reco-inicio-sesion");
if(sesion) {
  document.getElementById("usuario-logueado").innerHTML = `Hola ${usuarioName}, ¿Vas a jugar? ¿Cuándo?
  Elige una fecha: `; 
  canchas.classList.toggle("oculto");
  horariosDisponibles.classList.toggle("animado");
  horariosDisponibles.textContent = `Veamos qué turnos hay disponibles para ti`; 
}else{
  horariosDisponibles.textContent = 'Para ver los horarios y canchas disponibles debes iniciar sesión';
  horariosDisponibles.href = './login.html'
}

// Funcion que genera una tabla html en base a las canchas que se pasen por parametro
const createTablaCanchas = (canchas)=>{
  const estructuraCanchas = document.getElementById("canchas");
  canchas.forEach( cancha => {
    const containerTable = document.createElement('div');
    const titleTable = document.createElement('h4');
    titleTable.textContent = cancha.NOMBRE_CANCHA;
    containerTable.classList.add('cancha');
    containerTable.id=`${cancha.NOMBRE_CANCHA}`;
    containerTable.appendChild(titleTable);
    const table = document.createElement('table');
    table.classList.add('horario');
    table.id = `horario-cancha-${cancha.NOMBRE_CANCHA}`;
    const headers = ['Fecha', 'Turno', 'Desde', 'Hasta', 'Reservar']
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    headers.map( (header, index) =>{
      const td = document.createElement('td');
      td.textContent = `${header}`;
      td.classList.add(`head-column${index+1}`);
      td.id = `head-${header.toLowerCase()}-${cancha.ID_CANCHA}`;
      tr.appendChild(td)
    })
    thead.appendChild(tr);
    containerTable.appendChild(thead)
    const tbody = document.createElement('tbody');
    tbody.id = `tbody-cancha-${cancha.ID_CANCHA}`;
    cancha.TURNOS.reverse().map( turno =>{
      const trBody = document.createElement('tr');
      trBody.classList.add('row-data')
      const column = ['fe', 'or', 'de', 'ha', 're']
      column.map( (item, index)=>{
        const td = document.createElement('td');
        td.classList.add(`${item}-turno`);
        td.id = `${item}-c${cancha.ID_CANCHA}-t${index+1}`;
        if(item === column[0]) td.textContent = `${fechar(hoy)}`;
        if(item === column[1]) td.textContent = `${turno.TURNO_NOMBRE}`;
        if(item === column[2]) td.textContent = `${turno.TURNO_INICIO.slice(0,5)}`;
        if(item === column[3]) td.textContent = `${turno.TURNO_FIN.slice(0,5)}`;
        if(item === column[4]){
          const input = document.createElement('input');
          input.type = 'button';
          input.classList.add('turno-disponible');
          input.value = 'Reservar';
          input.id = `${cancha.NOMBRE_CANCHA}_${turno.TURNO_NOMBRE}`;
          td.appendChild(input);
        };
        trBody.appendChild(td)
      })
      tbody.appendChild(trBody);
    })
    table.appendChild(thead);
    table.appendChild(tbody);
    containerTable.appendChild(table);
    estructuraCanchas.appendChild(containerTable);
  })
}
// ordenar las reservas
const groupReservasByFecha = (reservas)=>{
  let reservasByFecha = {};
  reservas.forEach( (reserva) =>{
    const nombreCancha = reserva.cancha.Nombre_cancha;
    let fecha = '';
    fecha = reserva.fecha.slice(0, 10);
    fecha = fecha.split('-').reverse();
    if(fecha[0].length < 2) fecha[0] = `0${fecha[0]}`;
    if(fecha[1].length < 2) fecha[1] = `0${fecha[1]}`;
    fecha = fecha.join('/');
    if (!reservasByFecha[fecha]){
      reservasByFecha[fecha] = {
        [nombreCancha]: {
          [reserva.ID]:{
            usuario: reserva.mail_usuario,
            estado: reserva.estado,
            turno: {...reserva.turno, Fin: reserva.turno.Fin.slice(0, 5), Inicio: reserva.turno.Inicio.slice(0, 5)}
          }
        },
      }
    }else if ( reservasByFecha[fecha] ){
      if(reservasByFecha[fecha][nombreCancha]){
        reservasByFecha[fecha][nombreCancha][reserva.ID] = {
          usuario: reserva.DNI_usuario,
          estado: reserva.estado,
          turno: {...reserva.turno, Fin: reserva.turno.Fin.slice(0, 5), Inicio: reserva.turno.Inicio.slice(0, 5)}
        }
      }else{
        reservasByFecha[fecha][nombreCancha] = {
          [reserva.ID]:{
            usuario: reserva.DNI_usuario,
            estado: reserva.estado,
            turno: {...reserva.turno, Fin: reserva.turno.Fin.slice(0, 5), Inicio: reserva.turno.Inicio.slice(0, 5)}
          }
        }
      }
    }
  })
  return reservasByFecha;
}
const checkDisponibilidad = (elemntsHTML, reservas)=>{
  elemntsHTML.forEach( element=>{
    const cancha = element.children[0].id.slice(3,5).split('');
    const turnoRow = element.children[1].textContent;
    const nameCanchaRow = `Cancha-${cancha[1]}`;
    const fechaRow = element.children[0].textContent;
    const buttonRow =element.children[4].children[0];
    if(reservas[fechaRow]){
      if(reservas[fechaRow][nameCanchaRow]){
        const reservasInCancha = reservas[fechaRow][nameCanchaRow]
        for (const reserva in reservasInCancha) {
          const estado = reservasInCancha[reserva].estado;
          const turno = reservasInCancha[reserva].turno.Nombre_turno;

          if(estado === 'Reservado' && turno === turnoRow ){
            buttonRow.value = 'No disponible';
            buttonRow.disabled = true;
            buttonRow.classList.add('disabled')
          }else if(estado !== 'Reservado' && turno !== turnoRow){
            buttonRow.value = 'Reservar';
            buttonRow.disabled = false;
            buttonRow.classList.remove('disabled');
          }
        }

      }else{
        buttonRow.value = 'Reservar';
        buttonRow.disabled = false;
        buttonRow.classList.remove('disabled');
      }
    }else{
      buttonRow.value = 'Reservar';
      buttonRow.disabled = false;
      buttonRow.classList.remove('disabled');
    }
  })
}
// FETCHS
// función asincrónica para obtener las CANCHAS Y RESERVAS con fetch...!!!
const obtenerCanchas = async () => {
  const url = 'http://localhost:3009/canchaTurnos/';
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
const obtenerReservas = async () => {
  const url = 'http://localhost:3009/reservas/'
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
const realizarReserva = async(mail_usuario, fecha, nombre_cancha, nombre_turno, estado)=>{
  const url = 'http://localhost:3009/reservas';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mail_usuario, fecha, nombre_cancha, nombre_turno, estado }),
  });
  if (response.ok) {
    const data = await response.json();
    return {reservaCreada: data.idReserva, nombre_cancha, nombre_turno };
  } else {
      console.error('Error surgio un error al crear la reserva intentalo nuevamente');
  }
}
const eliminarReserva = async(id)=>{
  const url = `http://localhost:3009/reservas/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  if (response.ok) {
    // const data = await response.json();
    return {idReserva: id, message: `La reserva con se ha borrado correctamente`};
  } else {
      console.error('Error surgio un error al crear la reserva intentalo nuevamente');
  }
}
obtenerCanchas()
  .then(data => {
    createTablaCanchas(data);
  });
  
obtenerReservas()
  .then(data => {
    const reservasOrder = groupReservasByFecha(data);
    console.log()
    const rowsTable = document.querySelectorAll('.row-data');
    checkDisponibilidad(rowsTable, reservasOrder)      
  })

fechaInput.addEventListener('change', function(){
  obtenerReservas()
    .then(data => {
      const reservasOrder = groupReservasByFecha(data);
      const rowsTable = document.querySelectorAll('.row-data');
      checkDisponibilidad(rowsTable, reservasOrder)      
    })
});

// Asignar el evento de click a los botones de reserva
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('turno-disponible')) {
    console.log(event.target.id)
    const Id_TC = event.target.id.split('_');
    const nombreCancha = Id_TC[0];
    const nombreTurno = Id_TC[1];
    const fechaTurno = fechaInput.value;
    event.target.classList.remove('turno-disponible');
    event.target.classList.add('turno-no-disponible');
    event.target.value = '¿Cancelar?';

    realizarReserva(userMail, fechaTurno, nombreCancha, nombreTurno, "Reservado")
      .then( response => {
        sessionStorage.setItem(`${response.nombre_cancha}_${response.nombre_turno}`, JSON.stringify(response));
        alert(`Se realizao la reserva de la ${response.nombre_cancha} en el ${response.nombre_turno}`)
      })

  }else if (event.target.classList.contains('turno-no-disponible')){
    const idButoon = event.target.id;
    const reserva = JSON.parse(sessionStorage.getItem(`${idButoon}`));
    event.target.classList.remove('turno-no-disponible');
    event.target.classList.add('turno-disponible');
    event.target.value = 'Reservar';
    
    eliminarReserva(reserva.reservaCreada)
    .then( response => {
      alert(`se ha cancelado la reserva de la ${reserva.nombre_cancha} en el turno ${reserva.nombre_turno}`)
      reserva ? sessionStorage.removeItem(`${idButoon}`) : alert(`Reserva no enocontrada`);
      })
  }
});
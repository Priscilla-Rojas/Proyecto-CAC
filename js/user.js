const foto = document.getElementById('foto');
const myName = document.getElementById('myName');
const dni = document.getElementById('dni');
const mail = document.getElementById('mail');
const password = document.getElementById('password');
const reservas = document.getElementById('reservas');
const myReservas = document.getElementById('myReservas');
const perfil = document.getElementById('img-Name-User');
const myperfil = document.getElementById('myperfil');
const formNewUserName = document.getElementById('formNewUserName');
const pencil = document.getElementById('pencil');
const locationUser = window.location.hash;
const tokenUser = localStorage.getItem('token');

const Auth = async () => {
  const url = 'http://localhost:3009/auth/user';
  //Manejo de error
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': tokenUser
      }
    });
    if (!response.ok) {
      throw new Error('No hay respuesta del servidor' + response.statusText);
    }
    const data = await response.json();
    return data.auth;
  } catch (error) {
    console.error('la petición de datos arroja el siguiente error:', error);
  }
};

const access = Auth();

if(!access){
  window.location.href = './login.html';
}

const toglleClassList = (itemActive, itemInactive)=>{
  itemActive.classList.remove('hidden')
  itemInactive.classList.add('hidden')
}

locationUser === '#myReservas' && toglleClassList(myReservas, myperfil);
locationUser === '#myperfil' && toglleClassList(myperfil, myReservas)

perfil.addEventListener('click', ()=> toglleClassList(myperfil, myReservas))
reservas.addEventListener('click', ()=> toglleClassList(myReservas, myperfil))

pencil.addEventListener('click', ()=>{
  const form = document.getElementById('newUserName');
  form.classList.remove('hidden');
})

formNewUserName.addEventListener('submit', (event)=>{
  event.preventDefault();
  const newName = document.getElementById('newName').value;
  console.log(newName)
  updateUsername(newName);
  const form = document.getElementById('newUserName');
  const nameUSer = document.getElementById('nameUSer');
  nameUSer.textContent = newName
  form.classList.add('hidden');

})

const updateUsername = async (newUsername) => {
  const token = localStorage.getItem('token');
  const mail = localStorage.getItem('mail');
  
  try {
    const response = await fetch('http://localhost:3009/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newUsername, mail }),
    });

    const data = await response.json();
    alert(data.message); // Muestra la respuesta del servidor en la consola
    
  } catch (error) {
    console.error('Error al intentar actualizar el nombre de usuario:', error);
    // Manejo de errores
  }
};


// Creacion Perfil
const img = document.createElement('img');
const url = localStorage.getItem('foto');
img.src = url;
const pName = document.createElement('p');
const nameUser = localStorage.getItem('nombre');
pName.id = 'nameUSer';
pName.textContent = nameUser;
const pDni = document.createElement('p');
const dniUser = localStorage.getItem('dni')
pDni.textContent = dniUser;
const pMail =document.createElement('p');
const mailUSer = localStorage.getItem('mail');
pMail.textContent = mailUSer;
const pPassword = document.createElement('p');
const passUser = localStorage.getItem('password');
pPassword.textContent = passUser;


foto.appendChild(img);
myName.append(pName);
dni.append(pDni);
mail.append(pMail);
password.append(pPassword);

const calcelarReserva = async (id) => {
  const url = `http://localhost:3009/reservas/${id}`
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ estado: 'Cancelado' }),
  });
  console.log(response)
  //Manejo de error
  if (response.ok) {
    // Manejar la respuesta exitosa
    const data = await response.json();
    return data;;
  } else if (!response.ok){
    throw new Error('No se pudo cancelar la reserva' + response.statusText);
  } else {
      // Manejar errores
      console.error('error con el servidor');
  }
}
const getMyReservas = async () => {
  const url = `http://localhost:3009/reservas/user/${mailUSer}`
  //Manejo de error
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('No se encontraron reservas' + response.statusText);
    }
    return data;
  } catch (error) {
    console.error('la petición de datos arroja el siguiente error:', error);
  }
}

const htmlReservations = (reservas)=>{
  reservas.forEach(reserva => {
    const div = document.createElement('div');
    div.classList.add('reserva');

    const divRow = document.createElement('div');
    divRow.classList.add('fila');
    divRow.classList.add('date');

    const divDate = document.createElement('div');
    const h4 = document.createElement('h4');
    h4.textContent = 'Fecha:'
    const p = document.createElement('p');
    const fecha = reserva.fecha.slice(0, 10).split('-').reverse().join('-');
    p.textContent = fecha;
    divDate.classList.add('data');
    divDate.appendChild(h4);
    divDate.append(p);
    
    const divCancha = document.createElement('div');
    const h4Cancha = document.createElement('h4');
    h4Cancha.textContent = 'Cancha:'
    const pCancha = document.createElement('p');
    const cancha = reserva.nombre_cancha.split('-');
    pCancha.textContent = cancha[1];
    divCancha.classList.add('cancha');
    divCancha.classList.add('data');
    divCancha.appendChild(h4Cancha);
    divCancha.append(pCancha);

    const divRowDetails = document.createElement('div');
    divRowDetails.classList.add('fila');
    divRowDetails.classList.add('details');

    const divHorario = document.createElement('div');
    const h4Horario = document.createElement('h4');
    h4Horario.textContent = 'Hs:'
    const pHorario = document.createElement('p');
    const Inicio = reserva.inicio_turno.slice(0, 5);
    const Fin = reserva.fin_turno.slice(0, 5);
    pHorario.textContent = `${Inicio} - ${Fin}`;
    divHorario.classList.add('data');
    divHorario.appendChild(h4Horario);
    divHorario.append(pHorario);
    
    const divRowState = document.createElement('div');
    divRowState.classList.add('fila');
    divRowState.classList.add('state');

    const divState = document.createElement('div');
    divState.classList.add('data');
    const pState = document.createElement('p');
    const State = reserva.estado;
    divRowState.classList.add(State);
    pState.textContent = State;
    divState.append(pState);

    if(reserva.estado === 'Reservado'){
      const divCancel = document.createElement('div');
      divCancel.classList.add('data');
      const pCancel = document.createElement('p');
      divCancel.classList.add('Cancel');
      divCancel.classList.add(`reserva-${reserva.ID}`);
      pCancel.textContent = '¿Cancelar?';
      divCancel.append(pCancel);
      
      divRowState.append(divCancel);
    }
    

    divRow.append(divDate);
    divRowDetails.append(divCancha);
    divRowDetails.append(divHorario);
    divRowState.append(divState);

    div.append(divRow);
    div.append(divRowDetails);
    div.append(divRowState);
    myReservas.append(div);
    
  });
}
const ordenarReservas = (reservas)=>{
  const hoy = new Date();
  
  let reservadas = [];
  let cumplidasOCanceladas = [];

  reservas.forEach(reserva => {
      if (reserva.estado === "Reservado") {
          reservadas.push(reserva);
      } else if (reserva.estado === "Cumplido" || reserva.estado === "Cancelado") {
          cumplidasOCanceladas.push(reserva);
      }
  });

  reservadas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  
  cumplidasOCanceladas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  return {
      reservadas: reservadas,
      cumplidasOCanceladas: cumplidasOCanceladas
  };
}


getMyReservas()
.then( response => {
  // console.log(response)
  sessionStorage.setItem('myReservatons', JSON.stringify(response));
  
  const reserbasOrdenadas=ordenarReservas(response)
  htmlReservations(reserbasOrdenadas.reservadas)
  htmlReservations(reserbasOrdenadas.cumplidasOCanceladas)
})

document.addEventListener('click', (event) => {
  if(event.target.classList.contains('Cancel')){
    const  idReserva = event.target.classList[2].split('-')[1];
    console.log(idReserva)
    calcelarReserva(idReserva);
    location.reload();
  }
})

const foto = document.getElementById('foto');
const myName = document.getElementById('myName');
const dni = document.getElementById('dni');
const mail = document.getElementById('mail');
const password = document.getElementById('password');
const reservas = document.getElementById('reservas');
const myReservas = document.getElementById('myReservas');
const perfil = document.getElementById('img-Name-User');
const myperfil = document.getElementById('myperfil');
const locationUser = window.location.hash;
console.log(locationUser)

if(!localStorage.getItem('token')){
  alert('Acceso denegado');
  sessionStorage.clear();
  window.location.href = './login.html';
}

if(locationUser === '#myReservas' ){
  myReservas.classList.remove('hidden')
  myperfil.classList.add('hidden')
}
if(locationUser === '#myperfil' ){
  myperfil.classList.remove('hidden')
  myReservas.classList.add('hidden')
}
perfil.addEventListener('click', ()=>{
  console.log('escuchando perfil')
  myperfil.classList.remove('hidden')
  myReservas.classList.add('hidden')
})
reservas.addEventListener('click', ()=>{
  console.log('escuchando reservas')
  myReservas.classList.remove('hidden')
  myperfil.classList.add('hidden')
})

// Creacion Perfil
const img = document.createElement('img');
const url = localStorage.getItem('foto');
img.src = url;
const pName = document.createElement('p');
const nameUser = localStorage.getItem('nombre');
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
  console.log(reservas)
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
    const h4State = document.createElement('h4');
    h4State.textContent = 'Estado:'
    const pState = document.createElement('p');
    const State = reserva.estado;
    divRowState.classList.add(State);
    pState.textContent = State
    divState.append(h4State);
    divState.append(pState);

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


getMyReservas()
  .then( response => {
    // console.log(response)
    sessionStorage.setItem('myReservatons', JSON.stringify(response));
    htmlReservations(response)
})
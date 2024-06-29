let reservas = [];
let reservasOrder = {};


const getReservas1 = ()=>{
  return 
}


const getReservas = async() => {
  const url = 'http://localhost:3009/reservas';
  
  try {

    const response = await fetch(url);
    if(!response.ok) throw new Error('Fallo la peticion', response.statusText);
    const data = await response.json();
    return newReservas;

  } catch (error) {
    console.log('Hubo un problema', err)
  }
  
};

const groupReservasByFecha = (reservas)=>{
  let reservasByFecha = {};
  reservas.forEach( (reserva) =>{
    const nombreCancha = reserva.cancha.Nombre_cancha;
    let fecha = '';
    fecha = reserva.fecha.slice(0, 10);
    fecha = fecha.split('-').reverse();
    if(fecha[0].length < 2) fecha[0] = `0${fecha[0]}`;
    if(fecha[1].length < 2) fecha[1] = `0${fecha[1]}`;
    fecha = fecha.join('-');

    if (!reservasByFecha[fecha]){
      reservasByFecha[fecha] = {
        [nombreCancha]: {
          [reserva.ID]:{
            usuario: reserva.DNI_usuario,
            estado: reserva.estado,
            turno: {...reserva.turno, Fin: reserva.turno.Fin.slice(0, 9), Inicio: reserva.turno.Inicio.slice(0, 9)}
          }
        },
      }
    }else if ( reservasByFecha[fecha] ){
      if(reservasByFecha[fecha][nombreCancha]){
        reservasByFecha[fecha][nombreCancha][reserva.ID] = {
          usuario: reserva.DNI_usuario,
          estado: reserva.estado,
          turno: {...reserva.turno, Fin: reserva.turno.Fin.slice(0, 9), Inicio: reserva.turno.Inicio.slice(0, 9)}
        }
      }else{
        reservasByFecha[fecha][nombreCancha] = {
          [reserva.ID]:{
            usuario: reserva.DNI_usuario,
            estado: reserva.estado,
            turno: {...reserva.turno, Fin: reserva.turno.Fin.slice(0, 9), Inicio: reserva.turno.Inicio.slice(0, 9)}
          }
        }
      }
    }
  })
  return reservasByFecha;
}

(async () => {
  reservas = await getReservas();
  groupReservasByFecha(reservas);
  console.log(reservasOrder)
})();

console.log(reservasOrder)
// export { reservas, reservasOrder };

// export { reservas, reservasOrder };

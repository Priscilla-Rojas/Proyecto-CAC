// usuario.js

document.addEventListener('DOMContentLoaded', () => {
    // Lógica para cargar y mostrar los datos del usuario y sus reservas
    obtenerDatosUsuario(); // Función para obtener y mostrar datos personales del usuario
    obtenerReservas(); // Función para obtener y mostrar las reservas del usuario
});

const obtenerDatosUsuario = () => {
    // Aquí puedes realizar una solicitud HTTP (por ejemplo, con fetch o axios)
    // para obtener los datos del usuario desde tu backend
    // y luego actualizar el contenido en el DOM.
    // Ejemplo básico:
    const usuarioSesion = sessionStorage.getItem('usuarioSesion');
    if (usuarioSesion) {
        // Simulación de datos del usuario (debes adaptarlo a tu lógica real)
        const datosUsuario = {
            nombre: 'Usuario Ejemplo',
            email: 'usuario@example.com',
            telefono: '123456789'
        };

        const datosUsuarioHTML = `
            <p><strong>Nombre:</strong> ${datosUsuario.nombre}</p>
            <p><strong>Email:</strong> ${datosUsuario.email}</p>
            <p><strong>Teléfono:</strong> ${datosUsuario.telefono}</p>
        `;
        
        document.getElementById('datos-personales').innerHTML = datosUsuarioHTML;
    } else {
        // Manejar caso donde no hay sesión de usuario
        console.error('No se encontró sesión de usuario');
    }
};

const obtenerReservas = () => {
    // Simulación de datos de reservas (debes adaptarlo a tu lógica real)
    const reservas = [
        { id: 1, fecha: '2024-07-15', cancha: 'Cancha 1' },
        { id: 2, fecha: '2024-07-20', cancha: 'Cancha 2' }
    ];

    // Generar HTML para mostrar las reservas
    let reservasHTML = '';
    reservas.forEach(reserva => {
        reservasHTML += `<li>${reserva.fecha} - ${reserva.cancha}</li>`;
    });

    document.getElementById('lista-reservas').innerHTML = reservasHTML;
};

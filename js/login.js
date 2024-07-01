const form = document.getElementById('loginForm');
const mail = document.getElementById('userMail');
const contraseña = document.getElementById('password');
const remember = document.getElementById('remember');
let userInfo;

if(localStorage.getItem('mail')){
    mail.value = localStorage.getItem('mail');
    remember.checked = true;
}

remember.addEventListener('change', ()=>{
    if(remember.checked){
        localStorage.setItem('mail', mail.value);
        console.log(mail)
    }else{
        localStorage.removeItem('mail');
        mail.value = ''
    }
})

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const response = await fetch('http://localhost:3009/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail: mail.value, contraseña: contraseña.value }),
    });

    if (response.ok) {
        // Manejar la respuesta exitosa
        const data = await response.json();
        // localStorage.removeItem('token')
        console.log('Inicio de sesión exitoso:', data);
        if(isTokenValid(data.token)){ 
            console.log('token valido')
            const { payload } = decodeToken(data.token);
            localStorage.setItem('token', data.token)
            localStorage.setItem('foto', payload.foto);
            localStorage.setItem('mail', payload.mail);
            localStorage.setItem('nombre', payload.nombre_completo);
            localStorage.setItem('sesionIniciada', true);
            console.log(window.location)
            window.location.href = './reservas.html';
        }else{
            console.log('token invalido')
        }
    } else {
        // Manejar errores
        console.error('Error en el inicio de sesión');
    }
});

function decodeToken(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Token inválido');
    }
    // Decodificar encabezado y payload
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    // console.log(payload)
    return { header, payload };
}

function isTokenValid(token) {
    try {
        const { payload } = decodeToken(token);

        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp && currentTime > payload.exp) {
            console.error('El token ha expirado');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
    }
}

const token = localStorage.getItem('token');
isTokenValid(token)


if (isTokenValid(token)) {
    const { payload } = decodeToken(token);
    localStorage.setItem('foto', payload.foto);
    localStorage.setItem('mail', payload.mail);
    localStorage.setItem('nombre', payload.nombre_completo);
    localStorage.setItem('sesionIniciada', true);
    // console.log('El token es válido');
} else {
    localStorage.removeItem('token')
    localStorage.removeItem('foto');
    localStorage.removeItem('nombre');
    localStorage.removeItem('sesionIniciada');
    console.log('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
    // window.location.href = '/login.html';
    console.log('El token no es válido');
}


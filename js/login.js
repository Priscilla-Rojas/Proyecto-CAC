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
        localStorage.setItem('remember', true);
    }else{
        localStorage.removeItem('mail');
        localStorage.removeItem('remember');
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
        
        if(isTokenValid(data.token)){
            const { payload } = decodeToken(data.token);
            const pass = payload.password.length;
            const cifrado = '*'.repeat(pass)
            
            console.log( pass, cifrado)
            localStorage.setItem('token', data.token)
            localStorage.setItem('foto', payload.foto);
            localStorage.setItem('mail', payload.mail);
            localStorage.setItem('nombre', payload.nombre_completo);
            localStorage.setItem('dni', payload.dni);
            
            localStorage.setItem('password', cifrado);
            localStorage.setItem('sesionIniciada', true);
            console.log(window.location)
            window.location.href = './reservas.html';
        }else{
            console.log('token invalido')
        }
    } else if(!response.ok){
        const data = await response.json();
        !data.auth && alert('Verifique su usuario y/o contraseña') 
    }else{
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
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}

const token = localStorage.getItem('token');
// isTokenValid(token)


if (isTokenValid(token)) {
    const { payload } = decodeToken(token);
        localStorage.setItem('token', data.token)
        localStorage.setItem('foto', payload.foto);
        localStorage.setItem('mail', payload.mail);
        localStorage.setItem('nombre', payload.nombre_completo);
        localStorage.setItem('dni', payload.dni);
        localStorage.setItem('password', payload.password);
        localStorage.setItem('sesionIniciada', true);
        window.location.href = './reservas.html';
    // console.log('El token es válido');
} else {
    const rememberMail = localStorage.getItem('remember') ? true : false;
    let check;
    if(rememberMail) check = localStorage.getItem('mail');
    localStorage.clear()
    if (rememberMail) {
        localStorage.setItem('mail', check);
        localStorage.setItem('remember', true);
    }
}


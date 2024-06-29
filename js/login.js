const remember = document.getElementById('remember');
const inputMail = document.getElementById('mailUsuario');
// verificar si el recordarme esta seccionado y en base a eso usar el local storage para recuperar- guardar el mail
console.log(localStorage.getItem('mail'))
if(localStorage.getItem('mail')){
    inputMail.value = localStorage.getItem('mail');
    remember.checked = true;
}

remember.addEventListener('change', ()=>{
    if(remember.checked){
        const mail = inputMail.value;
        localStorage.setItem('mail', mail);
        console.log(mail)
    }else{
        localStorage.removeItem('mail');
        inputMail.value = ''
    }
})



const verificarUsuario = (v1, v2, array) => {
    for (let element of array) {
        if (element.email === v1 && element.clave === v2) {
            var usuarioLogueado = element.nombreCompleto;
            var DNI_Usuario = element.DNI_usuario
            sessionStorage.setItem("usuarioSesion", usuarioLogueado)
            sessionStorage.setItem("DNISesion", DNI_Usuario);
            return true;
        }
    }
    sessionStorage.setItem("usuarioSesion", "");
    return false;
};

const verificar = () => {
    let mail = document.getElementById("mailUsuario").value;
    let pass = document.getElementById("passUsuario").value;

    if (verificarUsuario(mail, pass, usuarios)) {
        setTimeout(
            alert(`Bienvenido ${sessionStorage.getItem("usuarioSesion")}!`),
            1500
        );
    } else {
        setTimeout(
            alert(`Usuario o contraseña incorrecto. Intente nuevamente o Regístrate`),
            1500
        );
        sessionStorage.setItem("usuarioSesion", "");
    }
};

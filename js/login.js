const verificarUsuario = (v1, v2, array) => {
    for (let objeto of array) {
        if (objeto.email === v1 && objeto.clave === v2) {
            var usuarioLogueado = objeto.nombreCompleto;
            var DNI_Usuario = objeto.DNI_usuario
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

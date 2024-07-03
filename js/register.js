const form = document.getElementById('form');


form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const  DNI = document.getElementById('DNI').value;
  const  mail = document.getElementById('mail').value;
  const  nombre_completo = document.getElementById('nombre_completo').value;
  const  foto = document.getElementById('foto').value;
  const  password = document.getElementById('password').value;
  const response = await fetch('http://localhost:3009/auth/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ DNI, mail, nombre_completo, foto, password }),
  });

  if (response.ok) {
      // Manejar la respuesta exitosa
      const data = await response.json();
      alert('Usuario creado Correctamnete:');
  } else {
      // Manejar errores
      console.error('Error en el inicio de sesión');
  }
});
document.addEventListener('DOMContentLoaded', () => {
    fetchCanchas();
    const form = document.getElementById('cancha-form');
    form.addEventListener('submit', handleFormSubmit);

    const deleteButton = document.getElementById('delete-btn');
    deleteButton.addEventListener('click', handleCancel);

    const deleteCanchaBtn = document.getElementById('delete-cancha-btn');
    deleteCanchaBtn.addEventListener('click', handleDeleteCancha);
});

function fetchCanchas() {
    fetch(`http://localhost:3000/canchas`)
        .then(response => response.json())
        .then(data => {
            renderCanchas(data);
           // renderAddCard();
        })
        .catch(error => console.error('Error buscando canchas:', error));
}

function renderCanchas(canchas) {
    const container = document.getElementById('card-container');
    container.innerHTML = '';
    canchas.forEach(cancha => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${cancha.nombre}</h3>
            <p>Material: ${cancha.material}</p>
            <p>Cubierta: ${cancha.cubierta ? 'Sí' : 'No'}</p>
        `;
        card.addEventListener('click', () => editCancha(cancha.id, cancha.nombre, cancha.material, cancha.cubierta));
        container.appendChild(card);
    });
}

function renderAddCard() {
    const container = document.getElementById('card-container');
    const addCard = document.createElement('div');
    addCard.className = 'card add-card';
    addCard.innerHTML = '<h3>+</h3> <p>Agregar Cancha...</p>';
    addCard.addEventListener('click', () => {
        resetForm();
        document.getElementById('cancha-form').scrollIntoView({ behavior: 'smooth' });
    });
    container.appendChild(addCard);
}

function editCancha(id, nombre, material, cubierta) {
    document.getElementById('cancha-id').value = id;
    document.getElementById('cancha-nombre').value = nombre;
    document.getElementById('cancha-material').value = material;
    document.getElementById('cancha-cubierta').value = cubierta ? '1' : '0';
    document.getElementById('cancha-form').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    document.getElementById('cancha-id').value = '';
    document.getElementById('cancha-nombre').value = '';
    document.getElementById('cancha-material').value = '';
    document.getElementById('cancha-cubierta').value = '0';
}

function handleFormSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('cancha-id').value;
    const nombre = document.getElementById('cancha-nombre').value;
    const material = document.getElementById('cancha-material').value;
    const cubierta = document.getElementById('cancha-cubierta').value;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3000/canchas/${id}` : 'http://localhost:3000/canchas';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            material: material,
            cubierta: parseInt(cubierta)
        })
    })
    .then(response => response.json())
    .then(() => {
        
        resetForm();
        fetchCanchas();
        
       
    })
    .catch(error => console.error('Error:', error));
    
}

function handleCancel() {
    resetForm();
    location.reload();
    fetchCanchas()
}

function handleDeleteCancha() {
    const id = document.getElementById('cancha-id').value;

    if (!id) {
        alert('No hay ninguna cancha seleccionada para eliminar.');
        return;
    }

    if (!confirm('¿Estás seguro de que quieres eliminar esta cancha?')) {
        return;
    }

    fetch(`http://localhost:3000/canchas/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        resetForm();
        location.reload();
        fetchCanchas()
    })
    .catch(error => console.error('Error:', error));
}

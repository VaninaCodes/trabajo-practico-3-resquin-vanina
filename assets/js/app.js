// MODAL
const contenidoModal = document.getElementById("contenidoModal");
const urlApiGeneral = "https://thesimpsonsapi.com/api/characters";
const urlApiIndividual = "https://thesimpsonsapi.com/api/characters/1";

let personajes = [];
const rowCartas = document.getElementById("rowCartas");

const cargarPersonajes = async () => {
    try {
        const response = await fetch(urlApiGeneral);
        const data = await response.json();
        personajes = data.results;
        console.log(personajes);
        renderizarPersonajes(personajes);
    }
    catch (error) {
        console.log(error);
    }
};

const renderizarPersonajes = (lista) => {
    rowCartas.innerHTML = ""

    lista.forEach(personaje => {
        const imagen =`https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}`;

        rowCartas.innerHTML += `
            <div class="col-md-6 col-lg-4 col-xl-3 my-3" data-id=${personaje.id}>
                <div class="card h-100  w-100 card-simpson">
                    <img src="${imagen}" class="card-img-top" alt="${personaje.name}" />
                    <div class="card-body">
                        <h3 class="card-title">${personaje.name}</h3>
                        <p class="card-text">
                            <strong>Ocupación:</strong> ${personaje.occupation}<br>
                            <strong>Estado:</strong> ${personaje.status}
                        </p>
                        <div class="d-flex justify-content-center">
                            <button
                                class="btn btn-primary btn-lg btn-ver-detalle"
                                data-id="${personaje.id}">
                                Ver detalle
                            </button>
                        </div>
                    </div>
                </div>
            </div>`
        });
};

cargarPersonajes();

//BUSCADOR
const inputBuscador = document.querySelector("#inputBuscador")
const btnBuscador = document.querySelector("#btnBuscador")

const buscar = (arregloPersonajes) => {
    const texto = inputBuscador.value.toLocaleLowerCase().trim();

     if (texto === "") {
        alert("Ingrese un nombre para buscar");
        return;
    }

    const personajesFiltrados = arregloPersonajes.filter(personaje =>
        personaje.name.toLowerCase().includes(texto));

        if (personajesFiltrados.length === 0) {

        rowCartas.innerHTML = `
            <div class="col-12 text-center">
                <h2>No se encontraron personajes</h2>
            </div>
        `;

        return;
        }

        renderizarPersonajes(personajesFiltrados)
    }

btnBuscador.addEventListener("click", (e) => {
    e.preventDefault();
    buscar(personajes);
});

// MODAL
const mostrarModal = (personaje) => {
            const imagen = `https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}`;
            
            contenidoModal.innerHTML = `
            <div class="d-flex flex-column align-items-center justify-content-center">

                <img
                    src="${imagen}"
                    class="img-fluid mb-3"
                    style="max-height:300px">

                <h3>${personaje.name}</h3>
                <div class="text-align-left">
                    <p><strong>Edad:</strong> ${personaje.age}</p>

                    <p><strong>Fecha de nacimiento:</strong>
                    ${personaje.birthdate}</p>

                    <p><strong>Género:</strong>
                    ${personaje.gender}</p>

                    <p><strong>Ocupación:</strong>
                    ${personaje.occupation}</p>

                    <p><strong>Estado:</strong>
                    ${personaje.status}</p>

                    <p>
                        <strong>Frase:</strong>
                        ${personaje.phrases[0]}
                    </p>
                </div>
            </div>
        `;
        const modal = new bootstrap.Modal(
        document.getElementById("modalPersonaje")
        );

    modal.show();
};

// DETALLE MODAL
const obtenerDetalle = async (id) => {
    try {
        const response = await fetch(`https://thesimpsonsapi.com/api/characters/${id}`);
        
        const personaje = await response.json();

        //console.log(personaje);
        mostrarModal(personaje);
    }
    catch (error) {
        console.log(error);
    }
};

rowCartas.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-ver-detalle")) {

        const id = e.target.dataset.id;

        obtenerDetalle(id);

    }
});


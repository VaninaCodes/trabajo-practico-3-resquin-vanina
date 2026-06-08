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
// https://pokeapi.co/api/v2/pokemon/id

async function obtenerPokemon(limit, offset) {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`

    // primero hacemos el fetch al api para obtener los datos
    const res = await fetch(url);
    // ahora estos datos estan en formato json, usando el metodo
    // .json() podemos convertirlo a un objeto de javascript
    const data = await res.json();

    // console.log("res:", res);
    // console.log("data:", data);

    // ahora obtener el arreglo con los pokemon
    const pokemon = data.results;

    console.log(pokemon);

    return pokemon;
}

async function obtenerUnPokemon(url) {
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

function generarTipos(types) {
    let html = "";

    for (const i in types) {
        html = html.concat(`<button class="btn btn-primary"><b>${capitalizeFirstLetter(types[i].type.name)}</b></button>\n`);
    }

    return html;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function renderCard(limit, offset) {
    // obtener lista de pokemon
    const pokemon = await obtenerPokemon(limit, offset);

    // Obtener la parte del documento para insertar dentro las tarjetas
    const tarjetas = document.getElementById("tarjetas")

    tarjetas.innerHTML = "";

    for (let i in pokemon) {
        // obtener solo el url del pokemon
        const { url } = pokemon[i]
        // obtener los datos del pokemon
        const poke = await obtenerUnPokemon(url);

        const {
            name,
            id,
            types,
            height,
            weight,
            abilities,
            stats,
            sprites,
        } = poke;

        const imagenPokemon = sprites.other["official-artwork"].front_default

        const tipos = generarTipos(types);

        const [ps, ataque, defensa, ataque_esp, defensa_esp, velocidad] = stats;

        const habilidad = abilities[0].ability.name;

        let habilidadOcultaHtml = ""

        if (abilities[1] !== undefined) {
            habilidadOcultaHtml = `<h5>Habilidad Oculta</h5>
            <ul>
                <li>${capitalizeFirstLetter(abilities[1].ability.name)}</li>
            </ul>`
        }
        
        const card = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-auto text-bg-secondary rounded">
                    <img src="${imagenPokemon}" class="img-fluid rounded mx-auto d-block" alt="..." style="max-height: 225px;">
                </div>
                <div class="col-md">
                    <div class="card-body">
                        <!-- Titulo -->
                        <h3 class="card-title">${capitalizeFirstLetter(name)} N.° ${id}</h3>
                        <hr>
                        <!-- Elementos -->
                        <div class="row">
                            <!-- Columna 1 - Peso, Altura -->
                            <div class="col">
                                <div class="row">
                                    <div class="col">
                                        <h5>Altura</h5>
                                        <p>${height / 10} m</p>
                                    </div>
                                    <div class="col">
                                        <h5>Peso</h5>
                                        <p>${weight / 10} kg</p>
                                    </div>
                                </div>
                                <h5>Tipos</h5>
                                ${tipos}
                            </div>
                            <!-- Columna 2 - Habilidades -->
                            <div class="col">
                                <h5>Habilidad</h5>
                                <ul>
                                    <li>${capitalizeFirstLetter(habilidad)}</li>
                                </ul>
                                ${habilidadOcultaHtml}
                            </div>
                            <!-- Columna 3 - Estadisticas -->
                            <div class="col">
                                <h5>Estadisticas</h5>
                                <table class="table table-sm table-bordered">
                                    <thead>
                                        <tr class="table-primary">
                                            <th scope="col ">PS</th>
                                            <th scope="col">Ataque</th>
                                            <th scope="col">Defensa</th>
                                            <th scope="col">Ataque Esp.</th>
                                            <th scope="col">Defensa Esp.</th>
                                            <th scope="col">Velocidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${ps.base_stat}</td>
                                            <td>${ataque.base_stat}</td>
                                            <td>${defensa.base_stat}</td>
                                            <td>${ataque_esp.base_stat}</td>
                                            <td>${defensa_esp.base_stat}</td>
                                            <td>${velocidad.base_stat}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `

        let div = document.createElement('div');
        div.innerHTML = card;

        tarjetas.append(div)
    }
}

function renderGeneracion(gen) {
    switch (gen) {
        case 1:
            renderCard(151, 0);
            break;
        case 2:
            renderCard(100, 151);
            break;
        case 3:
            renderCard(135, 251);
            break;
        case 4:
            renderCard(107, 386);
            break;
        case 5:
            renderCard(156, 493);
            break;
        case 6:
            renderCard(72, 649);
            break;
        case 7:
            renderCard(88, 721);
            break;
        case 8:
            renderCard(96, 809);
            break;
        case 9:
            renderCard(120, 905);
            break;
        default:
            renderCard(151, 0);
            break;
    }
}

renderGeneracion();
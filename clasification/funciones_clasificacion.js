const url = "https://api.football-data.org/v4/competitions/PD/standings?season=2023"

fetch(url, {
    method: "GET",
    headers: {
        "X-Auth-Token": "3cd20e2d2b1649c088d5817d04b0a3f8"
    }
})
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => {
        createClassificationTable(data.standings[0].table);
        hideLoader()
    })
    .catch(err => {
        console.log(err)
    })

function hideLoader() {
    const loader = document.getElementById('loader')
    loader.style.visibility = 'hidden';
    loader.style.opacity = '0';
}

function createClassificationTable(clasificacion) {

    const tBody = document.getElementById('tbody')

    for (let i = 0; i < clasificacion.length; i++) {

        let row = document.createElement('tr');

        let posicion = clasificacion[i].position;

        let imagenClub = document.createElement('img');
        imagenClub.setAttribute('src', clasificacion[i].team.crest);
        imagenClub.classList.add('imagenClub')

        let club = clasificacion[i].team.name;
        let pJ = clasificacion[i].playedGames;
        let victorias = clasificacion[i].won;
        let empates = clasificacion[i].draw;
        let derrotas = clasificacion[i].lost;
        let golesFavor = clasificacion[i].goalsFor;
        let golesContra = clasificacion[i].goalsAgainst;
        let golesDiferencia = clasificacion[i].goalDifference;
        let puntos = clasificacion[i].points;
        let ultimosPartidos = clasificacion[i].form;

        if (ultimosPartidos) {
            ultimosPartidos = ultimosPartidos.replaceAll('W', '✔');
            ultimosPartidos = ultimosPartidos.replaceAll('D', '➖');
            ultimosPartidos = ultimosPartidos.replaceAll('L', '❌');
            ultimosPartidos = ultimosPartidos.replaceAll(',', ' ');
        } else {
            ultimosPartidos = "No data";
        }

        let datos = [posicion, imagenClub, club, pJ, victorias, empates, derrotas, golesFavor, golesContra, golesDiferencia, puntos, ultimosPartidos]

        for (let j = 0; j < datos.length; j++) {
            let celdas = document.createElement('td');
            celdas.classList.add('celdas_clasificacion')
            if (j === datos.length - 1) {
                celdas.classList.add('ultimos-partidos');
            }
            if (j === datos.length - 1 && ultimosPartidos !== "No data") {
                celdas.innerHTML = '';
                ultimosPartidos.split(' ').forEach(symbol => {
                    let span = document.createElement('span');
                    span.textContent = symbol;
                    if (symbol === '✔') {
                        span.classList.add('win');
                    }
                    else if (symbol === '➖') {
                        span.classList.add('draw')
                    }
                    else {
                        span.classList.add('lose')
                    }
                    celdas.appendChild(span);
                });
            } else {
                celdas.append(datos[j]);
            }
            row.append(celdas);
        }
        tBody.append(row);
    }
}

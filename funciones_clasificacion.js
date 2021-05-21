const url = "https://api.football-data.org/v2/competitions/2014/standings"

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
    })
    .catch(err => {
        console.log(err)
    })

// createClassificationTable(data2.standings[0].table)
// console.log(data2.standings[0].table)
function createClassificationTable(clasificacion) {

    const tBody = document.getElementById('tbody')

    for (let i = 0; i < clasificacion.length; i++) {

        let row = document.createElement('tr');

        let posicion = clasificacion[i].position;

        let imagenClub = document.createElement('img');
        imagenClub.setAttribute('src', clasificacion[i].team.crestUrl);
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

        ultimosPartidos = ultimosPartidos.replaceAll('W', '✔');
        ultimosPartidos = ultimosPartidos.replaceAll('D', '➖');
        ultimosPartidos = ultimosPartidos.replaceAll('L', '❌');
        ultimosPartidos = ultimosPartidos.replaceAll(',', ' ');

        let datos = [posicion, imagenClub, club, pJ, victorias, empates, derrotas, golesFavor, golesContra, golesDiferencia, puntos, ultimosPartidos]

        for (let j = 0; j < datos.length; j++) {
            let celdas = document.createElement('td');
            celdas.classList.add('celdas_clasificacion')
            celdas.append(datos[j])
            row.append(celdas);
        }
        tbody.append(row);
    }
}
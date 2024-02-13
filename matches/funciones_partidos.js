
const filtroBusqueda = document.getElementById('fitro_busqueda');
const botonReset = document.getElementById('boton_reset');
const inputRadioButton = document.querySelectorAll('input[name=select_filter]');
const url = "/api/competitions/PD/matches"

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
        console.log(data);
        createTable(data.matches);
        activateFilters(data);
        hideloader();
    })
    .catch(err => {
        console.log(err)
    })

function hideloader() {
    const loader = document.getElementById('loader')
    loader.style.visibility = 'hidden';
    loader.style.opacity = '0';
}

function createTable(matches) {

    matches.sort((a, b) => {
        if (a.score.winner === null && b.score.winner !== null) return 1;
        if (a.score.winner !== null && b.score.winner === null) return -1;

        return b.matchday - a.matchday;
    });


    const tBody = document.getElementById('tbody')
    tBody.innerHTML = ""

    let currentMatchday = null;

    for (let i = 0; i < matches.length; i++) {

        if (matches[i].matchday !== currentMatchday) {
            currentMatchday = matches[i].matchday;
            let matchdayRow = document.createElement('tr');
            let matchdayCell = document.createElement('td');
            matchdayCell.colSpan = 3;
            matchdayCell.textContent = `Matchday ${currentMatchday}`;
            matchdayCell.classList.add('matchday-header');
            matchdayRow.appendChild(matchdayCell);
            tBody.appendChild(matchdayRow);
        }

        let row = document.createElement('tr');
        let local = document.createElement('td');
        local.classList.add('celda_local');
        let resultado = document.createElement('td');
        resultado.classList.add('celda_resultado');
        let visitante = document.createElement('td');
        visitante.classList.add('celda_visitante');

        let imagenEquipoLocal = document.createElement('img');
        imagenEquipoLocal.classList.add('imagenClubLocal')
        imagenEquipoLocal.setAttribute('src', "https://crests.football-data.org/" + matches[i].homeTeam.id + ".svg");

        let imagenEquipoVisitante = document.createElement('img');
        imagenEquipoVisitante.classList.add('imagenClubVisitante');
        imagenEquipoVisitante.setAttribute('src', "https://crests.football-data.org/" + matches[i].awayTeam.id + ".svg");

        local.append(matches[i].homeTeam.name, imagenEquipoLocal);
        visitante.append(imagenEquipoVisitante, matches[i].awayTeam.name)

        if (matches[i].score.winner == 'HOME_TEAM') {
            local.classList.add('winner');
            visitante.classList.add('team_loser')
        }
        else if (matches[i].score.winner == 'AWAY_TEAM') {
            visitante.classList.add('winner');
            local.classList.add('team_loser')
        }
        else if (matches[i].score.winner == 'DRAW') {
            local.classList.add('draw')
            visitante.classList.add('draw')
        }

        if (matches[i].score.fullTime.home === null) {
            resultado.textContent = 'Próximamente'
            resultado.classList.add('proximamente')
        } else {
            resultado.textContent = matches[i].score.fullTime.home + ' - ' + matches[i].score.fullTime.away;
        }
        tBody.append(row);
        row.append(local, resultado, visitante);
    }
}

const filtrar = (matches) => {

    const texto = filtroBusqueda.value.toLowerCase();
    const radioButtonFilter = document.querySelector('input[type=radio]:checked')
    const deleteButton = document.getElementById('boton_reset');

    const arrayMatches = matches.filter(match => {
        return match.homeTeam.name.toLowerCase().includes(texto) || match.awayTeam.name.toLowerCase().includes(texto);
    })

    if (arrayMatches.length == 0) {
        const tBody = document.getElementById('tbody')
        tBody.innerHTML = ""
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        tBody.append(tr);
        tr.append(td);
        td.innerHTML = "The Team you search was not found"
        return
    }

    if (texto == "" && (radioButtonFilter.value == "Won" || radioButtonFilter.value == "Draw" || radioButtonFilter.value == "Lost" || radioButtonFilter.value == "Next_matches")) {
        const tBody = document.getElementById('tbody')
        tBody.innerHTML = ""
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        tBody.append(tr);
        tr.append(td);
        td.innerHTML = "Please search for a Team"
        return
    }

    if (radioButtonFilter == null) {
        createTable(arrayMatches);
        return
    }

    const arrayFiltered = arrayMatches.filter(match => {
        if (radioButtonFilter.value == "Won") {
            return (match.score.winner == "HOME_TEAM" && match.homeTeam.name.toLowerCase().includes(texto)) || (match.score.winner == "AWAY_TEAM" && match.awayTeam.name.toLowerCase().includes(texto));
        }
        if (radioButtonFilter.value == "Draw") {
            return match.score.winner == "DRAW";
        }
        if (radioButtonFilter.value == "Lost") {
            return (match.score.winner == "AWAY_TEAM" && match.homeTeam.name.toLowerCase().includes(texto)) || (match.score.winner == "HOME_TEAM" && match.awayTeam.name.toLowerCase().includes(texto));
        }
        if (radioButtonFilter.value == "Next_matches") {
            return match.status == "SCHEDULED";
        }
    })

    if (radioButtonFilter.value == "Next_matches" && arrayFiltered == 0) {
        const tBody = document.getElementById('tbody')
        tBody.innerHTML = ""
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        tBody.append(tr);
        tr.append(td);
        td.innerHTML = "All matches of this team are already played yet"
        return
    }

    deleteButton.addEventListener('click', function () {
        createTable(matches)
        return
    })
    createTable(arrayFiltered)
}

function activateFilters(data) {
    filtroBusqueda.addEventListener('keyup', function () {
        filtrar(data.matches)
    })

    for (let i = 0; i < inputRadioButton.length; i++) {
        inputRadioButton[i].addEventListener('change', function () {
            filtrar(data.matches)
        });
    }
}
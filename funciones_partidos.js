
console.log(data1.matches)

createTable(data1.matches)

function createTable(matches) {

    const tBody = document.getElementById('tbody')

    for (let i = 0; i < matches.length; i++) {
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
        }

        else if (matches[i].score.winner == 'AWAY_TEAM') {
            visitante.classList.add('winner');
        }

        if (matches[i].score.fullTime.homeTeam == null) {
            resultado.textContent = 'Próximamente'
            resultado.classList.add('proximamente')
        }
        else {
            resultado.textContent = matches[i].score.fullTime.homeTeam + ' - ' + matches[i].score.fullTime.awayTeam;
        }

        tbody.append(row);
        row.append(local, resultado, visitante);
    }
}



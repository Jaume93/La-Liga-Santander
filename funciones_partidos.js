
createTable(data1.matches)

function createTable(matches) {

    const tBody = document.getElementById('tbody')

    for (let i = 0; i < matches.length; i++) {
        let row = document.createElement('tr');
        let local = document.createElement('td');
        let resultado = document.createElement('td');
        let visitante = document.createElement('td');

        let imagenEquipoLocal = document.createElement('img');
        imagenEquipoLocal.classList.add('imagenClub')
        imagenEquipoLocal.setAttribute('src', "https://crests.football-data.org/" + matches[i].homeTeam.id + ".svg");

        let imagenEquipoVisitante = document.createElement('img');
        imagenEquipoVisitante.classList.add('imagenClub');
        imagenEquipoVisitante.setAttribute('src', "https://crests.football-data.org/" + matches[i].awayTeam.id + ".svg");

        local.textContent = matches[i].homeTeam.name;
        visitante.textContent = matches[i].awayTeam.name;

        if (matches[i].score.fullTime.homeTeam == null) {
            resultado.textContent = 'Próximamente'
        }
        else {
            resultado.textContent = matches[i].score.fullTime.homeTeam + '-' + matches[i].score.fullTime.awayTeam;
        }


        tbody.append(row);
        row.append(local, imagenEquipoLocal, resultado, imagenEquipoVisitante, visitante);
        local.append(imagenEquipoLocal);
    }
}



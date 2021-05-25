# BeSoccer v1.0

<p>BeSoccer is the second project of Let's Coder Bootcamp.<br> This website project is dedicated to be a platform where it is shown <strong>La Liga </strong> current season information like table classification, matches of every team and more interesting information.</p>
<p>I will appreciate your feedback in order to improve this webpage and learn more knowledge</p>
_____________________________________________________________________________________________________________________________________________________________________


<p>The Technologies used in this website are the following:</p>
<ul>
<li>HTML</li>
<li>CSS</li>
<li>Bootstrap</li>
<li>Postman</li>
<li>JavaScript</li>
</ul>

<p>To get all the information of the matches we took it due to an API.</p>

## HOME
______________
<p>First of all it is presented the <strong>Home</strong> of the webpage. It contains a carousel with different images that hey switch automatically or the user can also switch manualy. Furthermore, scrolling down the page it is found a sort of the most known soccer players and most popular teams.</p>

## CLASSIFICATION
_________________________
<p>By clicking at the <strong>Classification</strong> link located in the navbar the website provides to the user all the kind of information about classification table with all sort of details. Those details the user can see are:</p>

<ul>
<li> Matches won</li>
<li> Matches lost</li>
<li> Matches draw</li>
<li> Goals average</li>
<li> Goals against</li>
<li> Goals difference</li>
<li> Five last matches played</li>
</ul>

<p>To create the table it is used a loop to create all row and cells needed after iterating all elements of the data of the teams provided by the API</p>

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

## MATCHES
__________
<p>Also in the navbar there a <strong>Matches</strong> link that gives a table based on the results of every sigle match of every Team. The table starts by showing all matches of every team. It can be filtered to find the requested team match results by typing a team in the text imput.</p>

    const filtrar = (matches) => {

    const texto = filtroBusqueda.value.toLowerCase();
    const radioButtonFilter = document.querySelector('input[type=radio]:checked')
    const deleteButton = document.getElementById('boton_reset');

    if (texto == "") {
        createTable(data.matches)
        return
    }

    const arrayMatches = matches.filter(match => {
        return match.homeTeam.name.toLowerCase().includes(texto) || match.awayTeam.name.toLowerCase().includes(texto);
    })

<p> If the name of the typed team is not correctly writted the <i>if</i> condition show the message <i>'The Team you search was not found'</i> in a cell created into the table body</p>

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

<p>Added are radio buttons to filter and show the matches won, draw, lost or next matches of the selected team and a delete button to return back to the initial table. So the user can se specific information of a specific team.</p>

    const arrayFiltered = arrayMatches.filter(match => {
        if (radioButtonFilter.value == "Won") {
            return (match.score.winner == "HOME_TEAM" && match.homeTeam.name.toLowerCase().includes(texto).toLowerCase()) || (match.score.winner == "AWAY_TEAM" && match.awayTeam.name.toLowerCase().includes(texto).toLowerCase());
        }
        if (radioButtonFilter.value == "Draw") {
            return (match.score.winner == "DRAW" && match.homeTeam.name.toLowerCase().includes(texto).toLowerCase()) || (match.score.winner == "DRAW" && match.awayTeam.name.toLowerCase().includes(texto).toLowerCase());
        }
        if (radioButtonFilter.value == "Lost") {
            return (match.score.winner == "AWAY_TEAM" && match.homeTeam.name.toLowerCase().includes(texto).toLowerCase()) || (match.score.winner == "HOME_TEAM" && match.awayTeam.name.toLowerCase().includes(texto).toLowerCase());
        }
        if (radioButtonFilter.value == "Next_matches") {
            return (match.status == "SCHEDULED" && match.homeTeam.name.toLowerCase().includes(texto).toLowerCase()) || (match.status == "SCHEDULED" && match.awayTeam.name.toLowerCase().includes(texto).toLowerCase());
        }
    })

    deleteButton.addEventListener('click', function () {
        createTable(matches)
        return
    })

## STATISTICS
____

<P>In the <strong>Statistics</strong> link it is shown two different tables with the five best team in what average goals refeers to. First table statistic shows the percentage of goals every of those five teams score in each match.</P>

    function tableStatistics(matches) {

        let statistic = [];

        for (let i = 0; i < matches.length; i++) {
            if (matches[i].status != "FINISHED") {
            continue
            }
            let idHome = matches[i].homeTeam.id;
            let idAway = matches[i].awayTeam.id;
            let nameTeamHome = matches[i].homeTeam.name;
            let nameTeamAway = matches[i].awayTeam.name;
            let goalsHome = matches[i].score.fullTime.homeTeam;
            let goalsAway = matches[i].score.fullTime.awayTeam;
            let foundHomeTeam
            let foundAwayTeam

            for (let j = 0; j < statistic.length; j++) {

                if (idHome == statistic[j].id) {
                foundHomeTeam = statistic[j]
                }
                if (idAway == statistic[j].id) {
                foundAwayTeam = statistic[j]
                }
            }

            if (foundHomeTeam == undefined) {
                let objeto = {
                    id: idHome,
                    name: nameTeamHome,
                    goals: goalsHome,
                    matches: 1
                }
                statistic.push(objeto);
            } else {
                foundHomeTeam.goals += goalsHome;
                foundHomeTeam.matches++;
            }

            if (foundAwayTeam == undefined) {
                let objeto = {
                    id: idAway,
                    name: nameTeamAway,
                    goals: goalsAway,
                    matches: 1
                }
                statistic.push(objeto);
            } else {
                foundAwayTeam.goals += goalsAway;
                foundAwayTeam.matches++;
            }
        }
        for (let i = 0; i < statistic.length; i++) {
            statistic[i].avg = statistic[i].goals / statistic[i].matches;
        }
    };

<p>Second table statistic shows the percentage of average goals against that every of those five teams have been scored being as a away team.</P>

    function tableStatistics2(matches) {

        let statistic2 = [];

        for (let i = 0; i < matches.length; i++) {
            if (matches[i].status != "FINISHED") {
                continue
            }
            let idAway = matches[i].awayTeam.id;
            let nameTeamAway = matches[i].awayTeam.name;
            let goalsHome = matches[i].score.fullTime.homeTeam;
            let foundHomeTeam
            let foundAwayTeam

            for (let j = 0; j < statistic2.length; j++) {
                if (idAway == statistic2[j].id) {
                    foundAwayTeam = statistic2[j]
                }
            }
            if (foundAwayTeam == undefined) {
                let objeto = {
                    id: idAway,
                    name: nameTeamAway,
                    goalsAgainst: goalsHome,
                    matches: 1
                }
            statistic2.push(objeto);
            } else {
                foundAwayTeam.goalsAgainst += goalsHome;
                foundAwayTeam.matches++;
            }

        }
        for (let i = 0; i < statistic2.length; i++) {
            statistic2[i].avgGoalsAway = statistic2[i].goalsAgainst / statistic2[i] .matches;
        }
    };

## COMPETITIONS
____
<p>In this section it would be expected to show more statistics, matches and classification table of other European leagues</p>

## TO DO
- Improve web design
- Improve responsive design
- Finish other competitions metioned in the nav competitions
- Add more statistics
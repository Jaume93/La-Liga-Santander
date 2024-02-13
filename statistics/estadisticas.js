
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
        tableStatistics(data.matches);
        tableStatistics2(data.matches);
        hideloader();
    })
    .catch(err => {
        console.log(err)
    })

function hideloader() {
    const loader = document.getElementById('loader');
    loader.style.visibility = 'hidden';
    loader.style.opacity = '0';
}

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
        let goalsHome = matches[i].score.fullTime.home;
        let goalsAway = matches[i].score.fullTime.away;
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
    createTable(statistic)
};

function createTable(tableAvgGoals) {

    tableAvgGoals.sort((a, b) => b.avg - a.avg);

    const tableBody = document.getElementById('table_body');


    for (let i = 0; i < 5; i++) {
        let row = document.createElement('tr');

        let equipos = tableAvgGoals[i].id
        let imgClub = document.createElement('img');
        imgClub.classList.add('imgClub')
        imgClub.setAttribute('src', "https://crests.football-data.org/" + equipos + ".svg");

        let club = tableAvgGoals[i].name;
        let goals = tableAvgGoals[i].goals;
        let matches = tableAvgGoals[i].matches;
        let avg = tableAvgGoals[i].avg.toFixed(3)

        let dataClubs = [imgClub, club, goals, matches, avg]

        for (let j = 0; j < dataClubs.length; j++) {
            let celda = document.createElement('td');
            row.append(celda)
            celda.append(dataClubs[j])
        }
        tableBody.append(row);
    }
}

function tableStatistics2(matches) {

    let statistic2 = [];

    for (let i = 0; i < matches.length; i++) {
        if (matches[i].status != "FINISHED") {
            continue
        }
        let idAway = matches[i].awayTeam.id;
        let nameTeamAway = matches[i].awayTeam.name;
        let goalsHome = matches[i].score.fullTime.home;
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
        statistic2[i].avgGoalsAway = statistic2[i].goalsAgainst / statistic2[i].matches;
    }
    createTable2(statistic2)
};

function createTable2(tableGoalsAgainst) {

    tableGoalsAgainst.sort((a, b) => a.avgGoalsAway - b.avgGoalsAway);

    const tableBody2 = document.getElementById('table_body2');

    for (let i = 0; i < 5; i++) {
        let row = document.createElement('tr');

        let equipos = tableGoalsAgainst[i].id
        let imgClub = document.createElement('img');
        imgClub.classList.add('imgClub')
        imgClub.setAttribute('src', "https://crests.football-data.org/" + equipos + ".svg");

        let club = tableGoalsAgainst[i].name;
        let matches = tableGoalsAgainst[i].matches;
        let goalsAgainst = tableGoalsAgainst[i].goalsAgainst;
        let avgGoalsAway = tableGoalsAgainst[i].avgGoalsAway.toFixed(3);

        let dataClubs = [imgClub, club, goalsAgainst, matches, avgGoalsAway]

        for (let j = 0; j < dataClubs.length; j++) {
            let celda = document.createElement('td');
            row.append(celda)
            celda.append(dataClubs[j])
        }
        tableBody2.append(row);
    }
}
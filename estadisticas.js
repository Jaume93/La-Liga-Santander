

tableStatistics(data1.matches)

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
    } console.log(statistic)
};


// 0. Crear función que va calcular las estadísticas, recibiendo como param el array de partidos:

// 1. Crear array vacía (será array de objetos)

// 2. Iterar por todos los partidos

// 3. Condición: si el partido no está acabado, no seguir y mirar siguiente partido, si no el null 
// de los goles lo romperá todo.

// 4. Buscar en la array estadísticas el objeto con el mismo id que el homeTeam del partido y guardarlo en una variable

// 5. Si el objeto buscado no existe, crearlo con estos keys: id, name, goals, matches.
// Rellenar cada key con el valor correspondiente

// 6. Si existe, actualizar los goles y los partidos

// 7. Hacer exactamente lo mismo a partir del punto 4, pero con awayTeam

// 8. Una vez fuera del loop de partidos, iterar por el array estadisticas

// 9. Añadir la key avg a cada objeto, con el valor goals/matches

// 10. Hacer console.log() para ver que todo está correcto.

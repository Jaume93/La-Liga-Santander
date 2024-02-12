const url = "https://api.football-data.org/v4/competitions/PD/standings"

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
        createTable(data.matches)
        activateFilters(data)
    })
    .catch(err => {
        console.log(err)
    })
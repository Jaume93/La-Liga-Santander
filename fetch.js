const url = "https://api.football-data.org/v2/competitions/2014/standings"

fetch(url, {
    method: "GET",
    hearders: {
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
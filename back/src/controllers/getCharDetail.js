const axios = require('axios')

const getCharDetail = (res, id) => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
        .then(result => result.data)
        .then(data => {
            let character = {
                origin: data.origin,
                image: data.image,
                name: data.name,
                gender: data.gender,
                species: data.species,
                status: data.status,
            }
            res.writeHead(200, { 'Content-Type': 'application/json' })
                .end(JSON.stringify(character))
        })
        .catch(err =>
            res.writeHead(500, { 'Content-Type': 'text/plain' })
                .end(`Character with ${id} ID not found`)
        )

}

module.exports = getCharDetail;
const request = require('request')

const movieFinder = (movie,callback) => {
    const url = "http://omdbapi.com/?s=" + movie + "&apikey=6db46ec";
    console.log(url)

    request({url, json:true} , (error, {body} = {})  => {
        if(error){
            callback('Unable to connect to OMDB API',undefined)
        }
         else if(body.Response === 'False'){
            callback('Show not found. Try another search',undefined)
        } 
        else{
            console.log(body)
            console.log(body.Search)
            callback(undefined,{movies: body.Search})
        }
    })
}

module.exports = movieFinder
const request = require('request')
const express = require('express')
const path = require('path')
const ejs = require('ejs')
const movieFinder = require('./utils/movieFinder')

const app = express()
const publicDirectory = path.join(__dirname,'/public')

app.set('view engine','ejs')


console.log(publicDirectory)

app.use(express.static(publicDirectory))

app.get('',(req,res) => {
    res.render('index')
})

app.get('/movies', (req,res) => {
    if(!req.query.movie){
        return res.render('error',{
            error: 'You must provide a name!'
        })
    }

    movie = req.query.movie
    console.log(movie)
    movieFinder(movie,(error,{movies} = {}) => {
        if(error){
            return res.render('error',{error})
        }
        res.render('movies',{movies})
        /* res.send({
            movies,
            first: movies[0].Title
        }) */
    })
})

app.get('/movies/*',(req,res) => {
   const movieID = req.params['0']

  const url = "http://omdbapi.com/?i=" + movieID + "&apikey=6db46ec";

  request({url, json:true} , (error, {body} = {})  => {
    if(error){
        return res.render('error',{
            error: 'Unable to connect to OMDB API'
        })
    }
    if(body.Response === 'False'){
        return res.render('error',{
            error: 'Show not found. Try another search'
        })
    } 
    else{
        res.render('id',{body})
    }
})
 })

app.get('*',(req,res) => {
    res.render('error',{
        error: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 300.')
});

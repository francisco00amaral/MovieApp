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
    res.render('index',{
        title: 'joao',
        primo: 'VAI PUTO QUE EU SOU DO BACKENDDDDD'
    })
})

app.get('/movies', (req,res) => {
    if(!req.query.movie){
        return res.send({
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

app.get('*',(req,res) => {
    res.render('error',{
        title:'404',
        name: 'Francisco',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 300.')
});

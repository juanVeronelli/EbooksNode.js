const {default: fetch} = require('cross-fetch')
const { getEbooks } = require('./components/funcionality')
const { addToLibrary } = require('./components/funcionality')
const { deleteToLibrary } = require('./components/funcionality')
const express = require('express');
const app = express()
const port = 3000;

const cors = require("cors");
const corsOptions = {
    origin: '*',
    Credential: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

const library = {
    "library":[]
}

app.get('/Books', async (req, res)=>{
    const response = await fetch('http://192.168.0.11:8080/e-books.JSON')
    const data = await response.json()
    if(req.query.ebooks == 'true'){
        res.send( await getEbooks(data) );    
    }
})


app.post('/:id', async (req, res) => {
    const response = await fetch('http://192.168.0.11:8080/e-books.JSON')
    const data = await response.json()
    const templates = await addToLibrary(req.params.id, data);
    for(let i in templates){
        library.library.push(templates[i]);
    }
})

app.get('/library', (req,res)=>{
    if(req.query.books == 'true'){
        res.send(library.library);
    }
})

app.delete('/:ide', (req,res)=>{
    const num = deleteToLibrary(req.params.ide, library.library);
    library.library.splice(num, 1);
})

app.listen(port, ()=>{
    console.log('Servidor escuchando en el puerto ' + port)
})

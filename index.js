const express = require('express')
const app = express()

const Podatak = require('./models/podaci')

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))


const zahtjevInfo = (req, res, next) => {
    console.log('Metoda:', req.method)
    console.log('Putanja:', req.path)
    console.log('Tijelo:', req.body)
    console.log('---')
    next()
  }
  
  app.use(zahtjevInfo)
  
let podaci = [
    {
        id: 1,
        ImePrezime: "Sanela Dekanić",
        Email: "sdekanic@pmfst.hr",
        vazno: true
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Pozdrav od Express servera + nodemona</h1>')
})

app.get('/api/podaci', (req, res) => {
    Podatak.find({}).then( svePoruke =>{
        res.json(svePoruke)
    })
})

app.get('/api/podaci/:id', (req, res, next) => {
    const id = req.params.id
    Podatak.findById(id)
    .then(podatak => {
        if(osoba){
            res.json(osoba)
        } else{
            res.status(404).end()
        }
    })
    .catch(err => next(err))
})

app.delete('/api/podaci/:id', (req, res, next) => {
    const id = req.params.id
    Podatak.findByIdAndRemove(id).then(result => {
        res.status(204).end()
    })
    .catch(err => next(err))
})

app.put('/api/podaci/:id', (req, res, next) => {
    const id = req.params.id
    const podatak = req.body

    const osoba = {
        ImePrezime: podatak.ImePrezime,
        Email: podatak.Email,
        vazno: podatak.vazno
    }

    Podatak.findByIdAndUpdate(id, osoba, {new: true})
        .then(osoba => {
            res.json(osoba)
        })
        .catch(err => next(err))
})

app.post('/api/podaci', (req, res, next) => {
    const podatak = req.body
    const osoba = new Podatak({
        ImePrezime: podatak.ImePrezime,
        Email: podatak.Email,
        vazno: podatak.vazno || false 
    })

    osoba.save().then( result => {
        console.log("Podatak spremljen");
        res.json(result);
    })
    .catch(err => next(err))
})

const nepoznataRuta = (req, res) => {
    res.status(404).send({ error: 'Nepostojeca ruta' })
}
  
app.use(nepoznataRuta)

const errorHandler = (err, req, res, next) => {
    console.log("Middleware za pogreške");

    if(err.name === "CastError"){
        return res.status(400).send({error: "Krivi format ID paramatra"})
    } else if(err.name === "ValidationError"){
        return res.status(400).send({error: "Krivi format podatka"})
    }
    next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server sluša na portu ${PORT}`);
})

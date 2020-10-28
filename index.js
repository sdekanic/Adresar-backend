const express = require('express')
const app = express()

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
        ImePrezime: 'Sanela Dekanić',
        Email: 'sdekanic@pmfst.hr',
        vazno: true
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Pozdrav od Express servera + nodemona</h1>')
})

app.get('/api/podaci', (req, res) => {
    res.json(podaci)
})

app.get('/api/podaci/:id', (req, res) => {
    const id = Number(req.params.id)
    const osoba = podaci.find(p => p.id === id)

    if (osoba) {
        res.json(osoba)
    } else {
        res.status(404).end()
    }

})
app.delete('/api/podaci/:id', (req, res) => {
    const id = Number(req.params.id)
    podaci = podaci.filter(p => p.id !== id)
    res.status(204).end()

})

app.put('/api/podaci/:id', (req, res) => {
    const id = Number(req.params.id)
    const podatak = req.body
    podaci = podaci.map(p => p.id !== id ? p : podatak)
    res.json(podatak)

})

app.post('/api/podaci', (req, res) => {
    const maxId = podaci.length > 0
    ? Math.max(...podaci.map(p => p.id))
    : 0

    const podatak = req.body
    if(!podatak.ImePrezime || !podatak.Email){
        return res.status(400).json({
            error: 'Nedostaje sadržaj'
        })
    }
    const osoba = {
        ImePrezime: podatak.ImePrezime,
        Email: podatak.Email,
        vazno: podatak.vazno || false,
        id: maxId + 1
    }

    podaci = podaci.concat(osoba) 
    res.json(osoba)
})

const nepoznataRuta = (req, res) => {
    res.status(404).send({ error: 'nepostojeca ruta' })
  }
  
  app.use(nepoznataRuta)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server sluša na portu ${PORT}`);
})

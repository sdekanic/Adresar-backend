const mongoose = require('mongoose')
const password = 'zadaca04'
const dbname = 'podaci-api'

const url = `mongodb+srv://zadaca-sd:${password}@cluster0.d3uml.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })

  const podatakSchema = new mongoose.Schema({
    ImePrezime: String,
    Email: String,
    vazno: Boolean
  })
   
  const Podatak = mongoose.model('Podatak', podatakSchema, 'podaci')
  

  Podatak.find({})
  .then(result => {
    result.forEach(poruka =>{
      console.log(poruka)
    })
    mongoose.connection.close()
  })

  /* noviPodatak.save() 
.then(result => {
  console.log('Podatak spremljena')
  console.log(result);
  mongoose.connection.close()
}) */
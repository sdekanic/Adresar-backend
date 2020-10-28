const mongoose = require('mongoose')
const password = process.env.ATLAS_PASS
const dbname = 'pocadi-api'

const url = `mongodb+srv://oarwa-pmfst:${password}@cluster0.spofc.mongodb.net/${dbname}?retryWrites=true&w=majority`

console.log("Spajamo na bazu");

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(result => {
    console.log("Spojeni smo na bazu");
  }).catch(error => {
    console.log("Greška pri spajanju", error.message);
  })
  
const podatakShema = new mongoose.Schema({
    ImePrezime: {
        type: String,
        required: true,
        minlength: 5
    },
    Email: {
        type: String,
        required: true
    },
    vazno: {
        type: Boolean,
        default: false
    }
  })

  podatakShema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = doc._id.toString()
        delete ret._id
        delete ret.__v
        return ret
    }
})

module.exports = mongoose.model('Podatak', podatakShema, 'podaci')
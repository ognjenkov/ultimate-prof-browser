const mongoose = require("mongoose")

const professorSchema = new mongoose.Schema({
    ime: {
        type:String,
        required:true
    },
    prezime: {
        type:String,
        required:true
    },
    katedra:[{
        type: String,
        required:true
    }],
    rank:[{
        type: String,
        required:true
    }],
    email: {
        type:String
    },
    kabinet: {
        type:String
    },
    vreme_konsultacija: {
        type:String
    },
    prefix: {
        type:String
    },
})

module.exports = mongoose.model('Professor', professorSchema)
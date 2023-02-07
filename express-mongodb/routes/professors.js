const express = require("express")
const router = express.Router()
const Professor = require('../models/professor')

// Getting All


router.get('/', async (req, res) => {
    try {
        const professors = await Professor.find()
        res.json(professors)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// Getting One
router.get('/:id', getProfessor, (req, res) => {
    res.json(res.professor)
    // res.send(res.professor.name)
})
// Creating One
router.post('/', checkType, async (req, res) => {
    const professor = new Professor({
        ime: req.body.ime,
        prezime: req.body.prezime,
        katedra: req.body.katedra,
        rank: req.body.rank,
        email: req.body.email,
        kabinet: req.body.kabinet,
        vreme_konsultacija: req.body.vreme_konsultacija,
        link_ka_profilu: req.body.link_ka_profilu,
        prefix: req.body.prefix,
        img: req.body.img
    })

    try {
        const newProfessor = await professor.save()
        res.status(201).json(newProfessor)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }

})
// Updating One (put updejtuje sve)
router.patch('/:id', getProfessor, async (req, res) => {
    if (req.body.ime != null) {
        res.professor.ime = req.body.ime
    }
    if (req.body.prezime != null) {
        res.professor.prezime = req.body.prezime
    }
    try {
        const updatedProfessor = await res.professor.save()
        res.json(updatedProfessor)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Deleteing One
router.delete('/:id', getProfessor, async (req, res) => {
    try {
        await res.professor.remove()

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getProfessor(req, res, next) {
    let professor
    try {
        professor = await Professor.findById(req.params.id)
        if (professor == null) {
            return res.status(404).json({ message: "cant find subcriber" })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.professor = professor;
    next()
}


const katedre = [
    "Ekonomija, poslovno planiranje i medjunarodni menadzment",
    "Elektronsko poslovanje",
    "Industrijsko i menadzment inzenjerstvo",
    "Interdisciplinarna istrazivanja u menadzmentu",
    "Informacioni sistemi",
    "Informacione tehnologije",
    "Marketing menadzment i odnosi s javnoscu",
    "Matematika",
    "Menadzment i upravljanje projektima",
    "Menadzment ljudskih Resursa",
    "Menadzment tehnologije, inovacija i odrzivog razovoja",
    "Operaciona istrazivanja i statistika",
    "Organizacija poslovnih sistema",
    "Racunarski integricana proizvodnja i logistika",
    "Softversko inzenjerstvo",
    "Menadzment kvaliteta i standardizaciju",
    "Upravljanje proizvodnjom i pruzanjem usluga",
    "Finansijski menadzment i racunovodstvo",
    "Upravljanje sistemima"
    ];
const rankovi = [
    "Redovni profesor",
    "Vandredni profesor",
    "Profesor emeritus",
    "Docent",
    "Asisten sa doktoratom",
    "Nastavnik stanog jezika",
    "Asistent",
    "Saradnik u nastavi",
    "Dekan",
    "Prodekan"
    ];


function checkType(req, res, next) {
    let proveraRank = false, proveraKatedre = false
    // katedre.forEach(element => {
    //     if (element == req.body.katedra) proveraKatedre = true;
    // });
    // rankovi.forEach(element => {
    //     if (element == req.body.rank) proveraRank = true;
    // });

    katedre.forEach(element => {
        
        req.body.katedra.forEach(katedra=>{
            if (element == katedra) proveraKatedre = true;
        })
    });
    rankovi.forEach(element => {
        // if (element == req.body.rank) proveraRank = true;
        req.body.rank.forEach(rank => { //OVO IMPLEMENTTIRAJ KAD DODAS MULTIPPLE RANKOVA
            if (element == rank) proveraRank = true;
        });
    });

    if (proveraRank && proveraKatedre) {
        next()
    } else {
        return res.status(400).json({ message: "losa katedra ili rank" })
    }
}

module.exports = router
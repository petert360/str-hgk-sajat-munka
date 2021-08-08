// Express modul importálása és a létrehozunk egy express.Router objektumot
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

// Person schema importálása
const Vaccine = require('../models/vaccine.model');

router.get('/', async (req, res, next) => {
    const data = await Vaccine.find();
    res.json(data);
});

// CREATE
router.post('/', async (req, res, next) => {
    // megvizsgáljuk, hogy a bodyban érkezett adatok validak-e
    const { name, efficiency } = req.body;
    // ha valamelyik hiányzik, hibát ad vissza
    if (!name || !efficiency) {
        return next(new createError.BadRequest('Missing properties'));
    }

    // létrehozunk egy új mongoDB dokumentumot
    const newVaccine = new Vaccine({
        name: req.body['name'],
        efficiency: req.body['efficiency'],
    });

    // elmentjük az adatbázisba
    newVaccine.save().then(data => {
        res.status(201);
        res.json(data);
    });
});

/* Teszt
fetch('http://localhost:8000/vaccine', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'Pfizer',
        efficiency: '95',
    }),
})
    .then(r => r.json())
    .then(d => console.log(d));
*/

router.use((err, req, res, next) => {
    console.error(`ERROR ${err.statusCode}: ${err.message}`);
    res.status(err.statusCode || 500);
    res.send('<h1>Error occurred<h1>');
    /* res.json({
        hasError: true,
        code: err.statusCode,
        message: err.message,
    }); */
});

// exportáljuk a modult
module.exports = router;

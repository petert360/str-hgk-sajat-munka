// Express modul importálása és a létrehozunk egy express.Router objektumot
const express = require('express');
const router = express.Router();
const createError = require('http-errors');

// Service modul importálása
const personService = require('../service/person.service');

// Person schema importálása
const Person = require('../models/person.model');

// definiáljuk az útválasztást HTTP GET kérésre
// ez jelen esetben minden GET /person/ kérésre lefut
// átalakírjuk a GET kérést, hogy aszinkron módon kérjük le az adatokat
router.get('/', async (req, res, next) => {
    const data = await Person.find();
    //console.log(typeof data);
    res.json(data);
});

// ez a végpont egy number típust ad vissza JSON formában
/*
router.get('/count', async (req, res, next) => {
    const data = await personService.read();
    const count = data.filter(
        item => item.vaccine && item.vaccine !== 'none'
    ).length;
    res.json(count);
});
*/

// ez a végpont egy objektumot ad vissza JSON formában
router.get('/count', async (req, res, next) => {
    const data = await Person.find();
    const obj = {
        count: data.filter(item => item.vaccine && item.vaccine !== 'none')
            .length,
    };
    res.json(obj);
});

router.get('/vaccinated', async (req, res, next) => {
    const data = await Person.find();
    const obj = data.filter(item => item.vaccine && item.vaccine !== 'none');
    res.json(obj);
});

// READ: visszaadja, hogy az adott `id`-val rendelkező személy rendelkezik-e oltással
router.get('/:id/vaccinated', async (req, res, next) => {
    const data = await Person.findById(req.params.id)
    if (!data) {
        next(new createError.NotFound('Person was not found'));
        //next(new createError('Unknown'));
    } else {
        res.json({ result: data.vaccine !== 'none' ? true : false });
    }
});

// CREATE
router.post('/', async (req, res, next) => {
    // megvizsgáljuk, hogy a bodyban érkezett adatok validak-e
    const { last_name, first_name, vaccine } = req.body;
    // ha valamelyik hiányzik, hibát ad vissza
    if (!last_name || !first_name || !vaccine) {
        return next(new createError.BadRequest('Missing properties'));
    }

    // létrehozunk egy új mongoDB dokumentumot
    const newPerson = new Person({
        first_name: req.body['first_name'],
        last_name: req.body['last_name'],
        vaccine: req.body['vaccine'],
    });

    // elmentjük az adatbázisba
    newPerson.save().then(data => {
        res.status(201);
        res.json(data);
    });
});

/* Teszt
fetch('http://localhost:8000/person', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        first_name: 'John',
        last_name: 'Doe',
        vaccine: 'Pfizer',
    }),
})
    .then(r => r.json())
    .then(d => console.log(d));


Új vakcina teszt:

*/

/*
3. Implementáld a `PUT /person/:id/:vaccine` végpontot, amellyel megadhatjuk,
hogy az adott `id`-val rendelkező személy `vaccine` típusú oltást kapott.
*/
// UPDATE
router.put('/:id/:vaccine', async (req, res, next) => {
    // const data = await personService.read();
    const id = req.params.id;
    const vaccine = req.params.vaccine;
    const update = { vaccine: vaccine };
    return Person
        .findByIdAndUpdate(id, update)
        .then(person => {
            res.json(person);
        })
        .catch(err => {
            next(new createError.InternalServerError(err.message));
        });
});

/* TESZT:
fetch('http://localhost:8000/person/9/Sputnik', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(r => r.json())
    .then(d => console.log(d));
*/

// Implementáld a DELETE /person/:vaccine végpontot,
// amely a vaccine típusú oltással rendelkező személyeket törli az adatbázisból.
router.delete('/:vaccine', async (req, res, next) => {
    const vaccine = req.params.vaccine;
    await Person.deleteMany({ vaccine: vaccine});
    res.status(200);
    res.json(true);
});

/* Teszt
fetch('http://localhost:8000/person/none', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(r => r.json())
    .then(d => console.log(d));
*/

// Implementálj egy hibakezelő middleware függvényt, amely kilogolja a valódi hibát a konzolra,
// majd a kliens számára valamilyen - a hibától független - átlátszó kifogást küld vissza üzenetben.
// Ha nincs más státuszkód definiálva, akkor adjon 500-as hibakódot.
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

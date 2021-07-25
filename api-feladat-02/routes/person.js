// Express modul importálása és a létrehozunk egy express.Router objektumot
const express = require('express');
const router = express.Router();

// Service modul importálása
const personService = require('../service/person.service');

// definiáljuk az útválasztást HHTP GET kérésre
// ez jelen esetben minden /person/ kérésre lefut
// átalakírjuk a GET kérést, hogy aszinkron módon kérjük le az adatokat
router.get('/', async (req, res, next) => {
    const data = await personService.read();
    console.log(typeof data);
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
    const data = await personService.read();
    const obj = {
        count: data.filter(item => item.vaccine && item.vaccine !== 'none')
            .length,
    };
    res.json(obj);
});

router.get('/vaccinated', async (req, res, next) => {
    const data = await personService.read();
    const obj = data.filter(item => item.vaccine && item.vaccine !== 'none');
    res.json(obj);
});

// READ: visszaadja, hogy az adott `id`-val rendelkező személy rendelkezik-e oltással
router.get('/:id/vaccinated', async (req, res, next) => {
    const data = await personService.read();
    const person = data.find(item => item.id === Number(req.params.id));
    if (!person) {
        res.json({ result: 'person not found' });
    } else {
        res.json({ result: person.vaccine !== 'none' ? true : false });
    }
});

// CREATE
router.post('/', async (req, res, next) => {
    const data = await personService.read();
    const newPerson = req.body;
    // Az utolsó indexű objektum id-t kiolvassuk és hozzáadunk egyet.
    newPerson.id = data[data.length - 1].id + 1;
    data.push(newPerson);
    // Sikeres erőforrás létrehozás kódja
    res.status(201);
    res.json(newPerson);
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
*/

// exportáljuk a modult
module.exports = router;

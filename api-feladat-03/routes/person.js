// Express modul importálása és a létrehozunk egy express.Router objektumot
const express = require('express');
const router = express.Router();

// Service modul importálása
const personService = require('../service/person.service');

// definiáljuk az útválasztást HTTP GET kérésre
// ez jelen esetben minden  GET /person/ kérésre lefut
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
    await personService.save(data);
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

/*
3. Implementáld a `PUT /person/:id/:vaccine` végpontot, amellyel megadhatjuk,
hogy az adott `id`-val rendelkező személy `vaccine` típusú oltást kapott.
*/
// UPDATE
router.put('/:id/:vaccine', async (req, res, next) => {
    const data = await personService.read();
    const id = req.params.id;
    const vaccine = req.params.vaccine;
    // az id-t számmá alakítva vizsgáljuk
    const index = data.findIndex(p => p.id === Number(id));
    data[index].vaccine = vaccine;
    await personService.save(data);
    // Sikeres művelet kód
    res.status(200);
    res.json(data[index]);
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
    const data = await personService.read();
    const vaccine = req.params.vaccine;
    // a beolvasott adatokbók azokat szűrjük,
    // amelyeknek nem e kérdéses vakcinát tartalmazzák
    filteredData = data.filter(item => item.vaccine !== vaccine)
    await personService.save(filteredData);
    // Sikeres művelet kód
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

// exportáljuk a modult
module.exports = router;

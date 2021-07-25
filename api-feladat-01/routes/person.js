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

// exportáljuk a modult
module.exports = router;

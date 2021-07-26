// fs promise verzió és path modulok importlása
const fsp = require('fs').promises;
const { join } = require('path');

// beovassuk a __dirname/databas/db.json file-t
const read = async () => {
    const jsonData = await fsp.readFile(
        join('.', 'database', 'db.json'),
        'utf8'
    );
    // a beolvasott adatot JSON formába alakítva adjuk vissza
    // az adatbázisból csak a person objektumok tömbjét adjuk vissza.
    return JSON.parse(jsonData).person;
};

// kiírjuk az argumentumban megadott objektumot
// arrayként érkezik,és itt alakítom objektummá
const save = async (list = []) => {
    const obj = { person: list };
    await fsp.writeFile(
        join('.', 'database', 'db.json'),
        JSON.stringify(obj, null, 4),
        'utf8'
    );
    return true;
};

module.exports = { read, save };

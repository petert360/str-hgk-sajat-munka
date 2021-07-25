// Express modul importálása
const express = require('express');

// app Express objektum létrehozása és a port beállítása
const app = express();
const port = 8000;

// router modulok importálása a /routes könyvtárból
const personRouter = require('./routes/person');

// swagger dokumentáció
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// route kezelés
app.use('/person', personRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
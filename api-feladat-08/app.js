// Express modul importálása
const express = require('express');

// app Express objektum létrehozása és a port beállítása
const app = express();
const port = 8000;

// body-parser modul importálás
const bodyParser = require('./node_modules/body-parser');
app.use(bodyParser.json());

// mongoose importálása
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// router modulok importálása a /routes könyvtárból
const personRouter = require('./routes/person');
const vaccineRouter = require('./routes/vaccine');

// swagger dokumentáció
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

// csatlakozás a lokális mongoDB-hez
mongoose
    .connect('mongodb://localhost:27017/myapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error(err);
        process.exit();
    });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// route kezelés
app.use('/person', personRouter);
app.use('/vaccine', vaccineRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
